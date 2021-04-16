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

import {
  Workflow,
  Job,
  StrategyMatrix,
  MatrixValue,
  Event,
} from '../schema/Schema';

interface keyable {
  [key: string]: any;
}

interface arrKeyable {
  [key: string]: any[];
}

=======
>>>>>>> cffd6e5 (normalization separated)
function toArray(input: string | string[]): string[] {
  if (Array.isArray(input)) {
    return input;
  }
  return [input];
}

<<<<<<< HEAD
const objResult: Record<string, any> = {};

export function normalize(workflow: Workflow): keyable {
  if (typeof workflow.on === 'object' && !Array.isArray(workflow.on)) {
    objResult.on = workflow.on;
  } else if (typeof workflow.on === 'string') {
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
    workflow.on = {
      [workflow.on]: {},
    };
  } else if (Array.isArray(workflow.on)) {
    workflow.on = workflow.on.reduce(
      (o: { [x: string]: Record<string, never> }, z: string | number) => {
        o[z] = {};
        return o;
      },
      {},
    );
  }
  console.log(workflow.on);
  if (!workflow.jobs) {
    workflow.jobs = {};
  }
  for (const jId of Object.keys(workflow.jobs).filter(x => x !== 'JD')) {
    console.log('Job before normalization: ', workflow.jobs[jId]);
    normalizeJob(workflow.jobs[jId]);
    console.log('Job after normalization: ', workflow.jobs[jId]);
  }
}
function normalizeJob(job: any) {
  // Strategy
  if (job.strategy?.matrix) {
    // job.strategy.matrix = normalizeMatrix(job.strategy.matrix);
    console.log('Im normalizing matrix', job.strategy.matrix);
>>>>>>> cffd6e5 (normalization separated)
    normalizeMatrix(job.strategy.matrix);
  }
  // Steps
  if (!Array.isArray(job.steps)) {
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
  // Needs ## if not array -> toArray ##
  job.needs = job.needs && toArray(job.needs);
  // timeout ## if not set -> set to 60 minutes ##
  job['timeout-minutes'] = job['timeout-minutes'] || 60;
}
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
    return matrix;
  }
  const matrixKeys = Object.keys(matrix);
  // inputKey - string, value can be string, number or bool
  const matrixValues: {
<<<<<<< HEAD
    [inputKey: string]: (string | number | boolean)[] | MatrixValue;
=======
    [inputKey: string]: (string | number | boolean)[];
>>>>>>> cffd6e5 (normalization separated)
  } = {};
  for (const matrixKey of matrixKeys) {
    // Assigning values of matrix passed to function to previously created empty object with properly assigned types
    matrixValues[matrixKey] = matrix[matrixKey];
<<<<<<< HEAD
=======
    console.log(`Matrix value for key: ${matrixKey}`, matrixValues[matrixKey]);
>>>>>>> cffd6e5 (normalization separated)
  }
  //        ### experimental ###
  //        ### crossing i.e. every os with every browser ###
  const inv = cartesianProduct(matrixValues);
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
  let result = [];
  for (const inputKey of Object.keys(inputs)) {
    if (result.length === 0) {
      result.push(
<<<<<<< HEAD
        ...inputs[inputKey].map((x: keyable) => ({
=======
        ...inputs[inputKey].map((x: any) => ({
>>>>>>> cffd6e5 (normalization separated)
          [inputKey]: x,
        })),
      );
    } else {
<<<<<<< HEAD
      const newResult: arrKeyable[] = [];
=======
      const newResult: any[] = [];
>>>>>>> cffd6e5 (normalization separated)
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
