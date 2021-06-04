/* eslint-disable @typescript-eslint/no-unsafe-member-access */
<<<<<<< HEAD
=======
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
import React from 'react';

import { Workflow } from '../schema/Schema';

export function displayLinks(normalized: Workflow) {
  const tableOfUses: string[] = [];
<<<<<<< HEAD
  // eslint-disable-next-line guard-for-in
  for (const properties in normalized.jobs) {
    let helper: any = {};
=======
  for (const properties in normalized.jobs) {
    let helper: Record<string, any> = {};
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
    helper = normalized.jobs[properties];
    for (let item = 0; item < helper.steps.length; ++item) {
      if ('uses' in helper.steps[item]) {
        tableOfUses.push(helper.steps[item].uses);
      }
    }
  }
  const destructuredTable: string[][] = [];
  const re = new RegExp('@|/');
  const distTable = Array.from(new Set(tableOfUses));
  for (let inside = 0; inside < distTable.length; ++inside) {
    destructuredTable.push(distTable[inside].split(re));
  }
  const links = destructuredTable.map((x, y) => {
    return (
      <li key={y}>
        <a
          className="text"
          href={`https://github.com/${x[0]}/${x[1]}/releases/tag/${x[2]}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          {distTable[y]}
        </a>
      </li>
    );
  });
  return <ul>{links}</ul>;
}
