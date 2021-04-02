import React, { useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import Editor from './Editor';
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
function App(): JSX.Element {
  const [yaml, setYaml] = useLocalStorage('yaml', '');
  const [click, setClick] = useState(true);
  //tutaj prypisanie do zmiennej !!!!!!!!!!!!!
  const man = yaml;
  function handleClickEvent(event: any) {
    setClick(!click);
    if (click) {
      // eslint-disable-next-line no-console
      console.log(man);
      const obj = JSON.parse(man);
      // eslint-disable-next-line no-console
      console.log(obj);
    }
    setClick(!click);
  }
  return (
    <>
      <div className="text-editor">
        <Editor value={yaml} onChange={setYaml} press={click} />
      </div>
      <div className="result">{click ? yaml : 'D'}</div>
      <button className="PRESSME" onClick={handleClickEvent}>
        KONWERTUJ
      </button>
    </>
  );
}

export default App;
