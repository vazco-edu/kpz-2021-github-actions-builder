/* eslint-disable no-prototype-builtins */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
  DiagramEngine,
  DagreEngine,
  DefaultPortModel,
  NodeModel,
  PathFindingLinkFactory,
  DiagramModelGenerics,
} from '@projectstorm/react-diagrams';
import { keyword$DataError } from 'ajv/dist/compile/errors';
import { truncate } from 'lodash';
import React from 'react';

import { helperPortCreation } from '../additionalFunctions/diagramFunctions/helperPortCreation';
import { DemoCanvasWidget } from '../diagrams/CanvasWidget';
import { DemoButton, DemoWorkspaceWidget } from '../diagrams/WorkspaceWidget';

class DemoWidget extends React.Component<
  { model: DiagramModel; engine: DiagramEngine },
  any
> {
  // eslint-disable-next-line react/sort-comp
  engine: DagreEngine;
  timeoutId?: any;
  constructor(props: any) {
    super(props);
    this.engine = new DagreEngine({
      graph: {
        rankdir: `LR`,
        align: 'DR',
        ranker: 'tight-tree',
        marginx: 10,
        marginy: 10,
      },
      includeLinks: false,
    });
  }
  autoDistribute = () => {
    this.engine.redistribute(this.props.model);
    this.reroute();
    this.props.engine.repaintCanvas();
    this.props.engine.zoomToFit();
    this.forceUpdate();
  };

  componentDidMount(): void {
    console.log('did mount');
    this.autoDistribute();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
  /*componentDidUpdate() {
    console.log('update');
    this.autoDistribute();
  }*/
  changeOrientation = () => {
    if (this.engine.options.graph.rankdir === 'TB') {
      this.engine.options.graph.rankdir = 'LR';
    } else if (this.engine.options.graph.rankdir === 'LR') {
      this.engine.options.graph.rankdir = 'TB';
    }
    this.autoDistribute();
  };

  reroute() {
    console.log('reroute');
    this.props.engine
      .getLinkFactories()
      .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME)
      .calculateRoutingMatrix();
  }

  render() {
    return (
      <DemoWorkspaceWidget
        buttons={[
          <DemoButton
            key={0}
            onClick={this.autoDistribute}
            className="resultButton1"
          >
            Re-distribute
          </DemoButton>,
          <DemoButton
            key={1}
            onClick={this.changeOrientation}
            className="resultButton2"
          >
            Change orientation
          </DemoButton>,
        ]}
      >
        <DemoCanvasWidget>
          <CanvasWidget engine={this.props.engine} />
        </DemoCanvasWidget>
      </DemoWorkspaceWidget>
    );
  }
}
export function selfLink(obj: Record<string, string[]>): boolean {
  for (let job = 0; job < Object.keys(obj).length; job++) {
    if (Object.values(obj)[job].includes(Object.keys(obj)[job])) {
      return true;
    }
  }
  return false;
}

export function allNeeds(obj: Record<string, string[]>, norm: any): boolean {
  if (norm !== undefined && Object.keys(obj).length !== 0) {
    const jobsInNormalized = Object.keys(norm.jobs);
    for (let job = 0; job < jobsInNormalized.length; job++) {
      if (norm['jobs'][jobsInNormalized[job]].needs === undefined) {
        return false;
      }
    }
    return true;
  }
  return false;
}

export function checkCycles(obj: Record<string, string[]>) {
  const graph2: Record<string, string[]> = Object.assign({}, obj);
  let queue: string[][] = Object.keys(graph2).map(node => [node]);
  while (queue.length) {
    const batch: string[][] = [];
    for (const path of queue) {
      const parents = graph2[path[0]] || [];
      for (const node of parents) {
        if (node === path[path.length - 1]) {
          batch.push([node, ...path]);
          return [true, batch[batch.length - 1]];
        }
        batch.push([node, ...path]);
      }
    }
    queue = batch;
  }
  return [false, []];
}
export function sameNeeds(obj: Record<string, string[]>) {
  const helperArray: string[][] = Object.values(obj);
  for (let i = 0; i < helperArray.length; i++) {
    for (let j = 0; j < helperArray[i].length; j++) {
      const result: number = helperArray[i].filter(
        (v: any) => v === Object.keys(obj)[j],
      ).length;
      if (result > 1) {
        return true;
      }
    }
  }
  return false;
}

// Smart routing engine
// const pathfinding = engine
//   .getLinkFactories()
//   .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME);
// ## displays jobs, that are dependent on a specific job ##

// eslint-disable-next-line complexity
export default function createDiagrams(
  notNormalized: any,
  normalized: any,
  isNeededFor: Record<string, string[]>,
) {
  const engine = createEngine();
  console.log(normalized);
  let node1: DefaultNodeModel;
  if (notNormalized) {
    if (notNormalized.name) {
      node1 = new DefaultNodeModel({
        name: `${notNormalized.name}`,
        color: 'rgb(128,0,128)',
      });
    } else {
      node1 = new DefaultNodeModel({
        name: ``,
        color: 'rgb(128,0,128)',
      });
    }
  } else {
    node1 = new DefaultNodeModel({
      name: ``,
      color: 'rgb(128,0,128)',
    });
  }

  let port1: DefaultPortModel;
  const helper = helperPortCreation(normalized, node1);
  if (!Array.isArray(helper)) {
    port1 = helper;
  } else {
    [port1, node1] = helper;
  }
  const node2 = new DefaultNodeModel({
    name: 'jobs',
    color: 'rgb(0,200,100)',
  });
  //variable storing number or jobs withour parameter "needs" - default value is 1, as the first job will never have parameter needs
  let numWithoutNeeds = 1;
  // array storing objects, that have parameter "needs" in format [name_of_the_job, job_object]
  const objWithNeeds: any[] = [];
  //node2.setPosition(49, 350);
  // ## storing keys of jobs in normalized object ##
  const key: string[] = Object.keys(normalized.jobs);
  const port2: DefaultPortModel[] = [];
  const indexOfJobWithoutNeeds: number[] = [];
  for (let i = 0; i < key.length; ++i) {
    if (normalized) {
      if (normalized['jobs'][key[i]]['needs'] === undefined) {
        //without needs
        if (port2.length < 1) {
          port2.push(node2.addInPort(`${key[i]}`));
          continue;
        }
        node2.addInPort(`${key[i]}`);
        numWithoutNeeds++;
        indexOfJobWithoutNeeds.push(i);
      } else {
        objWithNeeds.push(key[i]);
        objWithNeeds.push(normalized['jobs'][key[i]]);
      }
    }
  }
  const portsOut: DefaultPortModel[] = [];
  const portsOutWithNeeds: DefaultPortModel[] = [];
  const portsIn: DefaultPortModel[] = [];
  // displaying number of ports
  for (let j = 1; j < numWithoutNeeds + 1; ++j) {
    portsOut.push(node2.addOutPort(j.toString()));
  }
  const jobs: DefaultNodeModel[] = [];

  // ## creating nodes for jobs and object for reverse tracking our dependencies##
  for (const jobName of key) {
    jobs.push(
      new DefaultNodeModel({
        name: `${jobName}`,
        color: 'rgb(204,204,9)',
      }),
    );
    isNeededFor[`${jobName}`] = [];
  }
  // ## adding specific ports to jobs ##
  for (let nodeNumber = 0; nodeNumber < key.length; ++nodeNumber) {
    const keysJobs = normalized['jobs'][key[nodeNumber]];
    if (keysJobs.needs) {
      jobs[nodeNumber].addInPort(`${keysJobs.needs}`);
    }
    jobs[nodeNumber].addInPort(`runs-on: ${keysJobs['runs-on']}`);
    if (keysJobs.if) {
      jobs[nodeNumber].addInPort(`if: ${keysJobs.if}`);
    }
    //preventing additional output, that we dont want
    let x = 0;
    for (let step = 0; step < keysJobs.steps.length; ++step) {
      for (const prop in keysJobs.steps[step]) {
        if (x === 0) {
          jobs[nodeNumber].addInPort('steps:');
          portsIn.push(
            jobs[nodeNumber].addInPort(
              `${prop}: ${keysJobs.steps[step][prop]}`,
            ),
          );
          // out port, just in case said job is needed by another job
          portsOutWithNeeds.push(jobs[nodeNumber].addOutPort(''));
          x++;
          continue;
        }
        jobs[nodeNumber].addInPort(`${prop}: ${keysJobs.steps[step][prop]}`);
      }
    }
  }
  const model = new DiagramModel();
  model.addAll(node1, node2, ...jobs);
  let link: DefaultLinkModel;
  if (port2[0] !== undefined) {
    link = port1.link<DefaultLinkModel>(port2[0]);
  } else {
    link = port1.link<DefaultLinkModel>(port1);
  }
  const linksWithoutNeeds: DefaultLinkModel[] = [];
  // ## loop used to add dependencies to our object (isNeededFor)
  for (let job = 0; job < key.length; job++) {
    for (let nod = 0; nod < key.length; nod++) {
      if (normalized['jobs'][`${key[job]}`].needs) {
        for (const element of normalized['jobs'][`${key[job]}`].needs) {
          if (element === key[nod]) {
            isNeededFor[`${key[nod]}`].push(`${key[job]}`);
          }
        }
      }
    }
  }
  const linksBetweenJobs: Record<string, DefaultLinkModel[]> = {};
  for (let job = 0; job < portsIn.length; job++) {
    if (normalized['jobs'][`${key[job]}`].needs) {
      const needsOfJob = normalized['jobs'][`${key[job]}`].needs;
      //connection of nodes with multiple "needs"
      if (needsOfJob.length > 1) {
        for (const element of needsOfJob) {
          for (let jobName = 0; jobName < key.length; ++jobName) {
            if (element === key[jobName]) {
              const link1 = Object.values(
                portsOutWithNeeds[jobName]['parent']['options'],
              )[2];
              const link2 = Object.values(portsIn[job]['parent']['options'])[2];
              if (!linksBetweenJobs[`${link1}${link2}`]) {
                linksBetweenJobs[`${link1}${link2}`] = [];
              }
              linksBetweenJobs[`${link1}${link2}`].push(
                portsOutWithNeeds[jobName].link<DefaultLinkModel>(portsIn[job]),
              );
            }
          }
        }
      } else {
        for (let jobName = 0; jobName < key.length; ++jobName) {
          if (needsOfJob[0] === key[jobName]) {
            const link1 = Object.values(
              portsOutWithNeeds[jobName]['parent']['options'],
            )[2];
            const link2 = Object.values(portsIn[job]['parent']['options'])[2];
            if (!linksBetweenJobs[`${link1}${link2}`]) {
              linksBetweenJobs[`${link1}${link2}`] = [];
            }

            linksBetweenJobs[`${link1}${link2}`].push(
              portsOutWithNeeds[jobName].link<DefaultLinkModel>(portsIn[job]),
            );
          }
        }
      }
    } else {
      //handle independent jobs
      const portsOut2: DefaultPortModel[] = [];
      for (
        let withoutNeeds = 0;
        withoutNeeds < node2['portsIn'].length;
        withoutNeeds++
      ) {
        if (node2['portsIn'][withoutNeeds]['options'].label === key[job]) {
          portsOut2.push(portsOut[withoutNeeds]);
          linksWithoutNeeds.push(
            portsOut2[0].link<DefaultLinkModel>(portsIn[job]),
          );
        }
      }
    }
  }
  // const model = new DiagramModel();
  if (link !== undefined && port2[0] !== undefined) {
    model.addAll(link);
    link.setLocked(true);
  }
  model.addAll(...linksWithoutNeeds);
  for (const link of linksWithoutNeeds) {
    link.setLocked(true);
  }
  const cycledJobs = checkCycles(isNeededFor);
  for (const key in linksBetweenJobs) {
    if (linksBetweenJobs[key].length > 1) {
      for (const link of linksBetweenJobs[key]) {
        link.setColor('#FF0000');
      }
    }
  }
  if (cycledJobs[0] && Array.isArray(cycledJobs[1])) {
    for (let i = 0; i < cycledJobs[1].length - 1; i++) {
      const cycledKey = `${cycledJobs[1][i + 1]}${cycledJobs[1][i]}`;
      if (linksBetweenJobs[cycledKey]) {
        linksBetweenJobs[cycledKey][0].setColor('#c46415');
      }
    }
  }
  for (const key of Object.values(linksBetweenJobs)) {
    for (let i = 0; i < key.length; i++) {
      model.addAll(key[i]);
      key[i].setLocked(true);
    }
  }

  engine.setModel(model);
  // this.engine.options.graph.rankdir = 'TB';
  return <DemoWidget model={model} engine={engine} />;
}
