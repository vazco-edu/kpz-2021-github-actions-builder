/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
import React from 'react';

import { Workflow } from '../schema/Schema';
//function that displays link to actions, that user used in his workflow
export function DisplayLinks(normalized: Workflow) {
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
  const destructuredTable: string[][] = [];
  const re = new RegExp('@|/');
  for (let inside = 0; inside < tableOfUses.length; ++inside) {
    destructuredTable.push(tableOfUses[inside].split(re));
    console.log(destructuredTable);
    const tmp = destructuredTable[inside][1];
    console.log(typeof tmp);
    console.log(tmp);
    // deconstructedTable.push(tmp.slice('@'));
  }
  console.log(
    `https://github.com/${destructuredTable[0][0]}/${destructuredTable[0][1]}/releases/tag/${destructuredTable[0][2]}`,
  );
  const links = destructuredTable.map((x, y) => {
    console.log(x);
    console.log(destructuredTable[y]);
    console.log(`https://github.com/${x[0]}/${x[1]}/releases/tag/${x[2]}`);
    <li key={y}>
      <a href={`https://github.com/${x[0]}/${x[1]}/releases/tag/${x[2]}`}>
        makaron
      </a>
    </li>;
  });
  return <ul>{links}</ul>;
}
