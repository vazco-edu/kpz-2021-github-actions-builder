/* eslint-disable complexity */
<<<<<<< HEAD
=======
/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import jsyaml from 'js-yaml';
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

import { ajv } from '../additionalFunctions/createAjvObject';
import displayError from '../additionalFunctions/displayError';
import { displayLinks } from '../additionalFunctions/linksToActions';
import dependencyObject from '../additionalFunctions/neededFor';
import { normalize } from '../additionalFunctions/normalization';
import createDiagram, {
  selfLink,
=======
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
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
  allNeeds,
  checkCycles,
  sameNeeds,
} from '../diagrams/createDiagrams';
<<<<<<< HEAD
import matrixHandler from '../diagrams/matrixHandling';
import useLocalStorage from '../hooks/useLocalStorage';
import schema from '../schema/Schema.json';
import Editor from './Editor';
import 'reactjs-popup/dist/index.css';

type parsedYaml = any;

function App(): JSX.Element {
  let workflow: parsedYaml;
  let normalizedObject: parsedYaml;
  const [yaml, setYaml] = useLocalStorage('yaml', '');
  const [click, setClick] = useState({ editor: true, result: true });
  const man = yaml;

  function parseYamltoJSON(text: string): parsedYaml {
=======
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
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
    let doc;
    // Parsing string to JSON
    try {
      doc = jsyaml.load(text);
    } catch (e) {
<<<<<<< HEAD
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
=======
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
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
<<<<<<< HEAD
  function validate(data: parsedYaml) {
=======
  function validate(data: any) {
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
    if (typeof data === 'string') {
      return false;
    }
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
<<<<<<< HEAD
      const errors: parsedYaml = validate.errors;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return errors;
    }
    return valid;
  }
  workflow = parseYamltoJSON(man);

  function handleClick() {
    if (click.result && click.editor) {
      setClick(click => {
        return { result: !click.result, editor: click.editor };
      });
    } else if (!click.result && click.editor) {
      setClick(click => {
        return { result: !click.result, editor: !click.editor };
      });
    } else if (click.result && !click.editor) {
      setClick(click => {
        return { result: !click.result, editor: !click.editor };
      });
    }
  }
  function showBoth() {
    if (!click.editor && !click.result) {
      setClick(click => {
        return { result: !click.result, editor: !click.editor };
      });
    } else if (!click.editor && click.result) {
      setClick(click => {
        return { result: click.result, editor: !click.editor };
      });
    } else if (click.editor && !click.result) {
      setClick(click => {
        return { result: !click.result, editor: click.editor };
      });
    }
=======
      const s: any = validate.errors;
      return s;
    }
    return valid;
  }
  //global variable, for storing parsed yaml in JSON  format
  workflow = parseYamltoJSON(man);
  function handleClickEvent() {
    setClick(!click);
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
  }
  try {
    normalizedObject = normalize(workflow);
  } catch (e) {
<<<<<<< HEAD
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
=======
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
    console.log(e.errors);
  }
  if (typeof workflow !== 'object') {
    //creating a seperate object
    workflow = undefined;
  }
  // Storing a boolean or an error object
  const storeValidationResult = validate(workflow);
<<<<<<< HEAD
  let isNeededFor: Record<string, string[]> = {};
  isNeededFor = dependencyObject(workflow, normalizedObject, isNeededFor);
  console.log(click);

  const [renderedDiagram, setRenderedDiagram] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (normalizedObject === undefined || displayError(storeValidationResult)) {
      setRenderedDiagram(null);
      return;
    }
    const timerId = setTimeout(() => {
      setRenderedDiagram(
        createDiagram(workflow, normalizedObject, isNeededFor),
      );
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yaml]);
  console.log(isNeededFor);
  console.log(checkCycles(isNeededFor)[0]);
  console.log(sameNeeds(isNeededFor));
  const isError = displayError(storeValidationResult);
  return (
    <>
      <div className="grid">
        <div className="buttonsWrapper">
          <button className="PRESSME" onClick={handleClick}>
            {click.editor && click.result
              ? 'Expand Editor'
              : click.editor && !click.result
              ? 'Show Diagrams'
              : 'Show Editor'}
          </button>
          {(!click.result && click.editor) ||
          (!click.editor && click.result) ? (
            <button className="PRESSME" onClick={showBoth}>
              {' '}
              Show editor and diagrams
            </button>
          ) : (
            ''
          )}

          {matrixHandler(normalizedObject) && click.result ? (
            <Popup
              trigger={<button className="PRESSME">Display Matrix</button>}
              position="bottom center"
            >
              <div className="matrix">{matrixHandler(normalizedObject)}</div>
            </Popup>
          ) : (
            ''
          )}
        </div>
        <div
          className={`result ${
            click.editor && click.result
              ? 'normal'
              : !click.editor && click.result
              ? 'bigger'
              : 'smaller'
          }`}
        >
          {renderedDiagram}
        </div>
        <div
          className={`text-editor ${
            click.editor && click.result
              ? 'normal'
              : click.editor && !click.result
              ? 'bigger'
              : 'smaller'
          } `}
        >
          <Editor value={yaml} onChange={setYaml} press={click} />
        </div>
      </div>
      <div className="checkValid"> {isError}</div>
      <span />
      {normalizedObject && !isError && click.result ? (
        <>
          <div className="links">
            <span>Actions used in workflow:</span>
            {displayLinks(normalizedObject)}{' '}
          </div>
        </>
      ) : (
        <div className="none" />
      )}

      <div className="selfLink">
        {selfLink(isNeededFor) && click.result && !isError
=======
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
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
          ? 'Self link detected (job is dependent on itself)! Please check provided YAML!'
          : ''}
      </div>
      <div className="allNeeds">
<<<<<<< HEAD
        {allNeeds(isNeededFor, normalizedObject) && click.result && !isError
=======
        {allNeeds(isNeededFor, normalizedObject) && click
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
          ? 'Every job is dependent on another job, workflow will never complete! Please check provided YAML!'
          : ''}
      </div>
      <div className="cycles">
<<<<<<< HEAD
        {checkCycles(isNeededFor)[0] && click.result && !isError
=======
        {checkCycles(isNeededFor)[0] && click
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
          ? 'Cycle detected! Part of the provided workflow will never execute! Please check provided YAML!'
          : ''}
      </div>
      <div className="allNeeds">
<<<<<<< HEAD
        {sameNeeds(isNeededFor) && click.result && !isError
          ? 'One or more of provided jobs, has duplicate of the same job needed! Please check provided YAML!'
=======
        {sameNeeds(isNeededFor) && click
          ? 'One or more of provided jobs, has duplicate jobs needed! Please check provided YAML!'
>>>>>>> afcf16a6ffba74b98d53b35ff267b7d6668df140
          : ''}
      </div>
    </>
  );
}
export default App;
