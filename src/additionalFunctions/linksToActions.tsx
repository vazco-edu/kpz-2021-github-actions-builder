/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
import React from 'react';

import { Workflow } from '../schema/Schema';
<<<<<<< HEAD
//function that displays link to actions, that user used in his workflow
export function DisplayLinks(normalized: Workflow) {
=======

export function displayLinks(normalized: Workflow) {
>>>>>>> fc0fb336f04bbdc69ee4b93cfa42fa7613dca24d
  const tableOfUses: string[] = [];
  for (const properties in normalized.jobs) {
    let helper: any = {};
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
<<<<<<< HEAD
    console.log(x);
    console.log(destructuredTable[y]);
    console.log(`https://github.com/${x[0]}/${x[1]}/releases/tag/${x[2]}`);
    <li key={y}>
      <a href={`https://github.com/${x[0]}/${x[1]}/releases/tag/${x[2]}`}>
        makaron
      </a>
    </li>;
=======
    return (
      <li key={y}>
        <a
          className="text"
          href={`https://github.com/${x[0]}/${x[1]}/releases/tag/${x[2]}`}
        >
          {distTable[y]}
        </a>
      </li>
    );
>>>>>>> fc0fb336f04bbdc69ee4b93cfa42fa7613dca24d
  });
  return <ul>{links}</ul>;
}
