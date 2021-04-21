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
=======
import { keyframes } from '@emotion/react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
>>>>>>> ca43750 (bigJD)
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
<<<<<<< HEAD

  // ################# UNCOMMENT THIS LINE FOR PATH FINDING #############################
  // return portOut.link(
  //   portTo,
  //   engine.getLinkFactories().getFactory(PathFindingLinkFactory.NAME),
  // );
  // #####################################################################################
=======
>>>>>>> 1dbb889 (asdasdasd)
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
      <DemoWorkspaceWidget>
        <DemoCanvasWidget>
          <CanvasWidget engine={this.props.engine} />
        </DemoCanvasWidget>
      </DemoWorkspaceWidget>
    );
  }
}

export default function createDiagrams(notNormalized: any, normalized: any) {
  const engine = createEngine();
  const node1 = new DefaultNodeModel({
    name: `${notNormalized.name}`,
    color: 'rgb(128,0,128)',
  });

  node1.setPosition(69, 69);
<<<<<<< HEAD
  //const port1 = node1.addOutPort(`On: ${Object.keys(normalized['on'])} `);
=======
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
    name: 'Jobs',
    color: 'rgb(0,200,100)',
  });
  node2.setPosition(49, 350);
  const port2 = node2.addInPort(`${Object.keys(normalized['jobs'])[0]}`);
  for (let i = 3; i < Object.keys(normalized['jobs']).length + 2; ++i) {
    node2.addInPort(`${Object.keys(normalized['jobs'])[i - 2]}`);
  }
  const portsOut: DefaultPortModel[] = [];
  const portsIn: DefaultPortModel[] = [];
  for (let j = 0; j < Object.keys(normalized['jobs']).length; ++j) {
    portsOut.push(node2.addOutPort((j + 1).toString()));
  }
  const nodes: any[] = [];
  for (let z = 0; z < Object.keys(normalized['jobs']).length; ++z) {
    nodes.push(
      new DefaultNodeModel({
        name: `${Object.keys(normalized['jobs'])[z]}`,
        color: 'rgb(204,204,9)',
      }),
    );
    nodes[z].setPosition(300, (z + 1) * 175);
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].needs) {
      nodes[z].addInPort(
        `Needs: ${
          normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].needs
        }`,
      );
    }
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if) {
      nodes[z].addInPort(
        `If: ${normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if}`,
      );
    }
    nodes[z].addInPort(
      `Runs-on: ${
        normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['runs-on']
      }`,
    );
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
<<<<<<< HEAD
  // link.addLabel('Hello react!');
  //const link = port1.link<DefaultLinkModel>(port2);
=======
  const link = port1.link<DefaultLinkModel>(port2);
>>>>>>> ca43750 (bigJD)
  const links: DefaultLinkModel[] = [];
  for (let c = 0; c < portsOut.length; c++) {
    links.push(portsOut[c].link<DefaultLinkModel>(portsIn[c]));
  }
  const model = new DiagramModel();
  model.addAll(node1, node2, ...nodes, link, ...links);
  // user can not alter the output (can be added to the whole model or to specific nodes only)
  engine.setModel(model);
  return <DemoWidget model={model} engine={engine} />;
}
<<<<<<< HEAD
=======

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
          }
        }
      }
    }
    return [port, node];
  }
  return port;
}
>>>>>>> 1dbb889 (asdasdasd)
