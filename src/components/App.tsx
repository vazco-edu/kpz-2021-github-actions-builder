import Ajv from 'ajv';
import standaloneCode from 'ajv/dist/standalone';
import jsyaml from 'js-yaml';
import React, { useState } from 'react';

// import requireFromString from 'require-from-string';
import useLocalStorage from '../hooks/useLocalStorage';
import * as a from '../schema/Schema.json';
// import  from '../schema/Schema.json';
import Editor from './Editor';

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
function App(): JSX.Element {
  const [yaml, setYaml] = useLocalStorage('yaml', '');
  const [click, setClick] = useState(false);
  //tutaj prypisanie do zmiennej !!!!!!!!!!!!!
  const man = yaml;
  function parseYamltoJSON(text: string) {
    // Parsing string to JSON
    // eslint-disable-next-line @typescript-eslint/ban-types
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const doc = jsyaml.load(text);
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

  function validate(data: any) {
    const ajv = new Ajv();
    const validate = ajv.compile(a);
    const valid = validate(data);
    return valid;
  }

  function handleClickEvent(event: any) {
    setClick(!click);
    // eslint-disable-next-line no-console
    console.log(click);
    if (click) {
      const x = parseYamltoJSON(man);
      if (validate(x)) {
        // eslint-disable-next-line no-console
        console.log('valid');
      } else {
        // eslint-disable-next-line no-console
        console.log('not valid byczq');
      }
      // eslint-disable-next-line no-console
      //console.log(man);
    }
  }
  return (
    <>
      <div className="text-editor">
        <Editor value={yaml} onChange={setYaml} press={click} />
      </div>
      <div className="result">
        {click ? JSON.stringify(parseYamltoJSON(man)) : ''}
      </div>
      <button className="PRESSME" onClick={handleClickEvent}>
        KONWERTUJ
      </button>
      <div> {}</div>
    </>
  );
}

export default App;
