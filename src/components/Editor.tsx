import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/yaml/yaml';
import { Controlled } from 'react-codemirror2';
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
export default function Editor(props: any): JSX.Element {
  const { value, onChange } = props;
  // eslint-disable-next-line no-console
  //console.log(value);
  function handleChange(editor: unknown, data: unknown, value: string) {
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
            mode: 'yaml',
            indentWithTabs: false,
            smartIndent: true,
            tabSize: 2,
            gutters: [
              'CodeMirror-linenumbers',
              'CodeMirror-foldgutter',
              'CodeMirror-lint-markers',
            ],
            theme: 'material',
            lineNumbers: true,
          }}
        />
      </div>
    </>
  );
}
