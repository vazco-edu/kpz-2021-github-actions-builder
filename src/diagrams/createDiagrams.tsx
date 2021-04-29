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
  //variable storing number or jobs withour parameter "needs" - default value is 1, as the first job will never have parameter needs
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
  const portsOut: DefaultPortModel[] = [];
  const portsOutWithNeeds: DefaultPortModel[] = [];
  const portsIn: DefaultPortModel[] = [];
  // needs change - only displaying out ports of jobs that dont have needs
  for (let j = 0; j < numWithoutNeeds; ++j) {
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
    nodes[z].addInPort(
      `runs-on: ${
        normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['runs-on']
      }`,
    );
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if) {
      nodes[z].addInPort(
        `if: ${normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if}`,
      );
    }
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
        console.log(
          normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['steps'],
        );
        if (
          normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['steps'][
            'uses'
          ]
        ) {
          nodes[z].addInPort(
            normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`][
              'steps'
            ]['uses'],
          );
        }
        if (x === 0) {
          nodes[z].addInPort('steps:');
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
  const link = port1.link<DefaultLinkModel>(port2);
  const links: DefaultLinkModel[] = [];
  const linksWithNeeds: DefaultLinkModel[] = [];
  let needsArr: any = [];
  // value used to prevent additional links between nodes with attribute "needs"
  let k = 0;
  // value used to prevent self-link of nodes
  let s = 0;
  for (let c = 0; c < portsIn.length; c++) {
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs) {
      for (let element = c; element < portsIn.length; element++) {
        if (nodes[element]['portsIn'][0]['options']['label']?.includes(',')) {
          needsArr = nodes[element]['portsIn'][0]['options']['label']?.split(
            ',',
          );
        }
        if (needsArr.length) {
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
                  linksWithNeeds.push(
                    portsOutWithNeeds[n].link<DefaultLinkModel>(
                      portsIn[element],
                    ),
                  );
                }
              }
            }
          }
        } else if (k < portsIn.length - numWithoutNeeds) {
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
            }
          }
          k++;
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
  link.setLocked(true);
  for (let l = 0; l < links.length; ++l) {
    links[l].setLocked(true);
  }
  for (let l = 0; l < linksWithNeeds.length; ++l) {
    linksWithNeeds[l].setLocked(true);
  }
  return <DemoWidget model={model} engine={engine} />;
}
