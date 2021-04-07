import Ajv from 'ajv';
import jsyaml from 'js-yaml';
import React, { useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import { schema as schem } from '../schema/Schema';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validate(data: any) {
    if (typeof data === 'string') {
      return 0;
    }
    const ajv = new Ajv();

    const validate = ajv.compile(schem);
    const valid = validate(data);
    if (!valid) {
      // eslint-disable-next-line no-console
      console.log(validate.errors);
    }
    // eslint-disable-next-line no-console
    //console.log(typeof valid);
    return valid;
    //const moduleCode = standaloneCode(ajv, valid);
    // eslint-disable-next-line no-console
    //console.log(typeof moduleCode);
  }
  //global variable, for storing parsed yaml in JSON  format
  const x = parseYamltoJSON(man);
  function handleClickEvent() {
    setClick(!click);
    // eslint-disable-next-line no-console
    console.log(click);
    if (click) {
      if (validate(x)) {
        // eslint-disable-next-line no-console
        console.log('valid');
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
  let i = 0;
  return (
    <>
      <div className="text-editor">
        <Editor value={yaml} onChange={setYaml} press={click} />
      </div>
      <div className="result">
        {click && validate(x) ? JSON.stringify(x) : ''}
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
