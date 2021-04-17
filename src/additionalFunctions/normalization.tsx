/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Workflow, Job, StrategyMatrix, MatrixValue } from '../schema/Schema';

interface keyable {
  [key: string]: any;
}

interface arrKeyable {
  [key: string]: any[];
}

function toArray(input: string | string[]): string[] {
  if (Array.isArray(input)) {
    return input;
  }
  return [input];
}

const objResult: Record<string, any> = {};

export function normalize(workflow: Workflow): keyable | void {
  console.log(workflow.on);
  if (typeof workflow.on === 'string') {
    workflow.on = {
      [workflow.on]: {},
    };
    objResult.on = workflow.on;
  } else if (Array.isArray(workflow.on)) {
    objResult.on = workflow.on.reduce((o: keyable, z) => {
      o[z] = {};
      return o;
    }, {});
  }
  console.log(workflow.on);
  console.log(objResult.on);
  if (!workflow.jobs) {
    workflow.jobs = {};
  }
  objResult.jobs = {};
  for (const jId of Object.keys(workflow.jobs).filter(x => x !== 'key')) {
    objResult.jobs[jId] = workflow.jobs[jId];
    console.log('Job2 before normalization: ', objResult.jobs[jId]);
    normalizeJob(objResult.jobs[jId]);
    console.log('Job2 after normalization: ', objResult.jobs[jId]);
  }
  return objResult;
}
function normalizeJob(job: Job) {
  // Strategy
  if (job.strategy?.matrix) {
    // job.strategy.matrix = normalizeMatrix(job.strategy.matrix);
    console.log('Im normalizing matrix', job.strategy.matrix);
    normalizeMatrix(job.strategy.matrix);
  }
  // Steps
  if (!Array.isArray(job.steps)) {
    console.log('STEPS WERE NOT AN ARRAY');
    job.steps = [];
  }
  console.log('Steps in job: ', job, ' \nsteps: ', job.steps);
  job.steps = job.steps.filter(x => typeof x === 'object');
  for (const step of job.steps) {
    if (step && 'uses' in step && typeof step.uses === 'string') {
      console.log('Uses in job: ', job, step.uses);
    }
  }
  // Needs ## if not array -> toArray ##
  job.needs = job.needs && toArray(job.needs);
  // timeout ## if not set -> set to 60 minutes ##
  job['timeout-minutes'] = job['timeout-minutes'] || 60;
}
function normalizeMatrix(matrix: arrKeyable | StrategyMatrix): any[] | string {
  if (typeof matrix === 'string') {
    console.log('matrix is a string');
    return matrix;
  }
  const matrixKeys = Object.keys(matrix);
  // inputKey - string, value can be string, number or bool
  const matrixValues: {
    [inputKey: string]: (string | number | boolean)[] | MatrixValue;
  } = {};
  for (const matrixKey of matrixKeys) {
    // Assigning values of matrix passed to function to previously created empty object with properly assigned types
    matrixValues[matrixKey] = matrix[matrixKey];
    console.log(`Matrix value for key: ${matrixKey}`, matrixValues[matrixKey]);
  }
  //        ### experimental ###
  //        ### crossing i.e. every os with every browser ###
  const inv = cartesianProduct(matrixValues);
  console.log(inv);
  return inv;
}
function cartesianProduct(inputs: keyable) {
  let result = [];
  for (const inputKey of Object.keys(inputs)) {
    if (result.length === 0) {
      result.push(
        ...inputs[inputKey].map((x: keyable) => ({
          [inputKey]: x,
        })),
      );
    } else {
      const newResult: arrKeyable[] = [];
      for (const inputValue of inputs[inputKey]) {
        for (const r of result) {
          newResult.push({ ...r, [inputKey]: inputValue });
        }
      }
      result = newResult;
    }
  }
  return result;
}
