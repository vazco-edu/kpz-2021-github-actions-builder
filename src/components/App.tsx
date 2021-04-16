/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import Ajv from 'ajv';
import jsyaml from 'js-yaml';
import React, { useState } from 'react';

import dispError from '../additionalFunctions/displayError';
import useLocalStorage from '../hooks/useLocalStorage';
import schema from '../schema/Schema.json';
import Editor from './Editor';

const ajv = new Ajv({
  allErrors: true,
  strict: false,
});
function App(): JSX.Element {
  const [yaml, setYaml] = useLocalStorage('yaml', '');
  const [click, setClick] = useState(false);
  const man = yaml;
  function parseYamltoJSON(text: string) {
    let doc;
    // Parsing string to JSON
    try {
      doc = jsyaml.load(text);
    } catch (e) {
      const error = `${e.reason} on line ${e.mark.line}`;
      return error;
    }
    return doc;
  }
  // type gitHubAction = {
  //   name: string;
  // };
  //predykat
  // Check, whether provided json is valid against json Schema (if correct returning boolean, if not returning object of errors)
  function validate(data: any) {
    if (typeof data === 'string') {
      return false;
    }
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
      console.log(validate.errors);
      console.log('NO');
      const s: any = validate.errors;
      return s;
    }
    console.log('Walidacja przebiegła: ', valid);
    return valid;
  }
  //global variable, for storing parsed yaml in JSON  format
  let workflow: any = parseYamltoJSON(man);
  function handleClickEvent() {
    setClick(!click);
  }
  const nextVersion = function (obj: any): any[] {
    const arr = [];
    // eslint-disable-next-line guard-for-in
    for (const key in obj) {
      if (
        typeof obj[key] !== 'object' ||
        (Array.isArray(obj[key]) === true && typeof obj[key][0] !== 'object')
      ) {
        arr.push(key);
        arr.push(obj[key]);
      }
      if (typeof obj[key] === 'object') {
        const ins = nextVersion(obj[key]);
        arr.push(key);
        arr.push(ins);
      }
    }
    return arr;
  };
  function toArray(input: string | string[]): string[] {
    if (Array.isArray(input)) {
      return input;
    }
    return [input];
  }
  function normalize(workflow: any) {
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
      normalizeMatrix(job.strategy.matrix);
    }
    // Steps
    if (!Array.isArray(job.steps)) {
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
    // Needs ## if not array -> toArray ##
    job.needs = job.needs && toArray(job.needs);
    // timeout ## if not set -> set to 60 minutes ##
    job['timeout-minutes'] = job['timeout-minutes'] || 60;
  }
  function normalizeMatrix(matrix: {
    [key: string]: (string | number | boolean)[];
  }) {
    if (typeof matrix === 'string') {
      console.log('matrix is a string');
      return matrix;
    }
    const matrixKeys = Object.keys(matrix);
    // inputKey - string, value can be string, number or bool
    const matrixValues: {
      [inputKey: string]: (string | number | boolean)[];
    } = {};
    for (const matrixKey of matrixKeys) {
      // Assigning values of matrix passed to function to previously created empty object with properly assigned types
      matrixValues[matrixKey] = matrix[matrixKey];
      console.log(
        `Matrix value for key: ${matrixKey}`,
        matrixValues[matrixKey],
      );
    }
    //        ### experimental ###
    //        ### crossing i.e. every os with every browser ###
    const inv = cartesianProduct(matrixValues);
    console.log(inv);
    return inv;
  }
  function cartesianProduct(inputs: any) {
    let result = [];
    for (const inputKey of Object.keys(inputs)) {
      if (result.length === 0) {
        result.push(
          ...inputs[inputKey].map((x: any) => ({
            [inputKey]: x,
          })),
        );
      } else {
        const newResult: any[] = [];
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
  if (typeof workflow === 'object') {
    normalize(workflow);
  } else {
    workflow = undefined;
  }
  // Storing a boolean or an error object
  const storeValidationResult = validate(workflow);
  return (
    <>
      <div className="text-editor">
        <Editor value={yaml} onChange={setYaml} press={click} />
      </div>
      <div className="result">
        {/* {click && validate(workflow) ? (
          <pre>{JSON.stringify(workflow, null, 2)}</pre>
        ) : (
          ''
        )}
        {click && validate(workflow) ? (
          <pre>{util.inspect(workflow, { depth: null })}</pre>
        ) : (
          ''
        )} */}
        {/* {JSON.stringify(parseYamltoJSON(man), null, 2)} */}
        {/* <ol>
          {
            res.map(data => (
              <li key={i++}>{data}</li>
            ))
          }
        </ol> */}
      </div>
      <button className="PRESSME" onClick={handleClickEvent}>
        KONWERTUJ
      </button>
      <div className="checkValid"> {dispError(storeValidationResult)}</div>
    </>
  );
}

export default App;
