import {
  DefaultNodeModel,
  DefaultPortModel,
} from '@projectstorm/react-diagrams';

import { workflow } from '../createDiagrams';

export function addPortsToJobNode(
  key: string[],
  normalized: workflow,
  node2: DefaultNodeModel,
) {
  //variable storing number or jobs withour parameter "needs" - default value is 1, as the first job will never have parameter needs
  let numWithoutNeeds = 1;
  const port2: DefaultPortModel[] = [];
  for (let i = 0; i < key.length; ++i) {
    if (normalized) {
      if (normalized.jobs[key[i]]['needs'] === undefined) {
        //without needs
        if (port2.length < 1) {
          port2.push(node2.addInPort(`${key[i]}`));
          continue;
        }
        node2.addInPort(`${key[i]}`);
        numWithoutNeeds++;
      }
    }
  }
  return [port2, numWithoutNeeds] as const;
}
