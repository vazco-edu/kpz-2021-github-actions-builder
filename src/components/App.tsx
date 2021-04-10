import Ajv from 'ajv';
import jsyaml from 'js-yaml';
import React, { useState } from 'react';
import tv4 from 'tv4';
import util from 'util';

import useLocalStorage from '../hooks/useLocalStorage';
<<<<<<< HEAD
import { schema as schem } from '../schema/Schema';
=======
import a from '../schema/Schema.json';
// import  from '../schema/Schema.json';
>>>>>>> c884438 (sa)
import Editor from './Editor';

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, no-console */
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  function handleClickEvent() {
    setClick(!click);
    // eslint-disable-next-line no-console
    console.log(click);
    if (click) {
      if (validate(x)) {
        // eslint-disable-next-line no-console
        console.log('valid', a);
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
        <pre>{JSON.stringify(x, null, 2)}</pre>
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
    </>
  );
}

export default App;
