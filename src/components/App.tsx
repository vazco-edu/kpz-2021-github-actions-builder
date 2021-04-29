/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import jsyaml from 'js-yaml';
import React, { useState } from 'react';

import { ajv } from '../additionalFunctions/createAjvObject';
import dispError from '../additionalFunctions/displayError';
import { displayLinks } from '../additionalFunctions/linksToActions';
import { normalize } from '../additionalFunctions/normalization';
import createDiagram from '../diagrams/createDiagrams';
import useLocalStorage from '../hooks/useLocalStorage';
import schema from '../schema/Schema.json';
import Editor from './Editor';

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
      const s: any = validate.errors;
      return s;
    }
    return valid;
  }
  //global variable, for storing parsed yaml in JSON  format
  let workflow: any = parseYamltoJSON(man);
  function handleClickEvent() {
    setClick(!click);
  }
  let normalizedObject: any;
  try {
    normalizedObject = normalize(workflow);
  } catch (e) {
    console.log(e.errors);
  }
  console.log(normalizedObject);
  if (typeof workflow !== 'object') {
    //creating a seperate object
    workflow = undefined;
  }
  // Storing a boolean or an error object
  const storeValidationResult = validate(workflow);
  if (normalizedObject && !dispError(storeValidationResult)) {
    displayLinks(normalizedObject);
  }
<<<<<<< HEAD
  console.log(!true);
  //          ## DIAGRAMS ##
=======
>>>>>>> 011edf92e8ddfb31ab28d09003f10d48a55e04fa
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
      <div className="links">
        <span>Actions used in workflow: </span>
        {normalizedObject && !dispError(storeValidationResult) && click
          ? displayLinks(normalizedObject)
          : ''}
      </div>
    </>
  );
}

export default App;
