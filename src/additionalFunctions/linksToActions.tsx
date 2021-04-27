/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
import React from 'react';

import { Workflow } from '../schema/Schema';
//function that displays link to actions, that user used in his workflow
export function displayLinks(normalized: Workflow) {
  const tableOfUses: string[] = [];
  for (const properties in normalized.jobs) {
    let helper: any = {};
    helper = normalized.jobs[properties];
    console.log(helper.steps);
    for (let item = 0; item < helper.steps.length; ++item) {
      console.log(helper.steps[item]);
      if ('uses' in helper.steps[item]) {
        console.log('mam USES');
        tableOfUses.push(helper.steps[item].uses);
      }
    }
  }
  console.log(tableOfUses);
}
