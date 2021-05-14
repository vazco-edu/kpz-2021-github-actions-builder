<<<<<<< HEAD
/* eslint-disable prettier/prettier */
=======
/* eslint-disable no-prototype-builtins */
>>>>>>> 97bf0ba (bugzabugiem)
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { keyframes } from '@emotion/react';
=======
>>>>>>> 3553cda (workin)
import { CanvasWidget } from '@projectstorm/react-canvas-core';
>>>>>>> ca43750 (bigJD)
=======
import { keyframes } from '@emotion/react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
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

<<<<<<< HEAD
import { helperPortCreation } from '../additionalFunctions/diagramFunctions/helperPortCreation';
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
import { DemoCanvasWidget } from '../diagrams/CanvasWidget';
import { DemoButton, DemoWorkspaceWidget } from '../diagrams/WorkspaceWidget';
<<<<<<< HEAD
let count = 0;

function connectNodes(
  nodeFrom: { addPort: (arg0: DefaultPortModel) => any; name: any },
  nodeTo: { addPort: (arg0: DefaultPortModel) => any },
) {
  //just to get id-like structure
  count++;
  const portOut = nodeFrom.addPort(
    new DefaultPortModel(true, `${nodeFrom.name}-out-${count}`, 'Out'),
  );
  const portTo = nodeTo.addPort(
    new DefaultPortModel(false, `${nodeFrom.name}-to-${count}`, 'IN'),
  );
  return portOut.link(portTo);
<<<<<<< HEAD
<<<<<<< HEAD

  // ################# UNCOMMENT THIS LINE FOR PATH FINDING #############################
  // return portOut.link(
  //   portTo,
  //   engine.getLinkFactories().getFactory(PathFindingLinkFactory.NAME),
  // );
  // #####################################################################################
=======
>>>>>>> 1dbb889 (asdasdasd)
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
}
=======
>>>>>>> 5d30c48 (minor improvements)

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
        rankdir: 'LR',
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
  };

  componentDidMount(): void {
    this.autoDistribute();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  reroute() {
    this.props.engine
      .getLinkFactories()
      .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME)
      .calculateRoutingMatrix();
  }

  render() {
    return (
<<<<<<< HEAD
      <DemoWorkspaceWidget
        buttons={
          <DemoButton onClick={this.autoDistribute}>Re-distribute</DemoButton>
        }
      >
=======
      <DemoWorkspaceWidget>
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
        <DemoCanvasWidget>
          <CanvasWidget engine={this.props.engine} />
        </DemoCanvasWidget>
      </DemoWorkspaceWidget>
    );
  }
}
<<<<<<< HEAD
<<<<<<< HEAD

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
=======
>>>>>>> 5d30c48 (minor improvements)
// eslint-disable-next-line complexity
export default function createDiagrams(notNormalized: any, normalized: any) {
  const engine = createEngine();
<<<<<<< HEAD
  const node1 = new DefaultNodeModel({
=======
=======
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line complexity
>>>>>>> 6e146b0 (added needs (not working for multiple of the same jobs)
export default function createDiagrams(notNormalized: any, normalized: any) {
  const engine = createEngine();
<<<<<<< HEAD
  let node1 = new DefaultNodeModel({
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
    name: `${notNormalized.name}`,
    color: 'rgb(128,0,128)',
  });
=======
=======
=======
export function selfLink(obj: Record<string, string[]>): boolean {
  for (let job = 0; job < Object.keys(obj).length; job++) {
    if (Object.values(obj)[job].includes(Object.keys(obj)[job])) {
      return true;
    }
  }
  return false;
}
<<<<<<< HEAD
>>>>>>> 8a90232 (added errors, when self link is detected)
=======

export function allNeeds(obj: Record<string, string[]>, norm: any): boolean {
  if (norm !== undefined) {
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
          console.log(batch);
          return [true, batch];
        }
        batch.push([node, ...path]);
      }
    }
    queue = batch;
  }
  return [false, []];
}
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> e3754bf (checking for noNeeds)
=======
=======
export function sameNeeds(obj: Record<string, string[]>) {
  const helperArray: string[][] = Object.values(obj);
  //element.forEach(x => (empty[x] = (empty[x] || 0) + 1));
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
>>>>>>> 4cf2964 (checking for duplicate needs and deleted console logs)

>>>>>>> ff788b5 (fixed undefined normObj error)
const engine = createEngine();
// Smart routing engine
const pathfinding = engine
  .getLinkFactories()
  .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME);
// ## displays jobs, that are dependent on a specific job ##
export const isNeededFor: Record<string, string[]> = {};
// eslint-disable-next-line complexity
export default function createDiagrams(notNormalized: any, normalized: any) {
>>>>>>> f69a062 (refactoring#1)
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
>>>>>>> 7de6b50 (fixed undefined name error)

<<<<<<< HEAD
<<<<<<< HEAD
  node1.setPosition(69, 69);
<<<<<<< HEAD
  //const port1 = node1.addOutPort(`On: ${Object.keys(normalized['on'])} `);
=======
=======
  //node1.setPosition(69, 69);
>>>>>>> 3553cda (workin)
  let port1: DefaultPortModel;
  const ttt = Object.keys(normalized['on']);
  if (typeof ttt !== 'object') {
    port1 = node1.addOutPort(`On: ${Object.keys(normalized['on'])} `);
    console.log('ttt is not obj');
  } else {
    if (Object.keys(normalized['on'])) {
      port1 = node1.addOutPort(`On: ${Object.keys(normalized['on'])} `);
    }
    port1 = node1.addOutPort(`On: ${Object.keys(normalized['on'])} `);
  }
>>>>>>> ca43750 (bigJD)

  const node2 = new DefaultNodeModel({
    name: 'jobs',
    color: 'rgb(0,200,100)',
  });
  console.log(normalized['jobs']);
  //variable storing number or jobs withour parameter "needs"
  let numWithoutNeeds = 1;
  // array storing objects, that have parameter "needs" in format [name_of_the_job, job_object]
  const objWithNeeds: any[] = [];
  //node2.setPosition(49, 350);
  const port2 = node2.addInPort(`${Object.keys(normalized['jobs'])[0]}`);
  for (let i = 3; i < Object.keys(normalized['jobs']).length + 2; ++i) {
    if (
      normalized['jobs'][Object.keys(normalized['jobs'])[i - 2]]['needs'] ===
      undefined
    ) {
      //without needs
      node2.addInPort(`${Object.keys(normalized['jobs'])[i - 2]}`);
      numWithoutNeeds++;
    } else {
      objWithNeeds.push(Object.keys(normalized['jobs'])[i - 2]);
      objWithNeeds.push(
        normalized['jobs'][Object.keys(normalized['jobs'])[i - 2]],
      );
    }
  }
  console.log(node2);
  const portsOut: DefaultPortModel[] = [];
  const portsOutWithNeeds: DefaultPortModel[] = [];
  const portsIn: DefaultPortModel[] = [];
  // needs change - only displaying out ports of jobs that dont have needs
  for (let j = 0; j < Object.keys(normalized['jobs']).length; ++j) {
    portsOut.push(node2.addOutPort((j + 1).toString()));
  }
  const nodes: DefaultNodeModel[] = [];
=======
  node1.setPosition(69, 69);
=======
  let node1: DefaultNodeModel;
  if (notNormalized !== undefined) {
    node1 = new DefaultNodeModel({
      name: `${notNormalized.name}`,
      color: 'rgb(128,0,128)',
    });
  } else {
    node1 = new DefaultNodeModel({
      color: 'rgb(128,0,128)',
    });
  }

>>>>>>> 16fc321 (fixed conditional needs)
  let port1: DefaultPortModel;
  const helper = helperPortCreation(normalized, node1);
  if (!Array.isArray(helper)) {
    port1 = helper;
  } else {
    [port1, node1] = helper;
  }
  const node2 = new DefaultNodeModel({
    name: 'Jobs',
    color: 'rgb(0,200,100)',
  });
<<<<<<< HEAD
<<<<<<< HEAD
  node2.setPosition(49, 350);
=======
  console.log(normalized['jobs']);
<<<<<<< HEAD
  //variable storing number or jobs withour parameter "needs"
  let numWithoutNeeds = 0;
=======
=======
>>>>>>> 74b007e (nomoreconsol.logs)
  //variable storing number or jobs withour parameter "needs" - default value is 1, as the first job will never have parameter needs
  let numWithoutNeeds = 1;
>>>>>>> 39e9878 (fixed the second last needs bug)
  // array storing objects, that have parameter "needs" in format [name_of_the_job, job_object]
  const objWithNeeds: any[] = [];
  //node2.setPosition(49, 350);
<<<<<<< HEAD
>>>>>>> 6e146b0 (added needs (not working for multiple of the same jobs)
  const port2 = node2.addInPort(`${Object.keys(normalized['jobs'])[0]}`);
  for (let i = 3; i < Object.keys(normalized['jobs']).length + 2; ++i) {
    if (
      normalized['jobs'][Object.keys(normalized['jobs'])[i - 2]]['needs'] ===
      undefined
    ) {
=======
  // ## storing keys of jobs in normalized object ##
  const key: string[] = Object.keys(normalized.jobs);
  const port2: DefaultPortModel[] = [];
  const indexOfJobWithoutNeeds: number[] = [];
  for (let i = 0; i < key.length; ++i) {
<<<<<<< HEAD
    if (normalized['jobs'][key[i]]['needs'] === undefined) {
>>>>>>> f69a062 (refactoring#1)
      //without needs
      if (port2.length < 1) {
        port2.push(node2.addInPort(`${key[i]}`));
        continue;
=======
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
>>>>>>> 97c2311 (cycle detection)
      }
    }
  }
  const portsOut: DefaultPortModel[] = [];
  const portsOutWithNeeds: DefaultPortModel[] = [];
  const portsIn: DefaultPortModel[] = [];
<<<<<<< HEAD
=======
  // displaying number of ports
<<<<<<< HEAD
>>>>>>> a8725eb (fixed undefined in else statement)
  for (let j = 0; j < numWithoutNeeds; ++j) {
    portsOut.push(node2.addOutPort((j + 1).toString()));
  }
<<<<<<< HEAD
  const nodes: any[] = [];
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
=======
  const nodes: DefaultNodeModel[] = [];
>>>>>>> 6e146b0 (added needs (not working for multiple of the same jobs)
  for (let z = 0; z < Object.keys(normalized['jobs']).length; ++z) {
    nodes.push(
=======
  for (let j = 1; j < numWithoutNeeds + 1; ++j) {
    portsOut.push(node2.addOutPort(j.toString()));
  }
  const jobs: DefaultNodeModel[] = [];

  // ## creating nodes for jobs and object for reverse tracking our dependencies##
  for (const jobName of key) {
    jobs.push(
>>>>>>> f69a062 (refactoring#1)
      new DefaultNodeModel({
        name: `${jobName}`,
        color: 'rgb(204,204,9)',
      }),
    );
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    //nodes[z].setPosition(300, (z + 1) * 175);
=======
>>>>>>> 16fc321 (fixed conditional needs)
=======
>>>>>>> a8725eb (fixed undefined in else statement)
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].needs) {
      nodes[z].addInPort(
        `${normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].needs}`,
<<<<<<< HEAD
=======
    nodes[z].setPosition(300, (z + 1) * 175);
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].needs) {
      nodes[z].addInPort(
        `Needs: ${
          normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].needs
        }`,
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
=======
>>>>>>> 6e146b0 (added needs (not working for multiple of the same jobs)
      );
    }
<<<<<<< HEAD
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if) {
      nodes[z].addInPort(
<<<<<<< HEAD
        `if: ${normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if}`,
      );
    }
=======
>>>>>>> 08d49b7 (JOTDEE)
    nodes[z].addInPort(
      `runs-on: ${
<<<<<<< HEAD
        normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['runs-on']
      }`,
    );
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if) {
      nodes[z].addInPort(
        `if: ${normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if}`,
      );
=======
=======
    isNeededFor[`${jobName}`] = [];
>>>>>>> 1a1d60c (added reverse dependency (job is needed by....))
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
>>>>>>> f69a062 (refactoring#1)
    }
    //preventing additional output, that we dont want
=======
        `If: ${normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if}`,
      );
    }
    nodes[z].addInPort(
      `Runs-on: ${
        normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['runs-on']
      }`,
    );
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
=======
        normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['runs-on']
      }`,
    );
    //preventing additional output, that we dont want
>>>>>>> 6e146b0 (added needs (not working for multiple of the same jobs)
    let x = 0;
<<<<<<< HEAD
    for (
      let h = 0;
      h <
      normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['steps']
        .length;
      ++h
    ) {
      for (const prop in normalized['jobs'][
        `${Object.keys(normalized['jobs'])[z]}`
      ]['steps'][h]) {
        console.log(
          normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['steps'],
        );
<<<<<<< HEAD
        // SEEMS TO NOT WORKING NOT SURE THO
        // if (
        //   normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['steps'][
        //     'uses'
        //   ]
        // ) {
        //   console.log('JESTEM');
        //   nodes[z].addInPort(
        //     normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`][
        //       'steps'
        //     ]['uses'],
        //   );
        // }
=======
        //for now not needed
        /* if (
          normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['steps'][
            'uses'
          ]
        ) {
          nodes[z].addInPort(
            normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`][
              'steps'
            ]['uses'],
          );
        }*/
>>>>>>> a8725eb (fixed undefined in else statement)
=======
    for (let step = 0; step < keysJobs.steps.length; ++step) {
      for (const prop in keysJobs.steps[step]) {
<<<<<<< HEAD
        console.log(keysJobs.steps);
>>>>>>> f69a062 (refactoring#1)
=======
>>>>>>> e3754bf (checking for noNeeds)
        if (x === 0) {
          jobs[nodeNumber].addInPort('steps:');
          portsIn.push(
            jobs[nodeNumber].addInPort(
              `${prop}: ${keysJobs.steps[step][prop]}`,
            ),
          );
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          // out port, just in case said job is needed by another job
          portsOutWithNeeds.push(nodes[z].addOutPort(''));
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
=======
=======

>>>>>>> 08d49b7 (JOTDEE)
          // out port, just in case said job is needed by another job
          portsOutWithNeeds.push(nodes[z].addOutPort(''));
>>>>>>> 6e146b0 (added needs (not working for multiple of the same jobs)
=======
          // out port, just in case said job is needed by another job
          portsOutWithNeeds.push(jobs[nodeNumber].addOutPort(''));
>>>>>>> f69a062 (refactoring#1)
          x++;
          continue;
        }
        jobs[nodeNumber].addInPort(`${prop}: ${keysJobs.steps[step][prop]}`);
      }
    }
  }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  // link.addLabel('Hello react!');
  //const link = port1.link<DefaultLinkModel>(port2);
=======
  const link = port1.link<DefaultLinkModel>(port2);
>>>>>>> ca43750 (bigJD)
=======
  const link = port1.link<DefaultLinkModel>(port2);
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
=======
  console.log(nodes[1]);
  console.log(portsIn);
  const link = port1.link<DefaultLinkModel>(port2);
  console.log(portsOutWithNeeds);
>>>>>>> 6e146b0 (added needs (not working for multiple of the same jobs)
  const links: DefaultLinkModel[] = [];
  const linksWithNeeds: DefaultLinkModel[] = [];
  //array storing links of jobs with needs
  const link2: DefaultPortModel[] = [];
  for (let c = 0; c < portsIn.length; c++) {
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs) {
      for (let element = 0; element < nodes.length - 1; ++element) {
        for (
          let need = 0;
          need <
          normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs
            .length;
          ++need
        ) {
          if (
            nodes[element]['options']['name'] ===
            nodes[element + 1]['portsIn'][0]['options']['label']
          ) {
            linksWithNeeds.push(
              portsOutWithNeeds[element].link<DefaultLinkModel>(
                portsIn[element + 1],
              ),
            );
          }

          console.log(
            normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs[
              need
            ],
          );
        }
      }
    } else {
      links.push(portsOut[c].link<DefaultLinkModel>(portsIn[c]));
    }
  }
  const model = new DiagramModel();
  model.addAll(node1, node2, ...nodes, link, ...links, ...linksWithNeeds);
  // user can not alter the output (can be added to the whole model or to specific nodes only)
  engine.setModel(model);
  return <DemoWidget model={model} engine={engine} />;
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)

function helperPortCreation(normal: any, node: DefaultNodeModel): any {
  const ttt = Object.keys(normal['on']);
  const tt = normal['on'];
  const preventDuplicate: string[] = [];
  let port: DefaultPortModel;
  if (typeof tt !== 'object' || Array.isArray(tt)) {
    port = node.addOutPort(`On: ${ttt} `);
  } else {
    port = node.addOutPort(`On: ${ttt} `);
    for (const properties in tt) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
      console.log(tt[properties]);
      console.log(tt[properties]);
>>>>>>> c4828f6 (unwo)
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
      if (tt[properties] !== null && Object.keys(tt[properties]).length !== 0) {
        // eslint-disable-next-line no-prototype-builtins
        if (preventDuplicate.length === 0) {
          node.addOutPort(`Branches: ${tt[properties]['branches']}`);
          preventDuplicate.push(tt[properties]['branches']);
        } else {
          for (let i = 0; i < preventDuplicate.length; ++i) {
            for (let j = 0; j < tt[properties]['branches'].length; ++j) {
              if (preventDuplicate[i][i] === tt[properties]['branches'][j]) {
                continue;
              } else {
                node.addOutPort(tt[properties]['branches'][j]);
              }
            }
<<<<<<< HEAD
=======
  console.log(nodes[0]);
  console.log(nodes[1]);
  console.log(nodes[2]);
  // console.log(portsIn);
=======
>>>>>>> 74b007e (nomoreconsol.logs)
=======
  const model = new DiagramModel();
  model.addAll(node1, node2, ...jobs);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> f69a062 (refactoring#1)
  const link = port1.link<DefaultLinkModel>(port2);
<<<<<<< HEAD
  const links: DefaultLinkModel[] = [];
  const linksWithNeeds: DefaultLinkModel[] = [];
  //storing node, that need more than 1 node (split on ',' sign)
  let needsArr: any = [];
  // value used to prevent additional links between jobs with attribute "needs"
  let k = 0;
<<<<<<< HEAD
  // value used to prevent self-link of nodes
<<<<<<< HEAD
  const s = 0;
=======
=======
  // value used to prevent self-link of jobs
>>>>>>> f69a062 (refactoring#1)
  let s = 0;
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> f8728ba (jotde)
=======
  let xd = 0;
>>>>>>> 16fc321 (fixed conditional needs)
=======
  //variable needed to correctly link nodes, that don't have needs
  let noNeeds = 0;
<<<<<<< HEAD
>>>>>>> a8725eb (fixed undefined in else statement)
=======
  let singleNeeds = 0;
<<<<<<< HEAD
>>>>>>> 531f151 (fixed double links)
=======
  const allLinksArr: string[][] = [];
  const allLinksWithoutArr: string[][] = [];
  const preventAdditionalLinks: string[] = [];
>>>>>>> 0affa08 (one workflow working)
  for (let c = 0; c < portsIn.length; c++) {
<<<<<<< HEAD
    console.log(normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs);
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      console.log(nodes.length);
      for (
        let need = 0;
        need <
        normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs
          .length;
        ++need
      ) {
        for (let element = 1; element < portsIn.length; element++) {
          console.log(nodes[c - 1]['options']['name']);
          console.log(nodes[element]['portsIn'][0]['options']['label']);
          if (
            nodes[c - 1]['options']['name'] ===
            nodes[element]['portsIn'][0]['options']['label']
          ) {
            console.log('WCHODZE');
            linksWithNeeds.push(
              portsOutWithNeeds[c - 1].link<DefaultLinkModel>(portsIn[element]),
            );
>>>>>>> 3553cda (workin)
          }
=======
=======
      console.log('if sprawdzający needs');
<<<<<<< HEAD
>>>>>>> 39e9878 (fixed the second last needs bug)
=======
      console.log(normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs);
>>>>>>> 2d27da0 (cos)
      // console.log(nodes.length);
      // for (
      //   let need = 0;
      //   need <
      //   normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs
      //     .length;
      //   ++need
      // ) {
=======
>>>>>>> 97bf0ba (bugzabugiem)
      for (let element = c; element < portsIn.length; element++) {
        console.log(nodes[element]);
        console.log(element);
        
          if (nodes[element]['portsIn'][0]['options']['label']?.includes(',')) {
            needsArr = nodes[element]['portsIn'][0]['options']['label']?.split(
=======
      for (let element = c; element < portsIn.length; element++) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
        console.log(nodes[element]['portsIn'][0]['options']['label']);
>>>>>>> a8725eb (fixed undefined in else statement)
        if (nodes[element]['portsIn'][0]['options']['label']?.includes(',')) {
          needsArr = nodes[element]['portsIn'][0]['options']['label']?.split(
>>>>>>> 74b007e (nomoreconsol.logs)
            ',',
<<<<<<< HEAD
            );
            console.log('dziele');
            console.log(c);
          }
          // console.log(needsArr);
          console.log(nodes[c - 1]['options']['name']);
          console.log(nodes[element]);
          if (needsArr.length) {
            console.log('JD');
            for (let need = 0; need < needsArr.length; ++need) {
              console.log(need);
              console.log(nodes[c - 1]['options']['name']);
              console.log(needsArr[need]);
              if (nodes[c - 1]['options']['name'] === needsArr[need] ) {
                console.log('IN');
                const val = Object.values(portsIn[element]['parent']['options']);
              const val2 = Object.values(
                portsOutWithNeeds[c - 1]['parent']['options'],
              );
              console.log(val[2], val2[2]);
              if (val[2] !== val2[2]) {
                linksWithNeeds.push(
                  portsOutWithNeeds[c - 1].link<DefaultLinkModel>(
                    portsIn[element],
                  ),
                );
              }
=======
          );
        }
        if (needsArr.length) {
          console.log(needsArr);
          for (let need = 0; need < needsArr.length; ++need) {
            for (let n = 0; n < portsIn.length; n++) {
              if (
                nodes[n]['options']['name'] === needsArr[need] &&
                s < portsIn.length - 1
              ) {
                s++;
                const val = Object.values(
                  portsIn[element]['parent']['options'],
                );
                const val2 = Object.values(
                  portsOutWithNeeds[n]['parent']['options'],
                );
                if (val[2] !== val2[2]) {
                  console.log(val[2], val2[2]);
                  linksWithNeeds.push(
                    portsOutWithNeeds[n].link<DefaultLinkModel>(
                      portsIn[element],
                    ),
=======
        if (
          normalized['jobs'][`${Object.keys(normalized['jobs'])[element]}`]
            .needs
        ) {
          if (nodes[element]['portsIn'][0]['options']['label']?.includes(',')) {
            console.log(nodes[element]['options']['name']);
            console.log(nodes[element]['portsIn'][0]['options']['label']);
=======
    if (normalized['jobs'][`${key[c]}`].needs) {
      for (let element = c; element < portsIn.length; element++) {
        if (normalized['jobs'][`${key[element]}`].needs) {
          if (jobs[element]['portsIn'][0]['options']['label']?.includes(',')) {
            console.log(jobs[element]['options']['name']);
            console.log(jobs[element]['portsIn'][0]['options']['label']);
>>>>>>> f69a062 (refactoring#1)
            console.log('jestem');
            console.log(element);
            console.log(c);
            console.log(portsOutWithNeeds);
            needsArr = jobs[element]['portsIn'][0]['options']['label']?.split(
              ',',
            );
          } else {
            singleNeeds++;
            console.log(singleNeeds);
          }
          if (needsArr.length) {
            console.log(needsArr);
            console.log('HERE');
            for (let need = 0; need < needsArr.length; ++need) {
              for (let n = 0; n < portsIn.length; n++) {
                console.log(jobs[n]['options']['name']);
                console.log(needsArr[need]);
                console.log('i am in double for');
                if (jobs[n]['options']['name'] === needsArr[need]) {
                  // kuuurwa.push(
                  //   `${jobs[n]['options']['name']}, ${needsArr[need]}`,
                  // );
                  s++;
                  console.log('SAME');
                  const val = Object.values(
                    portsIn[element]['parent']['options'],
>>>>>>> 16fc321 (fixed conditional needs)
                  );
                  const val2 = Object.values(
                    portsOutWithNeeds[n]['parent']['options'],
                  );
                  //ATTENITON1!!!!!11!!!!!!
                  // if (val[2] !== val2[2]) {
                  console.log(
                    `${jobs[n]['options']['id']}, ${jobs[n]['options']['name']}, ${needsArr[need]}`,
                  );
                  if (
                    !preventAdditionalLinks.includes(
                      `${need}, ${jobs[n]['options']['id']}, ${jobs[n]['options']['name']}, ${needsArr[need]}, ${val2[2]}`,
                    )
                  ) {
                    console.log('IN');
                    preventAdditionalLinks.push(
                      `${need}, ${jobs[n]['options']['id']}, ${jobs[n]['options']['name']}, ${needsArr[need]}, ${val2[2]}`,
                    );
                    console.log('links: ', preventAdditionalLinks);
                    linksWithNeeds.push(
                      portsOutWithNeeds[n].link<DefaultLinkModel>(
                        portsIn[element],
                      ),
                    );
                  } else {
                    console.log('nie wchodze');
                    console.log(
                      `${jobs[n]['options']['id']}, ${jobs[n]['options']['name']}, ${needsArr[need]}`,
                    );
                    console.log(preventAdditionalLinks);
                  }
                  allLinksArr.push([
                    `Source job: ${jobs[n]['options']['name']}`,
                    `Destination needs in ${jobs[element]['options']['name']}: ${needsArr[need]}`,
                  ]);
                  // } else {
                  //   console.log(val[2], val2[2]);
                  //   console.log(portsIn);
                  //   console.log(portsOutWithNeeds);
                  //   console.log('NIE ZGADZA SIE');
                  // }
                }
>>>>>>> 97bf0ba (bugzabugiem)
              }
            }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        } else if (
          nodes[c - 1]['options']['name'] ===
          nodes[element]['portsIn'][0]['options']['label']
        ) {
          console.log('WCHODZE');
          linksWithNeeds.push(
            portsOutWithNeeds[c - 1].link<DefaultLinkModel>(portsIn[element]),
          );
>>>>>>> fd7b4a4 (linkerr)
=======
        } else if (k < portsIn.length - 1) {
=======
           else if (k < portsIn.length - 1) {
>>>>>>> 2d27da0 (cos)
=======
        } else if (k < portsIn.length - numWithoutNeeds) {
>>>>>>> 45ef4cc (nomorebugs)
          // loop that goes from the first node, and checks, if said node is needed by another job
          for (let node = 0; node < portsIn.length; ++node) {
            if (
              nodes[node]['options']['name'] ===
              nodes[element]['portsIn'][0]['options']['label']
            ) {
              linksWithNeeds.push(
                portsOutWithNeeds[node].link<DefaultLinkModel>(
                  portsIn[element],
                ),
              );
=======
          } else if (k < portsIn.length - numWithoutNeeds) {
=======
          } else if (k < singleNeeds / 2) {
>>>>>>> 531f151 (fixed double links)
=======
          } else if (k < Math.ceil(singleNeeds / 2)) {
>>>>>>> 0affa08 (one workflow working)
            console.log('ONLY ONE NEEDS');
            console.log(jobs[element]['options']['name']);
            console.log(jobs);
            console.log(element);
            console.log(jobs[element]);
            console.log(k);
            console.log(portsIn);
            // loop that goes from the first node, and checks, if said node is needed by another job
            for (let node = 0; node < portsIn.length; ++node) {
              if (
                jobs[node]['options']['name'] ===
                jobs[element]['portsIn'][0]['options']['label']
              ) {
                console.log(node);
                console.log('JASKIER');
                linksWithNeeds.push(
                  portsOutWithNeeds[node].link<DefaultLinkModel>(
                    portsIn[element],
                  ),
                );
                allLinksWithoutArr.push([
                  `Source job: ${jobs[node]['options']['name']}`,
                  `Destination needs in ${jobs[element]['options']['name']}: ${jobs[element]['portsIn'][0]['options']['label']}`,
                ]);
              }
>>>>>>> 16fc321 (fixed conditional needs)
            }
            k++;
=======
=======
  const link = port1.link<DefaultLinkModel>(port2[0]);
>>>>>>> 8dccfbf (working diagrams)
=======
  // TypeError: Cannot read property 'addLink' of undefined - sometimes
=======
>>>>>>> 4cf2964 (checking for duplicate needs and deleted console logs)
  let link: DefaultLinkModel;
  if (port2[0] !== undefined) {
    link = port1.link<DefaultLinkModel>(port2[0]);
  } else {
    link = port1.link<DefaultLinkModel>(port1);
  }
>>>>>>> e3754bf (checking for noNeeds)
  const linksWithoutNeeds: DefaultLinkModel[] = [];
  const linksWithOneNeed: DefaultLinkModel[] = [];
  const linksWithMultipleNeeds: DefaultLinkModel[] = [];
  // ## loop used to add dependencies to our object (isNeededFor)
  for (let job = 0; job < key.length; job++) {
    for (let nod = 0; nod < key.length; nod++) {
      if (normalized['jobs'][`${key[job]}`].needs) {
        for (const element of normalized['jobs'][`${key[job]}`].needs) {
          if (element === key[nod]) {
            // isNeededFor[jobs[job]['options'].name]
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
              console.log(portsOutWithNeeds[jobName]);
              console.log(portsIn[job]);
              const link1 = Object.values(
                portsOutWithNeeds[jobName]['parent']['options'],
              )[2];
              const link2 = Object.values(portsIn[job]['parent']['options'])[2];
              console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~');
              console.log(link1);
              console.log(link2);
              console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~');
              if (!linksBetweenJobs[`${link1}${link2}`]) {
                linksBetweenJobs[`${link1}${link2}`] = [];
              }
              linksBetweenJobs[`${link1}${link2}`].push(
                portsOutWithNeeds[jobName].link<DefaultLinkModel>(portsIn[job]),
              );
              /*linksWithMultipleNeeds.push(
                portsOutWithNeeds[jobName].link<DefaultLinkModel>(portsIn[job]),
              );*/
              // ## Smart routing links (looks bad)
              // linksWithMultipleNeeds.push(
              //   portsOutWithNeeds[jobName].link(portsIn[job], pathfinding),
              // );
            }
>>>>>>> 0b045eb (working diagrams (some minor bugs))
          }
<<<<<<< HEAD
          k++;
>>>>>>> 39e9878 (fixed the second last needs bug)
=======
>>>>>>> 16fc321 (fixed conditional needs)
        }
      } else {
        for (let jobName = 0; jobName < key.length; ++jobName) {
          if (needsOfJob[0] === key[jobName]) {
            console.log(portsOutWithNeeds[jobName]['parent']['options']);
            const link1 = Object.values(
              portsOutWithNeeds[jobName]['parent']['options'],
            )[2];
            const link2 = Object.values(portsIn[job]['parent']['options'])[2];
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~');
            console.log(link1);
            console.log(link2);
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~');
            if (!linksBetweenJobs[`${link1}${link2}`]) {
              linksBetweenJobs[`${link1}${link2}`] = [];
            }

            linksBetweenJobs[`${link1}${link2}`].push(
              portsOutWithNeeds[jobName].link<DefaultLinkModel>(portsIn[job]),
            );
            /*linksWithOneNeed.push(
              portsOutWithNeeds[jobName].link<DefaultLinkModel>(portsIn[job]),
            );*/
          }
        }
      }
<<<<<<< HEAD
      // console.log(
      //   normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs[
      //     need
      //   ],
      // );
=======
>>>>>>> 74b007e (nomoreconsol.logs)
    } else {
      //tutaj jak nie ma needs
      const portsOut2: DefaultPortModel[] = [];
<<<<<<< HEAD
<<<<<<< HEAD
      portsOut2.push(portsOut[xd]);
      links.push(portsOut2[0].link<DefaultLinkModel>(portsIn[c]));
      if (xd < numWithoutNeeds) {
        xd++;
=======
      portsOut2.push(portsOut[noNeeds]);
      links.push(portsOut2[0].link<DefaultLinkModel>(portsIn[c]));
      // incrementing to the number of jobs without needs
      if (noNeeds < numWithoutNeeds) {
        noNeeds++;
>>>>>>> a8725eb (fixed undefined in else statement)
=======
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
>>>>>>> 0b045eb (working diagrams (some minor bugs))
      }
    }
  }
  // const model = new DiagramModel();
  if (link !== undefined) {
    model.addAll(link);
    link.setLocked(true);
  }
  model.addAll(...linksWithoutNeeds);
  const cycledJobs = checkCycles(isNeededFor);
  console.log(cycledJobs);
  for (const key in linksBetweenJobs) {
    if (linksBetweenJobs[key].length > 1) {
      for (const link of linksBetweenJobs[key]) {
        link.setColor('#FF0000');
      }
    }
  }
  if (cycledJobs[0] && Array.isArray(cycledJobs[1])) {
    for (let i = 0; i < cycledJobs[1][0].length - 1; i++) {
      const cycledKey = `${cycledJobs[1][0][i]}${cycledJobs[1][0][i + 1]}`;
      console.log(linksBetweenJobs[cycledKey]);
      linksBetweenJobs[cycledKey][0].setColor('#043d04');
    }
  }
  for (const key of Object.values(linksBetweenJobs)) {
    for (let i = 0; i < key.length; i++) {
      model.addAll(key[i]);
    }
  }
  /*model.addAll(
    ...linksWithOneNeed,
    ...linksWithMultipleNeeds,
    ...linksWithoutNeeds,
  );*/

  // user can not alter the output (can be added to the whole model or to specific jobs only)
  engine.setModel(model);
  for (let l = 0; l < linksWithOneNeed.length; ++l) {
    linksWithOneNeed[l].setLocked(true);
  }
  for (let l = 0; l < linksWithMultipleNeeds.length; ++l) {
    linksWithMultipleNeeds[l].setLocked(true);
  }
  for (let l = 0; l < linksWithoutNeeds.length; ++l) {
    linksWithoutNeeds[l].setLocked(true);
  }
  return <DemoWidget model={model} engine={engine} />;
}
>>>>>>> 1dbb889 (asdasdasd)
=======
          }
        }
      }
    }
    return [port, node];
  }
  return port;
}
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
