import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/yaml/yaml';
import { Controlled } from 'react-codemirror2';
<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, no-console */
=======
import 'codemirror/addon/lint/yaml-lint';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
>>>>>>> 06cc739 (added autocomplete)
export default function Editor(props: any): JSX.Element {
  const { value, onChange } = props;

  function handleChange(editor: unknown, data: unknown, value: string) {
    console.log(editor);
    console.log(data);
    onChange(value);
  }
  return (
    <>
      <div className="container">
        <Controlled
          onBeforeChange={handleChange}
          value={value}
          className="editor-wrapper"
          options={{
            linewrapping: true,
            lint: true,
<<<<<<< HEAD
            mode: 'yaml',
            indentWithTaba: false,
=======
            mode: 'text/x-yaml',
            indentWithTabs: false,
>>>>>>> 06cc739 (added autocomplete)
            smartIndent: true,
            tabSize: 2,
            gutters: [
              'CodeMirror-linenumbers',
              'CodeMirror-foldgutter',
              'CodeMirror-lint-markers',
            ],
            theme: 'material',
            lineNumbers: true,
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
          }}
        />
      </div>
    </>
  );
}
