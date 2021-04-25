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
import React from 'react';

import { helperPortCreation } from '../additionalFunctions/diagramFunctions/helperPortCreation';
import { DemoCanvasWidget } from '../diagrams/CanvasWidget';
import { DemoButton, DemoWorkspaceWidget } from '../diagrams/WorkspaceWidget';
let count = 0;

function connectNodes(
  nodeFrom: { addPort: (arg0: DefaultPortModel) => any; name: any },
  nodeTo: { addPort: (arg0: DefaultPortModel) => any },
  engine: DiagramEngine,
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
}

class DemoWidget extends React.Component<
  { model: DiagramModel; engine: DiagramEngine },
  any
> {
  // eslint-disable-next-line react/sort-comp
  engine: DagreEngine;
  constructor(props: any) {
    super(props);
    this.engine = new DagreEngine({
      graph: {
        rankdir: 'BR',
        ranker: 'longest-path',
        marginx: 10,
        marginy: 10,
      },
      includeLinks: true,
    });
  }
  autoDistribute = () => {
    this.engine.redistribute(this.props.model);
    this.reroute();
    this.props.engine.repaintCanvas();
  };

  componentDidMount(): void {
    setTimeout(() => {
      this.autoDistribute();
    }, 0);
  }

  reroute() {
    this.props.engine
      .getLinkFactories()
      .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME)
      .calculateRoutingMatrix();
  }

  render() {
    return (
      <DemoWorkspaceWidget
        buttons={
          <DemoButton onClick={this.autoDistribute}>Re-distribute</DemoButton>
        }
      >
        <DemoCanvasWidget>
          <CanvasWidget engine={this.props.engine} />
        </DemoCanvasWidget>
      </DemoWorkspaceWidget>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line complexity
export default function createDiagrams(notNormalized: any, normalized: any) {
  const engine = createEngine();
  let node1 = new DefaultNodeModel({
    name: `${notNormalized.name}`,
    color: 'rgb(128,0,128)',
  });

  //node1.setPosition(69, 69);
  let port1: DefaultPortModel;
  const helper = helperPortCreation(normalized, node1);
  // eslint-disable-next-line prefer-const
  if (!Array.isArray(helper)) {
    port1 = helper;
  } else {
    [port1, node1] = helper;
  }
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
  for (let z = 0; z < Object.keys(normalized['jobs']).length; ++z) {
    nodes.push(
      new DefaultNodeModel({
        name: `${Object.keys(normalized['jobs'])[z]}`,
        color: 'rgb(204,204,9)',
      }),
    );
    //nodes[z].setPosition(300, (z + 1) * 175);
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].needs) {
      nodes[z].addInPort(
        `${normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].needs}`,
      );
    }
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if) {
      nodes[z].addInPort(
        `if: ${normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if}`,
      );
    }
    nodes[z].addInPort(
      `runs-on: ${
        normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['runs-on']
      }`,
    );
    //preventing additional output, that we dont want
    let x = 0;
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
        if (x === 0) {
          portsIn.push(
            nodes[z].addInPort(
              `${prop}: ${
                normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`][
                  'steps'
                ][h][prop]
              }`,
            ),
          );
          // out port, just in case said job is needed by another job
          portsOutWithNeeds.push(nodes[z].addOutPort(''));
          x++;
          continue;
        }

        nodes[z].addInPort(
          `${prop}: ${
            normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`][
              'steps'
            ][h][prop]
          }`,
        );
      }
    }
  }
  console.log(nodes[0]);
  console.log(nodes[1]);
  // console.log(portsIn);
  const link = port1.link<DefaultLinkModel>(port2);
  // console.log(portsOutWithNeeds);
  const links: DefaultLinkModel[] = [];
  const linksWithNeeds: DefaultLinkModel[] = [];
  //array storing links of jobs with needs
  const link2: DefaultPortModel[] = [];
  for (let c = 0; c < portsIn.length; c++) {
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs) {
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
          }
        }

        // console.log(
        //   normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs[
        //     need
        //   ],
        // );
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
