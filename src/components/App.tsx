import React, {useState} from 'react';
import Editor from './Editor';
function App() {
  const [yaml, setYaml] = useState('')
  return (
    <>
    <div className = "text-editor">
      <Editor  
      value = {yaml} 
      onChange = {setYaml} 
      />
    </div><div className = "result">
      ja
      </div>
      <button className = "PRESSME"  >KONWERTUJ</button>
    </>
  )
}

export default App;
