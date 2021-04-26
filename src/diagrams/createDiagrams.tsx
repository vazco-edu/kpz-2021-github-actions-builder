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
import React from 'react';

<<<<<<< HEAD
import { helperPortCreation } from '../additionalFunctions/diagramFunctions/helperPortCreation';
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line complexity
export default function createDiagrams(notNormalized: any, normalized: any) {
  const engine = createEngine();
  const node1 = new DefaultNodeModel({
=======
=======
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line complexity
>>>>>>> 6e146b0 (added needs (not working for multiple of the same jobs)
export default function createDiagrams(notNormalized: any, normalized: any) {
  const engine = createEngine();
  let node1 = new DefaultNodeModel({
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
    name: `${notNormalized.name}`,
    color: 'rgb(128,0,128)',
  });

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
  let port1: DefaultPortModel;
  const helper = helperPortCreation(normalized, node1);
  // eslint-disable-next-line prefer-const
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
  node2.setPosition(49, 350);
=======
  console.log(normalized['jobs']);
<<<<<<< HEAD
  //variable storing number or jobs withour parameter "needs"
  let numWithoutNeeds = 0;
=======
  //variable storing number or jobs withour parameter "needs" - default value is 1, as the first job will never have parameter needs
  let numWithoutNeeds = 1;
>>>>>>> 39e9878 (fixed the second last needs bug)
  // array storing objects, that have parameter "needs" in format [name_of_the_job, job_object]
  const objWithNeeds: any[] = [];
  //node2.setPosition(49, 350);
>>>>>>> 6e146b0 (added needs (not working for multiple of the same jobs)
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
<<<<<<< HEAD
  const nodes: any[] = [];
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
=======
  const nodes: DefaultNodeModel[] = [];
>>>>>>> 6e146b0 (added needs (not working for multiple of the same jobs)
  for (let z = 0; z < Object.keys(normalized['jobs']).length; ++z) {
    nodes.push(
      new DefaultNodeModel({
        name: `${Object.keys(normalized['jobs'])[z]}`,
        color: 'rgb(204,204,9)',
      }),
    );
<<<<<<< HEAD
    //nodes[z].setPosition(300, (z + 1) * 175);
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
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if) {
      nodes[z].addInPort(
<<<<<<< HEAD
        `if: ${normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`].if}`,
      );
    }
    nodes[z].addInPort(
      `runs-on: ${
<<<<<<< HEAD
        normalized['jobs'][`${Object.keys(normalized['jobs'])[z]}`]['runs-on']
      }`,
    );
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
<<<<<<< HEAD
<<<<<<< HEAD
          // out port, just in case said job is needed by another job
          portsOutWithNeeds.push(nodes[z].addOutPort(''));
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
=======
          // out port, just in case said job is needed by another job
          portsOutWithNeeds.push(nodes[z].addOutPort(''));
>>>>>>> 6e146b0 (added needs (not working for multiple of the same jobs)
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
  const link = port1.link<DefaultLinkModel>(port2);
  // console.log(portsOutWithNeeds);
  const links: DefaultLinkModel[] = [];
  const linksWithNeeds: DefaultLinkModel[] = [];
  //array storing links of jobs with needs
  const link2: DefaultPortModel[] = [];
  let needsArr: any = [];
  // value used to prevent additional links between nodes with attribute "needs"
  let k = 0;
  // value used to prevent self-link of nodes
  const s = 0;
  for (let c = 0; c < portsIn.length; c++) {
    console.log(normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs);
    if (normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs) {
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
          console.log('dziele');
        }
        // console.log(needsArr);
        console.log(nodes[c - 1]['options']['name']);
        console.log(nodes[element]['portsIn'][0]['options']['label']);
        if (needsArr.length) {
          console.log('JD');
          for (let need = 0; need < needsArr.length; ++need) {
            console.log(need);
            console.log(nodes[c - 1]['options']['name']);
            console.log(needsArr[need]);
            for (let n = 0; n < portsIn.length; n++) {
              if (
                nodes[n]['options']['name'] === needsArr[need] &&
                s < portsIn.length - 1
              ) {
                s++;
                console.log('IN');
                console.log(portsOutWithNeeds[n]['parent']['options']);
                console.log(portsIn[element]);
                const val = Object.values(
                  portsIn[element]['parent']['options'],
                );
                const val2 = Object.values(
                  portsOutWithNeeds[n]['parent']['options'],
                );
                console.log(val[2], val2[2]);
                if (val[2] !== val2[2]) {
                  linksWithNeeds.push(
                    portsOutWithNeeds[n].link<DefaultLinkModel>(
                      portsIn[element],
                    ),
                  );
                }
>>>>>>> 97bf0ba (bugzabugiem)
              }
            }
          }
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
          // loop that goes from the first node, and checks, if said node is needed by another job
          for (let node = 0; node < portsIn.length; ++node) {
            if (
              nodes[node]['options']['name'] ===
              nodes[element]['portsIn'][0]['options']['label']
            ) {
              console.log(linksWithNeeds[node]);
              console.log(
                portsOutWithNeeds[node].link<DefaultLinkModel>(
                  portsIn[element],
                ),
              );
              console.log('WCHODZE');
              linksWithNeeds.push(
                portsOutWithNeeds[node].link<DefaultLinkModel>(
                  portsIn[element],
                ),
              );
            }
          }
          k++;
>>>>>>> 39e9878 (fixed the second last needs bug)
        }

        // console.log(
        //   normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs[
        //     need
        //   ],
        // );
      }
      // console.log(
      //   normalized['jobs'][`${Object.keys(normalized['jobs'])[c]}`].needs[
      //     need
      //   ],
      // );
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
