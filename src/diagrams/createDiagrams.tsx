/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import { keyframes } from '@emotion/react';
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
  DiagramEngine,
  DefaultPortModel,
} from '@projectstorm/react-diagrams';
import React from 'react';

export default function createDiagrams(notNormalized: any, normalized: any) {
  const engine = createEngine();
  const node1 = new DefaultNodeModel({
    name: `${notNormalized.name}`,
    color: 'rgb(100,100,100)',
  });

  node1.setPosition(69, 69);
  const port1 = node1.addOutPort(`On: ${Object.keys(normalized['on'])} `);

  const node2 = new DefaultNodeModel({
    name: 'Jobs',
    color: 'rgb(100,100,100)',
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
        color: 'rgb(100,100,100)',
      }),
    );
    nodes[z].setPosition(300, (z + 1) * 145);
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
  // link.addLabel('Hello react!');
  const link = port1.link<DefaultLinkModel>(port2);
  const links: DefaultLinkModel[] = [];
  const s = nodes[0];
  console.log(s);
  console.log(port2);
  for (let c = 0; c < portsOut.length; c++) {
    links.push(portsOut[c].link<DefaultLinkModel>(portsIn[c]));
  }
  // links[0] = port1.link<DefaultLinkModel>(nodes[1]);
  // links[0] = portsOut[0].link<DefaultLinkModel>(nodes[0]);
  console.log(portsOut);
  console.log(portsIn);
  const model = new DiagramModel();
  model.addAll(node1, node2, ...nodes, link, ...links);
  // user can not alter the output (can be added to the whole model or to specific nodes only)
  model.setLocked();
  engine.setModel(model);
  // model.setLocked(true);
  return engine;
}
