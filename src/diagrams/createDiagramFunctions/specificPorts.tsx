/* eslint-disable guard-for-in */
import {
  DefaultNodeModel,
  DefaultPortModel,
} from '@projectstorm/react-diagrams';

import { workflow, colors } from '../createDiagrams';

export function specificPorts(
  key: string[],
  normalized: workflow,
  isNeededFor: Record<string, string[]>,
) {
  const portsOutWithNeeds: DefaultPortModel[] = [];
  const portsIn: DefaultPortModel[] = [];
  const jobs: DefaultNodeModel[] = [];
  for (const jobName of key) {
    jobs.push(
      new DefaultNodeModel({
        name: `${jobName}`,
        color: colors.jobs,
      }),
    );
    isNeededFor[`${jobName}`] = [];
  }
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
    let preventOutput = 0;
    for (let step = 0; step < keysJobs.steps.length; ++step) {
      for (const prop in keysJobs.steps[step]) {
        if (preventOutput === 0) {
          jobs[nodeNumber].addInPort('steps:');
          portsIn.push(
            jobs[nodeNumber].addInPort(
              `${prop}: ${keysJobs.steps[step][prop]}`,
            ),
          );
          // out port, just in case said job is needed by another job
          portsOutWithNeeds.push(jobs[nodeNumber].addOutPort(''));
          preventOutput++;
          continue;
        }
        jobs[nodeNumber].addInPort(`${prop}: ${keysJobs.steps[step][prop]}`);
      }
    }
  }
  return [portsIn, portsOutWithNeeds, jobs] as const;
}
