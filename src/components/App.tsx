/* eslint-disable no-console */
import Ajv from 'ajv';
import betterAjvErrors from 'better-ajv-errors';
import jsyaml from 'js-yaml';
import { log } from 'node:console';
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
      // // error = betterAjvErrors(schema, data, validate.errors);
      // console.log(error);
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
      <div className="checkValid"> {validate(x) ? '' : 'N'}</div>
      <div className="checkValid">
        {' '}
        {
          /* eslint-disable @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return*/
          validate(x) && typeof validate(x) === 'boolean'
            ? ''
            : `Validation error: ${validate(x).map(
                (data: { message: any; instancePath: any }) =>
                  `${data.message}` + ` on path: ${data.instancePath}`,
              )}`
        }
      </div>
    </>
  );
}

export default App;
