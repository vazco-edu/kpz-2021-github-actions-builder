/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import jsyaml from 'js-yaml';
import debounce from 'lodash.debounce';
import React, { useState, useCallback } from 'react';

import { ajv } from '../additionalFunctions/createAjvObject';
import { debouncedDiagrams } from '../additionalFunctions/debouncedOutput';
import dispError from '../additionalFunctions/displayError';
import { displayLinks } from '../additionalFunctions/linksToActions';
import { normalize } from '../additionalFunctions/normalization';
import { throttleFunction, xD } from '../additionalFunctions/throttledOutput';
import createDiagram, {
  selfLink,
  isNeededFor,
  allNeeds,
  checkCycles,
  sameNeeds,
} from '../diagrams/createDiagrams';
import useLocalStorage from '../hooks/useLocalStorage';
import schema from '../schema/Schema.json';
import Editor from './Editor';

export let workflow: any;
export let normalizedObject: any;
function App(): JSX.Element {
  const [yaml, setYaml] = useLocalStorage('yaml', '');
  const [click, setClick] = useState(false);
  /*
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedDisplay = useCallback(
    debounce(nextValue => setYaml(nextValue), 1000),
    [],
  );
  const handleChangeEvent = (event: { target: { value: any } }) => {
    const nextValue = event.target.value;
    setYaml(nextValue);
    debouncedDisplay(nextValue);
  };
  */
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
  workflow = parseYamltoJSON(man);
  function handleClickEvent() {
    setClick(!click);
  }
  try {
    normalizedObject = normalize(workflow);
  } catch (e) {
    console.log(e.errors);
  }
  if (typeof workflow !== 'object') {
    //creating a seperate object
    workflow = undefined;
  }
  // Storing a boolean or an error object
  const storeValidationResult = validate(workflow);
  if (normalizedObject && !dispError(storeValidationResult)) {
    displayLinks(normalizedObject);
  }
  xD();
  return (
    <>
      <div className="text-editor">
        <Editor value={yaml} onChange={setYaml} press={click} />
      </div>
      <div className="result">
        {normalizedObject !== undefined &&
        !dispError(storeValidationResult) &&
        click
          ? createDiagram(workflow, normalizedObject)
          : ''}
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
      <div className="selfLink">
        {selfLink(isNeededFor) && click
          ? 'Self link detected (job is dependent on itself)! Please check provided YAML!'
          : ''}
      </div>
      <div className="allNeeds">
        {allNeeds(isNeededFor, normalizedObject) && click
          ? 'Every job is dependent on another job, workflow will never complete! Please check provided YAML!'
          : ''}
      </div>
      <div className="cycles">
        {checkCycles(isNeededFor)[0] && click
          ? 'Cycle detected! Part of the provided workflow will never execute! Please check provided YAML!'
          : ''}
      </div>
      <div className="allNeeds">
        {sameNeeds(isNeededFor) && click
          ? 'One or more of provided jobs, has duplicate jobs needed! Please check provided YAML!'
          : ''}
      </div>
    </>
  );
}
export default App;
