import Ajv from 'ajv';
import standaloneCode from 'ajv/dist/standalone';
import jsyaml from 'js-yaml';
import React, { useState } from 'react';

import Editor from './Editor';
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
function App(): JSX.Element {
  const [yaml, setYaml] = useLocalStorage('yaml', '');
  const [click, setClick] = useState(true);
  //tutaj prypisanie do zmiennej !!!!!!!!!!!!!
  const man = yaml;
  function parseYamltoJSON(text: string) {
    // Parsing string to JSON
    // eslint-disable-next-line @typescript-eslint/ban-types
    const doc = jsyaml.load(text);
    // eslint-disable-next-line no-console
    console.log(text);
    // eslint-disable-next-line no-console
    console.log(doc);
    // eslint-disable-next-line no-console
    console.log(typeof doc);
    // const ret = JSON.parse(doc); nie wiem czy tak, może(?)
    // ^^^ - showing type of parsed string
    return doc;
  }

  function validate(schema: Record<string, unknown>) {
    const ajv = new Ajv({ code: { source: true } });

    const valid = ajv.compile(schema);
    // eslint-disable-next-line no-console
    console.log(typeof valid);
    const moduleCode = standaloneCode(ajv, valid);
    // eslint-disable-next-line no-console
    console.log(typeof moduleCode);
  }
  function handleClickEvent(event: any) {
    setClick(!click);
    if (click) {
      // eslint-disable-next-line no-console
      console.log(man);
      // Tutaj chyba coś wywala, bo nie może wykonać JSON.parse (idk)
      // const obj = JSON.parse(man);
      // eslint-disable-next-line no-console
      // console.log(obj);
    }
    setClick(!click);
    const x = parseYamltoJSON(man);
    validate(x);
  }
  return (
    <>
      <div className="text-editor">
        <Editor value={yaml} onChange={setYaml} />
      </div>
      <div className="result">{click ? yaml : ''}</div>
      <button className="PRESSME" onClick={handleClickEvent}>
        KONWERTUJ
      </button>
    </>
  );
}

export default App;
