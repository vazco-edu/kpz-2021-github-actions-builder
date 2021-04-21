<<<<<<< HEAD
/* eslint-disable @typescript-eslint/ban-types */
=======
>>>>>>> cffd6e5 (normalization separated)
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
<<<<<<< HEAD
<<<<<<< HEAD

import {
  Workflow,
  Job,
  StrategyMatrix,
  MatrixValue,
  Event,
} from '../schema/Schema';
=======

import { Workflow, Job, StrategyMatrix, MatrixValue } from '../schema/Schema';
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)

interface keyable {
  [key: string]: any;
}

interface arrKeyable {
  [key: string]: any[];
}

<<<<<<< HEAD
=======
>>>>>>> cffd6e5 (normalization separated)
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
function toArray(input: string | string[]): string[] {
  if (Array.isArray(input)) {
    return input;
  }
  return [input];
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
const objResult: Record<string, any> = {};

export function normalize(workflow: Workflow): keyable {
  if (typeof workflow.on === 'object' && !Array.isArray(workflow.on)) {
    objResult.on = workflow.on;
  } else if (typeof workflow.on === 'string') {
<<<<<<< HEAD
    workflow.on = {
      [workflow.on]: {},
    };
    objResult.on = workflow.on;
  } else if (Array.isArray(workflow.on)) {
    objResult.on = workflow.on.reduce<Partial<Record<Event, {}>>>((o, z) => {
      o[z] = {};
      return o;
    }, {});
  }
  if (!workflow.jobs) {
    workflow.jobs = {};
  }
  objResult.jobs = {};
  for (const jId of Object.keys(workflow.jobs).filter(x => x !== 'key')) {
    objResult.jobs[jId] = workflow.jobs[jId];
    normalizeJob(objResult.jobs[jId]);
  }
  return objResult;
}
function normalizeJob(job: Job) {
  // Strategy
  if (job.strategy?.matrix) {
=======
export function normalize(workflow: any) {
  console.log(workflow.on);
  if (typeof workflow.on === 'string') {
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
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
  if (!workflow.jobs) {
    workflow.jobs = {};
  }
  objResult.jobs = {};
  for (const jId of Object.keys(workflow.jobs).filter(x => x !== 'key')) {
    objResult.jobs[jId] = workflow.jobs[jId];
    normalizeJob(objResult.jobs[jId]);
  }
  return objResult;
}
function normalizeJob(job: Job) {
  // Strategy
  if (job.strategy?.matrix) {
<<<<<<< HEAD
    // job.strategy.matrix = normalizeMatrix(job.strategy.matrix);
    console.log('Im normalizing matrix', job.strategy.matrix);
>>>>>>> cffd6e5 (normalization separated)
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
    normalizeMatrix(job.strategy.matrix);
  }
  // Steps
  if (!Array.isArray(job.steps)) {
<<<<<<< HEAD
<<<<<<< HEAD
    job.steps = [];
  }
  job.steps = job.steps.filter(x => typeof x === 'object');
=======
    console.log('STEPS WERE NOT AN ARRAY');
    job.steps = [];
  }
  console.log('Steps in job: ', job, ' \nsteps: ', job.steps);
  job.steps = job.steps.filter((x: any) => typeof x === 'object');
  for (const step of job.steps) {
    if (step && 'uses' in step && typeof step.uses === 'string') {
      console.log('Uses in job: ', job, step.uses);
    }
  }
>>>>>>> cffd6e5 (normalization separated)
=======
    job.steps = [];
  }
  job.steps = job.steps.filter(x => typeof x === 'object');
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
  // Needs ## if not array -> toArray ##
  job.needs = job.needs && toArray(job.needs);
  // timeout ## if not set -> set to 60 minutes ##
  job['timeout-minutes'] = job['timeout-minutes'] || 60;
}
<<<<<<< HEAD
<<<<<<< HEAD
function normalizeMatrix(matrix: arrKeyable | StrategyMatrix): any[] | string {
  if (typeof matrix === 'string') {
=======
function normalizeMatrix(matrix: {
  [key: string]: (string | number | boolean)[];
}): any[] {
  if (typeof matrix === 'string') {
    console.log('matrix is a string');
>>>>>>> cffd6e5 (normalization separated)
=======
function normalizeMatrix(matrix: arrKeyable | StrategyMatrix): any[] | string {
  if (typeof matrix === 'string') {
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
    return matrix;
  }
  const matrixKeys = Object.keys(matrix);
  // inputKey - string, value can be string, number or bool
  const matrixValues: {
<<<<<<< HEAD
<<<<<<< HEAD
    [inputKey: string]: (string | number | boolean)[] | MatrixValue;
=======
    [inputKey: string]: (string | number | boolean)[];
>>>>>>> cffd6e5 (normalization separated)
=======
    [inputKey: string]: (string | number | boolean)[] | MatrixValue;
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
  } = {};
  for (const matrixKey of matrixKeys) {
    // Assigning values of matrix passed to function to previously created empty object with properly assigned types
    matrixValues[matrixKey] = matrix[matrixKey];
<<<<<<< HEAD
<<<<<<< HEAD
=======
    console.log(`Matrix value for key: ${matrixKey}`, matrixValues[matrixKey]);
>>>>>>> cffd6e5 (normalization separated)
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
  }
  //        ### experimental ###
  //        ### crossing i.e. every os with every browser ###
  const inv = cartesianProduct(matrixValues);
<<<<<<< HEAD
<<<<<<< HEAD
  return inv;
}
function cartesianProduct(inputs: keyable) {
=======
  console.log(inv);
  return inv;
}
function cartesianProduct(inputs: any) {
>>>>>>> cffd6e5 (normalization separated)
=======
  return inv;
}
function cartesianProduct(inputs: keyable) {
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
  let result = [];
  for (const inputKey of Object.keys(inputs)) {
    if (result.length === 0) {
      result.push(
<<<<<<< HEAD
<<<<<<< HEAD
        ...inputs[inputKey].map((x: keyable) => ({
=======
        ...inputs[inputKey].map((x: any) => ({
>>>>>>> cffd6e5 (normalization separated)
=======
        ...inputs[inputKey].map((x: keyable) => ({
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
          [inputKey]: x,
        })),
      );
    } else {
<<<<<<< HEAD
<<<<<<< HEAD
      const newResult: arrKeyable[] = [];
=======
      const newResult: any[] = [];
>>>>>>> cffd6e5 (normalization separated)
=======
      const newResult: arrKeyable[] = [];
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
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
