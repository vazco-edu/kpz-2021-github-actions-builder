/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';

import { workflow, normalizedObject } from '../components/App';

let timerId: any;
export const throttleFunction = function (func: any, delay: number) {
  // If setTimeout is already scheduled, no need to do anything
  if (timerId) {
    return '';
  }

  // Schedule a setTimeout after delay seconds
  timerId = setTimeout(() => {
    func(workflow, normalizedObject);

    // Once setTimeout function execution is finished, timerId = undefined so that in <br>
    // the next scroll event function execution can be scheduled by the setTimeout
    timerId = undefined;
  }, delay);
};
export function xD(): void {
  console.log(workflow);
  console.log(normalizedObject);
}
