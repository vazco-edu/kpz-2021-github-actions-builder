/* eslint-disable guard-for-in */
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
  DiagramEngine,
  DagreEngine,
  DefaultPortModel,
  PathFindingLinkFactory,
} from '@projectstorm/react-diagrams';
import React from 'react';

import { helperPortCreation } from '../additionalFunctions/diagramFunctions/helperPortCreation';
import { DemoCanvasWidget } from '../diagrams/CanvasWidget';
import { DemoButton, DemoWorkspaceWidget } from '../diagrams/WorkspaceWidget';
import { checkCycles } from '../diagrams/selfLink';
import { addPortsToJobNode } from './createDiagramFunctions/addPortsToJobNode';
import { createLinksBetweenJobs } from './createDiagramFunctions/createLinksBetweenJobs';
import { specificPorts } from './createDiagramFunctions/specificPorts';
type timeout = any;
type props = any;
class DemoWidget extends React.Component<
  { model: DiagramModel; engine: DiagramEngine },
  any
> {
  // eslint-disable-next-line react/sort-comp
  engine: DagreEngine;
  timeoutId?: timeout;
  constructor(props: props) {
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
  };

  componentDidMount(): void {
    this.autoDistribute();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
  changeOrientation = () => {
    if (this.engine.options.graph.rankdir === 'TB') {
      this.engine.options.graph.rankdir = 'LR';
    } else if (this.engine.options.graph.rankdir === 'LR') {
      this.engine.options.graph.rankdir = 'TB';
    }
    this.autoDistribute();
  };

  reroute() {
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

// ## Colors of nodes and links ##

export const colors: Record<string, string> = {
  firstNode: 'rgb(128, 149, 255)',
  jobsWithoutNeeds: 'rgb(128, 255, 234)',
  jobs: 'rgb(170, 128, 255)',
  doubleNeeds: '#FF0000',
  cycle: '#c46415',
};
export type workflow = any;

function createFirstNodes(notNormalized: workflow, normalized: workflow) {
  let node1 = new DefaultNodeModel({
    name: notNormalized?.name ? String(notNormalized.name) : '',
    color: colors.firstNode,
  });

  let port1: DefaultPortModel;
  const helper = helperPortCreation(normalized, node1);
  if (!Array.isArray(helper)) {
    port1 = helper;
  } else {
    [port1, node1] = helper;
  }
  const node2 = new DefaultNodeModel({
    name: 'jobs',
    color: colors.jobsWithoutNeeds,
  });
  return [port1, node1, node2] as const;
}

function lockLinks(
  link: DefaultLinkModel,
  model: DiagramModel,
  port2: DefaultPortModel[],
  linksWithoutNeeds: DefaultLinkModel[],
  linksBetweenJobs: Record<string, DefaultLinkModel[]>,
) {
  if (link !== undefined && port2[0] !== undefined) {
    model.addAll(link);
    link.setLocked(true);
  }
  model.addAll(...linksWithoutNeeds);
  for (const link of linksWithoutNeeds) {
    link.setLocked(true);
  }
  for (const key of Object.values(linksBetweenJobs)) {
    for (let i = 0; i < key.length; i++) {
      model.addAll(key[i]);
      key[i].setLocked(true);
    }
  }
}

function colorCycles(
  isNeededFor: Record<string, string[]>,
  linksBetweenJobs: Record<string, DefaultLinkModel[]>,
) {
  const cycledJobs = checkCycles(isNeededFor);
  for (const key in linksBetweenJobs) {
    if (linksBetweenJobs[key].length > 1) {
      for (const link of linksBetweenJobs[key]) {
        link.setColor(colors.doubleNeeds);
      }
    }
  }
  if (cycledJobs[0] && Array.isArray(cycledJobs[1])) {
    for (let i = 0; i < cycledJobs[1].length - 1; i++) {
      const cycledKey = `${cycledJobs[1][i + 1]}${cycledJobs[1][i]}`;
      if (linksBetweenJobs[cycledKey]) {
        linksBetweenJobs[cycledKey][0].setColor(colors.cycle);
      }
    }
  }
}
export default function createDiagrams(
  notNormalized: workflow,
  normalized: workflow,
  isNeededFor: Record<string, string[]>,
) {
  const [port1, node1, node2] = createFirstNodes(notNormalized, normalized);
  // ## storing keys of jobs in normalized object ##
  const key: string[] = Object.keys(normalized.jobs);

  const portsOut: DefaultPortModel[] = [];
  const [port2, numWithoutNeeds] = addPortsToJobNode(key, normalized, node2);
  // displaying number of ports
  for (
    let withoutNeeds = 1;
    withoutNeeds < numWithoutNeeds + 1;
    ++withoutNeeds
  ) {
    portsOut.push(node2.addOutPort(withoutNeeds.toString()));
  }
  const [portsIn, portsOutWithNeeds, jobs] = specificPorts(
    key,
    normalized,
    isNeededFor,
  );
  // ## creating nodes for jobs and object for reverse tracking our dependencies##

  // ## adding specific ports to jobs ##

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
  const linksBetweenJobs = createLinksBetweenJobs(
    normalized,
    portsIn,
    portsOut,
    key,
    portsOutWithNeeds,
    node2,
    linksWithoutNeeds,
  );
  lockLinks(link, model, port2, linksWithoutNeeds, linksBetweenJobs);
  colorCycles(isNeededFor, linksBetweenJobs);
  const engine = createEngine();
  engine.setModel(model);
  return <DemoWidget model={model} engine={engine} key={Math.random()} />;
}
