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

function toArray(input: string | string[]): string[] {
  if (Array.isArray(input)) {
    return input;
  }
  return [input];
}

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
    // eslint-disable-next-line @typescript-eslint/ban-types
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
    normalizeMatrix(job.strategy.matrix);
  }
  // Steps
  if (!Array.isArray(job.steps)) {
    job.steps = [];
  }
  job.steps = job.steps.filter(x => typeof x === 'object');
  // Needs ## if not array -> toArray ##
  job.needs = job.needs && toArray(job.needs);
  // timeout ## if not set -> set to 60 minutes ##
  job['timeout-minutes'] = job['timeout-minutes'] || 60;
}
export function normalizeMatrix(
  matrix: arrKeyable | StrategyMatrix,
): any[] | string {
  if (typeof matrix === 'string') {
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
  }
  //        ### crossing i.e. every os with every browser ###
  const inv = cartesianProduct(matrixValues);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return inv;
}
function cartesianProduct(inputs: keyable) {
  let result = [];
  for (const inputKey of Object.keys(inputs)) {
    if (result.length === 0) {
      result.push(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        ...inputs[inputKey].map((x: keyable) => ({
          [inputKey]: x,
        })),
      );
    } else {
      const newResult: arrKeyable[] = [];
      if (inputs[inputKey]) {
        for (const inputValue of inputs[inputKey]) {
          for (const r of result) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            newResult.push({ ...r, [inputKey]: inputValue });
          }
        }
      }

      result = newResult;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
}
