/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
import Ajv from 'ajv';
import jsyaml from 'js-yaml';
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
    console.log(valid);
    return valid;
  }
  //global variable, for storing parsed yaml in JSON  format
  const x: any = parseYamltoJSON(man);
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
        {JSON.stringify(parseYamltoJSON(man), null, 2)}
        <ol>
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            res.map(data => (
              <li key={i++}>{data}</li>
            ))
          }
        </ol>
      </div>
      <button className="PRESSME" onClick={handleClickEvent}>
        KONWERTUJ
      </button>
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
