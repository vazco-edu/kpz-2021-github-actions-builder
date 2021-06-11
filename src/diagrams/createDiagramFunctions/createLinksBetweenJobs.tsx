import {
  DefaultLinkModel,
  DefaultNodeModel,
  DefaultPortModel,
} from '@projectstorm/react-diagrams';

import { workflow } from '../createDiagrams';

// eslint-disable-next-line complexity
export function createLinksBetweenJobs(
  normalized: workflow,
  portsIn: DefaultPortModel[],
  portsOut: DefaultPortModel[],
  key: string[],
  portsOutWithNeeds: DefaultPortModel[],
  node2: DefaultNodeModel,
  linksWithoutNeeds: DefaultLinkModel[],
) {
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
  return linksBetweenJobs;
}
