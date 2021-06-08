/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import jsyaml from 'js-yaml';
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

import allJobsNeeds from '../additionalFunctions/allNeededJobs';
import { ajv } from '../additionalFunctions/createAjvObject';
import displayError from '../additionalFunctions/displayError';
import { LinksToActions } from '../additionalFunctions/linksToActions';
import dependencyObject from '../additionalFunctions/neededFor';
import { normalize } from '../additionalFunctions/normalization';
import createDiagram, {
  selfLink,
  allNeeds,
  checkCycles,
  sameNeeds,
} from '../diagrams/createDiagrams';
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
    let doc;
    // Parsing string to JSON
    try {
      doc = jsyaml.load(text);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
  function validate(data: parsedYaml) {
    if (typeof data === 'string') {
      return false;
    }
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
      const errors: parsedYaml = validate.errors;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return errors;
    }
    return valid;
  }
  workflow = parseYamltoJSON(man);

  function handleClick() {
    if (click.result) {
      setClick({ result: false, editor: true });
    } else {
      setClick({ result: true, editor: false });
    }
  }
  function showBoth() {
    setClick({ result: true, editor: true });
  }
  try {
    normalizedObject = normalize(workflow);
  } catch (e) {
    // error
  }
  if (typeof workflow !== 'object') {
    //creating a seperate object
    workflow = undefined;
  }
  // Storing a boolean or an error object
  const storeValidationResult = validate(workflow);
  let isNeededFor: Record<string, string[]> = {};
  isNeededFor = dependencyObject(workflow, normalizedObject, isNeededFor);
  const allNeedsFromJobs: boolean = allJobsNeeds(
    workflow,
    normalizedObject,
    isNeededFor,
  );
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
          {!click.result || !click.editor ? (
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
      {click.result && !isError && (
        <>
          {normalizedObject && (
            <div className="links">
              <span>Actions used in workflow:</span>
              {LinksToActions(normalizedObject)}{' '}
            </div>
          )}
          {selfLink(isNeededFor) && (
            <div className="selfLink">
              Self link detected (job is dependent on itself)! Please check
              provided YAML!
            </div>
          )}
          {allNeeds(isNeededFor, normalizedObject) && (
            <div className="allNeeds">
              Every job is dependent on another job, workflow will never
              complete! Please check provided YAML!
            </div>
          )}
          {checkCycles(isNeededFor)[0] && (
            <div className="cycles">
              Cycle detected! Part of the provided workflow will never execute!
              Please check provided YAML!
            </div>
          )}
          {sameNeeds(isNeededFor) && (
            <div className="allNeeds">
              One or more of provided jobs, has duplicate of the same job
              needed! Please check provided YAML!
            </div>
          )}
          {allNeedsFromJobs && (
            <div className="jobDoesntExist">
              Job passed in need does not exists! Please check provided YAML!
            </div>
          )}
        </>
      )}
    </>
  );
}
export default App;
