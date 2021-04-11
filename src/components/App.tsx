/* eslint-disable no-console */
import Ajv from 'ajv';
import betterAjvErrors from 'better-ajv-errors';
import jsyaml from 'js-yaml';
import { log } from 'node:console';
import React, { useState } from 'react';
<<<<<<< HEAD
import tv4 from 'tv4';
=======
>>>>>>> 2324fa9 (working validator (?))
import util from 'util';

import useLocalStorage from '../hooks/useLocalStorage';
<<<<<<< HEAD
<<<<<<< HEAD
import { schema as schem } from '../schema/Schema';
=======
import a from '../schema/Schema.json';
=======
// import * as a from '../schema/Schema.json';
import schema from '../schema/Schema.json';
>>>>>>> 2324fa9 (working validator (?))
// import  from '../schema/Schema.json';
>>>>>>> c884438 (sa)
import Editor from './Editor';

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, no-console */
function App(): JSX.Element {
  // eslint-disable-next-line no-console
  // console.log(schema);
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
    // eslint-disable-next-line no-console
    console.log(text);
    // eslint-disable-next-line no-console
    console.log(doc);
    // eslint-disable-next-line no-console
    console.log(typeof doc);
    // const ret = JSON.parse(doc); nie wiem czy tak, może(?)
    // ^^^ - showing type of parsed string
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return doc;
  }
<<<<<<< HEAD
<<<<<<< HEAD
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
=======
  // type gitHubAction = {
  //   name: string;
  // };
  //predykat
>>>>>>> 2324fa9 (working validator (?))
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
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
      console.log(validate.errors);
      console.log('NO');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s: any = validate.errors;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return s;
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
  if (validate(x)) {
    showObject(x);
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
  const res = returnArray(x);
  console.log(Object.entries(x));
  let i = 0;
  return (
    <>
      <div className="text-editor">
        <Editor value={yaml} onChange={setYaml} press={click} />
      </div>
      <div className="result">
        {click && validate(x) ? <pre>{JSON.stringify(x, null, 2)}</pre> : ''}
        {click && validate(x) ? (
          <pre>{util.inspect(x, { depth: null })}</pre>
        ) : (
          ''
        )}
<<<<<<< HEAD
        <pre>{JSON.stringify(x, null, 2)}</pre>
=======
        {JSON.stringify(parseYamltoJSON(man), null, 2)}
>>>>>>> 2324fa9 (working validator (?))
        <ol>
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            res.map(data => (
              <li key={i++}>{data}</li>
            ))
          }
        </ol>
      </div>
      <div className="result">{click ? yaml : ''}</div>
      <button className="PRESSME" onClick={handleClickEvent}>
        KONWERTUJ
      </button>
      <div className="checkValid"> {validate(x) ? '' : x}</div>
      <div className="checkValid">
        {' '}
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
