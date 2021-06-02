/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import jsyaml from 'js-yaml';
import React, { useState, useCallback, useEffect } from 'react';
import Popup from 'reactjs-popup';

import { ajv } from '../additionalFunctions/createAjvObject';
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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

  const [renderedDiagram, setRenderedDiagram] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (normalizedObject === undefined) {
      setRenderedDiagram(null);
      return;
    }
    const displayedError = dispError(storeValidationResult);
    if (displayedError) {
      setRenderedDiagram(displayedError);
      return;
    }
    const timerId = setTimeout(() => {
      setRenderedDiagram(
        createDiagram(workflow, normalizedObject, isNeededFor),
      );
    }, 500);
    console.log('ROBIE');
    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yaml]);
  console.log(isNeededFor);
  console.log(checkCycles(isNeededFor)[0]);
  console.log(sameNeeds(isNeededFor));
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
          {!click.result && click.editor ? (
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
        {checkCycles(isNeededFor)[0]
          ? 'Cycle detected! Part of the provided workflow will never execute! Please check provided YAML!'
          : ''}
      </div>
      <div className="allNeeds">
        {sameNeeds(isNeededFor)
          ? 'One or more of provided jobs, has duplicate of the same job needed! Please check provided YAML!'
          : ''}
      </div>
    </>
  );
}
export default App;
