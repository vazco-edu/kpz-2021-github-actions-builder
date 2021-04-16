/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
import Ajv from 'ajv';
import jsyaml from 'js-yaml';
import { deepEqual } from 'node:assert';
import { log } from 'node:console';
import { isArray } from 'node:util';
import React, { useState } from 'react';
import util from 'util';

// import requireFromString from 'require-from-string';
import useLocalStorage from '../hooks/useLocalStorage';
// import * as a from '../schema/Schema.json';
import schema from '../schema/Schema.json';
// import  from '../schema/Schema.json';
import Editor from './Editor';
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
function App(): JSX.Element {
  const [yaml, setYaml] = useLocalStorage('yaml', '');
  const [click, setClick] = useState(false);
  //tutaj prypisanie do zmiennej !!!!!!!!!!!!!
  const man = yaml;
  function parseYamltoJSON(text: string) {
    let doc;
    // Parsing string to JSON
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    try {
      doc = jsyaml.load(text);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
      const error = `${e.reason} on line ${e.mark.line}`;
      return error;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return doc;
  }
  // type gitHubAction = {
  //   name: string;
  // };
  //predykat
  function validate(data: any) {
    if (typeof data === 'string') {
      return false;
    }
    // console.log(schema);
    const ajv = new Ajv({
      allErrors: true,
      strict: false,
    });
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
      console.log(validate.errors);
      console.log('NO');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s: any = validate.errors;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
  function showObject(obj: any) {
    // eslint-disable-next-line no-constant-condition
    if (true) {
      // eslint-disable-next-line guard-for-in
      for (const properties in obj) {
        // eslint-disable-next-line no-console, @typescript-eslint/no-unsafe-member-access
        console.log(properties, obj[properties]);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (typeof obj[properties] === 'object') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            Array.isArray(obj[properties]) === true &&
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            typeof obj[properties][0] !== 'object'
          ) {
            //if said object is an array skip to the next iteration
            continue;
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          showObject(obj[properties]);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  }
  const tab: string[] = [];
  function returnArray(obj: any) {
    // eslint-disable-next-line guard-for-in
    for (const element in obj) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-console
      console.log(element, obj[element]);
      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (typeof obj[element] !== 'object' ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          Array.isArray(obj[element]) === true) &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof obj[element][0] !== 'object'
      ) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
        tab.push(`${element}: ${obj[element]}`);
      } else {
        tab.push(`${element}:`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        returnArray(obj[element]);
      }
    }
    return tab;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
    const inv = crossing(matrixValues);
    console.log(inv);
    return inv;
  }
  function crossing(inputs: any) {
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
  // console.log(nextVersion(x));
  function improvedIteration(obj: any) {
    const arr = [];
    // eslint-disable-next-line guard-for-in
    for (const element in obj) {
      if (
        typeof obj[element] !== 'object' ||
        Array.isArray(obj[element]) === true
      ) {
        arr.push(`${element}: ${obj[element]}`);
      } else {
        arr.push(`${element}: ${JSON.stringify(obj[element])}`);
      }
    }
    return arr;
    // eslint-disable-next-line prefer-const
    /*let res = [];
    while (arr.length) {
      res.push(arr.shift());
      if (res.length && )
    }*/
  }
  // console.log(improvedIteration(x));
  // let i = 0;
  const isValid = validate(workflow);
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            res.map(data => (
              <li key={i++}>{data}</li>
            ))
          }
        </ol> */}
      </div>
      <button className="PRESSME" onClick={handleClickEvent}>
        KONWERTUJ
      </button>
      <div className="checkValid"> {isValid ? '' : workflow}</div>
      <div className="checkValid">
        {' '}
        {
          /* eslint-disable @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any*/
          typeof isValid === 'boolean'
            ? ''
            : `Validation error: ${validate(workflow).map(
                (data: { message: any; instancePath: any }, index: number) => {
                  const len = validate(workflow).length;
                  if (index === length) {
                    const ret =
                      `${validate(workflow)[len - 1].message}` +
                      ` on path: ${validate(workflow)[len - 1].instancePath}`;
                    return ret;
                  }
                  return '';
                },
              )}`
        }
      </div>
    </>
  );
}

export default App;
