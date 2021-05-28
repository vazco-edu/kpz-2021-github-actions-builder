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
import React, { useState, useCallback, Component, useEffect } from 'react';
import Popup from 'reactjs-popup';

import { ajv } from '../additionalFunctions/createAjvObject';
// import { debouncedDiagrams } from '../additionalFunctions/debouncedOutput';
import dispError from '../additionalFunctions/displayError';
import { displayLinks } from '../additionalFunctions/linksToActions';
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

function App(): JSX.Element {
  let workflow: any;
  let normalizedObject: any;
  const [yaml, setYaml] = useLocalStorage('yaml', '');
  const [click, setClick] = useState({ editor: true, result: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  /*const debouncedDisplay = useCallback(
    debounce(nextValue => setYaml(nextValue), 1000),
    [],
  );
  const handleChangeEvent = (event: { target: { value: any } }) => {
    const nextValue = event.target.value;
    setYaml(nextValue);
    debouncedDisplay(nextValue);
  };*/
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
  function showResult() {
    setClick(click => ({ result: !click.result, editor: click.editor }));
  }
  function showEditor() {
    console.log(click);
    setClick(click => {
      return { result: click.result, editor: !click.editor };
    });
    // console.log(click);
    // setClick(prevClick => {
    //   return { ...prevClick, result: !click.result };
    // });
    // console.log(click);
    // setClick(prevClick => {
    //   return { ...prevClick, result: !click.result };
    // });
  }
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
  const isNeededFor: Record<string, string[]> = {};
  console.log(click);

  const [renderedDiagram, setrenderedDiagram] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (normalizedObject === undefined || dispError(storeValidationResult)) {
      setrenderedDiagram(null);
      return;
    }
    const timerId = setTimeout(() => {
      setrenderedDiagram(
        createDiagram(workflow, normalizedObject, isNeededFor),
      );
    }, 500);
    console.log('ROBIE');
    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yaml]);
  return (
    <>
      <div className="buttonsWrapper">
        <button className="PRESSME" onClick={handleClick}>
          {click.editor ? 'Hide Diagrams' : 'Show Diagrams'}
        </button>
        <button className="PRESSME" onClick={showBoth}>
          show editor and diagrams
        </button>
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

      <div className="checkValid"> {dispError(storeValidationResult)}</div>
      <span />
      {normalizedObject && !dispError(storeValidationResult) && click.result ? (
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
        {selfLink(isNeededFor) && click.result
          ? 'Self link detected (job is dependent on itself)! Please check provided YAML!'
          : ''}
      </div>
      <div className="allNeeds">
        {allNeeds(isNeededFor, normalizedObject) && click.result
          ? 'Every job is dependent on another job, workflow will never complete! Please check provided YAML!'
          : ''}
      </div>
      <div className="cycles">
        {checkCycles(isNeededFor)[0] && click.result
          ? 'Cycle detected! Part of the provided workflow will never execute! Please check provided YAML!'
          : ''}
      </div>
      <div className="allNeeds">
        {sameNeeds(isNeededFor) && click.result
          ? 'One or more of provided jobs, has duplicate jobs needed! Please check provided YAML!'
          : ''}
      </div>
    </>
  );
}
export default App;
