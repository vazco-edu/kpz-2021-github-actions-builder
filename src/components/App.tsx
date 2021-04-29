<<<<<<< HEAD
=======
/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
>>>>>>> 6d36f31 (errors inline, normalizing input)
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c37a684 (jkd)
import Ajv from 'ajv';
import betterAjvErrors from 'better-ajv-errors';
=======
>>>>>>> 47d4b70 (changed stuff)
=======
>>>>>>> 5f35168 (adding types)
=======
import { CanvasWidget } from '@projectstorm/react-canvas-core';
>>>>>>> 5d5a48d (added dynamic jobs and name interpretation in diagrams)
=======
>>>>>>> 1dbb889 (asdasdasd)
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
import jsyaml from 'js-yaml';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { log } from 'node:console';
=======
import { deepEqual } from 'node:assert';
import { log } from 'node:console';
import { isArray } from 'node:util';
>>>>>>> 6d36f31 (errors inline, normalizing input)
import React, { useState } from 'react';
<<<<<<< HEAD
import tv4 from 'tv4';
=======
>>>>>>> 2324fa9 (working validator (?))
import util from 'util';

<<<<<<< HEAD
import useLocalStorage from '../hooks/useLocalStorage';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { schema as schem } from '../schema/Schema';
=======
import a from '../schema/Schema.json';
=======
// import * as a from '../schema/Schema.json';
import schema from '../schema/Schema.json';
>>>>>>> 2324fa9 (working validator (?))
=======
// import * as a from '../schema/Schema.json';
import schema from '../schema/Schema.json';
>>>>>>> 6d36f31 (errors inline, normalizing input)
// import  from '../schema/Schema.json';
>>>>>>> c884438 (sa)
import Editor from './Editor';

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, no-console */
=======
import React, { useState } from 'react';

import { ajv } from '../additionalFunctions/createAjvObject';
import dispError from '../additionalFunctions/displayError';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { DisplayLinks } from '../additionalFunctions/linksToActions';
>>>>>>> c97c6ab (soem)
=======
import { displayLinks } from '../additionalFunctions/linksToActions';
>>>>>>> f8728ba (jotde)
=======
import { displayLinks } from '../additionalFunctions/linksToActions';
>>>>>>> cebe2b6 (links opening in seperate window (safe))
import { normalize } from '../additionalFunctions/normalization';
<<<<<<< HEAD
import createDiagram from '../diagrams/createDiagrams';
=======
>>>>>>> cffd6e5 (normalization separated)
=======
import { ajv } from '../additionalFunctions/createAjvObject';
import dispError from '../additionalFunctions/displayError';
import { normalize } from '../additionalFunctions/normalization';
import createDiagram from '../diagrams/createDiagrams';
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
import useLocalStorage from '../hooks/useLocalStorage';
import schema from '../schema/Schema.json';
import Editor from './Editor';

<<<<<<< HEAD
<<<<<<< HEAD
=======
import React, { useState } from 'react';

import dispError from '../additionalFunctions/displayError';
import useLocalStorage from '../hooks/useLocalStorage';
import schema from '../schema/Schema.json';
import Editor from './Editor';

>>>>>>> c37a684 (jkd)
const ajv = new Ajv({
  allErrors: true,
  strict: false,
});
<<<<<<< HEAD
>>>>>>> f0c15db (cleaned code, optimized)
=======
>>>>>>> 43074be (ajv to new file)
=======
>>>>>>> c37a684 (jkd)
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
function App(): JSX.Element {
  // eslint-disable-next-line no-console
  // console.log(schema);
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
=======
  // type gitHubAction = {
  //   name: string;
  // };
  //predykat
<<<<<<< HEAD
>>>>>>> 2324fa9 (working validator (?))
=======
  // Check, whether provided json is valid against json Schema (if correct returning boolean, if not returning object of errors)
>>>>>>> f0c15db (cleaned code, optimized)
  function validate(data: any) {
=======
  type gitHubAction = {
    name: string;
  };
  //predykat
<<<<<<< HEAD
<<<<<<< HEAD
  function validate(data: unknown): data is gitHubAction {
>>>>>>> a5114cd (added codemirror, js-yaml, ajv)
=======
  function validate(data: any): data is gitHubAction {
>>>>>>> 3001620 (fuck my life)
    if (typeof data === 'string') {
      return false;
    }
<<<<<<< HEAD
<<<<<<< HEAD
    const ajv = new Ajv();
<<<<<<< HEAD

    const validate = ajv.compile(schem);
    const valid = validate(data);
    if (!valid) {
      // eslint-disable-next-line no-console
      console.log(validate.errors);
    }
    // eslint-disable-next-line no-console
    //console.log(typeof valid);
=======
=======
  function validate(data: any) {
    if (typeof data === 'string') {
      return false;
    }
    /*const ajv = new Ajv();
>>>>>>> c884438 (sa)
    try {
      ajv.compile(data);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-console
      console.log(e);
    }
    const valid = true;
    // eslint-disable-next-line no-console
    console.log(valid);
<<<<<<< HEAD
>>>>>>> 3001620 (fuck my life)
    return valid;
    //const moduleCode = standaloneCode(ajv, valid);
    // eslint-disable-next-line no-console
    //console.log(typeof moduleCode);
=======
    return valid;*/
    // eslint-disable-next-line prettier/prettier
    const ajv = new Ajv({ allErrors: true, strict: "log" });
    const validate = ajv.compile(a);
    const valid = validate(data);
    if (!valid) {
      // eslint-disable-next-line no-console
      console.log(validate.errors);
    } else {
      // eslint-disable-next-line no-console
      console.log('git');
    }
    return true;
>>>>>>> c884438 (sa)
  }
  //global variable, for storing parsed yaml in JSON  format
  const x: any = parseYamltoJSON(man);
=======
    // console.log(schema);
    const ajv = new Ajv({
      allErrors: true,
      strict: false,
    });
=======
>>>>>>> f0c15db (cleaned code, optimized)
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
<<<<<<< HEAD
=======
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
>>>>>>> 6d36f31 (errors inline, normalizing input)
      console.log(validate.errors);
      console.log('NO');
=======
>>>>>>> 74b007e (nomoreconsol.logs)
      const s: any = validate.errors;
      return s;
<<<<<<< HEAD
      // // error = betterAjvErrors(schema, data, validate.errors);
      // console.log(error);
    }
    console.log(valid);
    return valid;
  }
  //global variable, for storing parsed yaml in JSON  format
<<<<<<< HEAD
  const x: unknown = parseYamltoJSON(man);
>>>>>>> 2324fa9 (working validator (?))
  function handleClickEvent() {
    setClick(!click);
    // eslint-disable-next-line no-console
    console.log(click);
    if (click) {
      if (validate(x)) {
        // eslint-disable-next-line no-console
<<<<<<< HEAD
        console.log('valid', a);
=======
        console.log('valid', schema);
>>>>>>> 2324fa9 (working validator (?))
      } else {
        // eslint-disable-next-line no-console
<<<<<<< HEAD
        console.log('mmm');
=======
        console.log('not valid');
>>>>>>> bfa43b7 (added intelligent array reading (when array contains objects, it is read, if not, it is skipped)
      }
      // eslint-disable-next-line no-console
      //console.log(man);
      // Tutaj chyba coś wywala, bo nie może wykonać JSON.parse (idk)
      // const obj = JSON.parse(man);
      // eslint-disable-next-line no-console
      // console.log(obj);
    }
=======
  const x: any = parseYamltoJSON(man);
  function handleClickEvent() {
    setClick(!click);
>>>>>>> aa5319c (validation errors)
=======
    }
    return valid;
  }
  //global variable, for storing parsed yaml in JSON  format
  let workflow: any = parseYamltoJSON(man);
  function handleClickEvent() {
<<<<<<< HEAD
    setClick(!click);
>>>>>>> 6d36f31 (errors inline, normalizing input)
  }
<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
  // if (validate(x)) {
  //   showObject(x);
  // }

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
<<<<<<< HEAD
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
<<<<<<< HEAD
  const res = returnArray(x);
<<<<<<< HEAD
  console.log(Object.entries(x));
=======
=======
  // const res = returnArray(x);
>>>>>>> 6d36f31 (errors inline, normalizing input)
=======
>>>>>>> f0c15db (cleaned code, optimized)
=======
>>>>>>> c37a684 (jkd)
  const nextVersion = function (obj: any): any[] {
    const arr = [];
    // eslint-disable-next-line guard-for-in
    for (const key in obj) {
      if (
        typeof obj[key] !== 'object' ||
        (Array.isArray(obj[key]) === true && typeof obj[key][0] !== 'object')
      ) {
<<<<<<< HEAD
<<<<<<< HEAD
        arr.push(key);
        arr.push(obj[key]);
=======
        arr.push(`${key}: ${obj[key]}`);
>>>>>>> 6d36f31 (errors inline, normalizing input)
=======
        arr.push(key);
        arr.push(obj[key]);
>>>>>>> c37a684 (jkd)
      }
      if (typeof obj[key] === 'object') {
        const ins = nextVersion(obj[key]);
        arr.push(key);
        arr.push(ins);
      }
    }
    return arr;
  };
<<<<<<< HEAD
<<<<<<< HEAD
  console.log(nextVersion(x));
>>>>>>> 6ff24f6 (added inline errors)
=======
>>>>>>> 8d9fbc5 (added inline errors and deleted said errors in div)
  let i = 0;
=======
  function toArray(input: string | string[]): string[] {
    if (Array.isArray(input)) {
      return input;
    }
    return [input];
  }
<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> c37a684 (jkd)
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
=======
    if (!click) {
      setClick(!click);
    } else if ()
>>>>>>> 0bfbf90 (Working links)
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
<<<<<<< HEAD
=======

>>>>>>> a734a9d (normalization separated)
=======
>>>>>>> 43074be (ajv to new file)
=======

>>>>>>> 5f35168 (adding types)
=======

>>>>>>> cffd6e5 (normalization separated)
  if (typeof workflow === 'object') {
=======
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
  let normalizedObject: any;
  try {
    normalizedObject = normalize(workflow);
  } catch (e) {
    console.log(e.errors);
  }
  console.log(normalizedObject);
  if (typeof workflow !== 'object') {
<<<<<<< HEAD
>>>>>>> 5d5a48d (added dynamic jobs and name interpretation in diagrams)
    //creating a seperate object
    workflow = undefined;
  }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
>>>>>>> 6d36f31 (errors inline, normalizing input)
=======
=======
  console.log(normalizedObject);
>>>>>>> d4cc792 (added graphs)
  // Storing a boolean or an error object
  const storeValidationResult = validate(workflow);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> f0c15db (cleaned code, optimized)
=======

=======
  console.log(workflow);
>>>>>>> ca43750 (bigJD)
=======
  // Storing a boolean or an error object
  const storeValidationResult = validate(workflow);
<<<<<<< HEAD
<<<<<<< HEAD

>>>>>>> 74b007e (nomoreconsol.logs)
=======
  if (normalizedObject && !dispError(storeValidationResult)) {
    displayLinks(normalizedObject);
  }
>>>>>>> f8728ba (jotde)
=======
  if (normalizedObject && !dispError(storeValidationResult)) {
    displayLinks(normalizedObject);
  }
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cebe2b6 (links opening in seperate window (safe))
=======
  console.log(!true);
>>>>>>> f1687c5 (somelasa)
  //          ## DIAGRAMS ##
>>>>>>> 5d5a48d (added dynamic jobs and name interpretation in diagrams)
=======
  // Storing a boolean or an error object
  const storeValidationResult = validate(workflow);
>>>>>>> c37a684 (jkd)
=======
    //creating a seperate object
    workflow = undefined;
  }
  console.log(normalizedObject);
  // Storing a boolean or an error object
  const storeValidationResult = validate(workflow);
  console.log(workflow);
=======
>>>>>>> c97c6ab (soem)
  //          ## DIAGRAMS ##
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
=======
>>>>>>> 0bfbf90 (Working links)
  return (
    <>
      <div className="text-editor">
        <Editor value={yaml} onChange={setYaml} press={click} />
      </div>
      <div className="result">
        {normalizedObject && !dispError(storeValidationResult) && click
          ? createDiagram(workflow, normalizedObject)
          : ''}
        {/* {click && validate(workflow) ? (
          <pre>{JSON.stringify(workflow, null, 2)}</pre>
        ) : (
          ''
        )}
<<<<<<< HEAD
<<<<<<< HEAD
        <pre>{JSON.stringify(x, null, 2)}</pre>
=======
        {JSON.stringify(parseYamltoJSON(man), null, 2)}
>>>>>>> 2324fa9 (working validator (?))
        <ol>
=======
        {click && validate(workflow) ? (
          <pre>{util.inspect(workflow, { depth: null })}</pre>
        ) : (
          ''
        )} */}
        {/* {JSON.stringify(parseYamltoJSON(man), null, 2)} */}
        {/* <ol>
>>>>>>> 6d36f31 (errors inline, normalizing input)
          {
            res.map(data => (
              <li key={i++}>{data}</li>
            ))
          }
        </ol> */}
      </div>
      <div className="result">{click ? yaml : ''}</div>
      <button className="PRESSME" onClick={handleClickEvent}>
        KONWERTUJ
      </button>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="checkValid">
        {
          /* eslint-disable @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any*/
          typeof validate(x) === 'boolean'
            ? ''
            : `Validation error: ${validate(x).map(
                (data: { message: any; instancePath: any }, index: number) => {
                  const len = validate(x).length;
                  if (index === length) {
                    const ret =
                      `${validate(x)[len - 1].message}` +
                      ` on path: ${validate(x)[len - 1].instancePath}`;
=======
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
>>>>>>> 6d36f31 (errors inline, normalizing input)
                    return ret;
                  }
                  return '';
                },
              )}`
        }
      </div>
=======
      <div className="checkValid"> {dispError(storeValidationResult)}</div>
>>>>>>> f0c15db (cleaned code, optimized)
=======
      <div className="checkValid"> {dispError(storeValidationResult)}</div>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> c37a684 (jkd)
=======
      <div className="links">
        {normalizedObject && !dispError(storeValidationResult)
          ? displayLinks(normalizedObject)
          : ''}
      </div>
>>>>>>> 6630d54 (added something)
=======
      <div className="links">
        <span>Actions used in workflow: </span>
        {normalizedObject && !dispError(storeValidationResult) && click
          ? displayLinks(normalizedObject)
          : ''}
      </div>
>>>>>>> f8728ba (jotde)
    </>
  );
}

export default App;
