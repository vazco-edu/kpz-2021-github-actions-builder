/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
import React from 'react';

import { Workflow } from '../schema/Schema';
<<<<<<< HEAD
//function that displays link to actions, that user used in his workflow
<<<<<<< HEAD
export function DisplayLinks(normalized: Workflow) {
=======
export function displayLinks(normalized: Workflow) {
>>>>>>> f8728ba (jotde)
=======

export function displayLinks(normalized: Workflow) {
>>>>>>> cebe2b6 (links opening in seperate window (safe))
  const tableOfUses: string[] = [];
  for (const properties in normalized.jobs) {
    let helper: any = {};
    helper = normalized.jobs[properties];
<<<<<<< HEAD
    console.log(helper.steps);
    for (let item = 0; item < helper.steps.length; ++item) {
      console.log(helper.steps[item]);
      if ('uses' in helper.steps[item]) {
        console.log('mam USES');
=======
    for (let item = 0; item < helper.steps.length; ++item) {
      if ('uses' in helper.steps[item]) {
>>>>>>> f8728ba (jotde)
        tableOfUses.push(helper.steps[item].uses);
      }
    }
  }
<<<<<<< HEAD
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
  const destructuredTable: string[][] = [];
  const re = new RegExp('@|/');
  const distTable = Array.from(new Set(tableOfUses));
  for (let inside = 0; inside < distTable.length; ++inside) {
    destructuredTable.push(distTable[inside].split(re));
  }
  const links = destructuredTable.map((x, y) => {
=======
>>>>>>> cebe2b6 (links opening in seperate window (safe))
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
<<<<<<< HEAD
>>>>>>> f8728ba (jotde)
=======
>>>>>>> cebe2b6 (links opening in seperate window (safe))
  });
  return <ul>{links}</ul>;
}
