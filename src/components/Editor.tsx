/* eslint-disable no-console */
import jsyaml from 'js-yaml';
import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/yaml/yaml';
import { Controlled } from 'react-codemirror2';
import 'codemirror/addon/lint/yaml-lint';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/indent-fold.js';

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
export default function Editor(props: any): JSX.Element {
  const { value, onChange } = props;
  window.jsyaml = jsyaml;

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
            mode: 'text/x-yaml',
            placeholder: 'Please enter Your worklow here.',
            indentWithTabs: false,
            smartIndent: true,
            tabSize: 2,
            lintGutter: true,
            foldGutter: true,
            gutters: [
              'CodeMirror-linenumbers',
              'CodeMirror-foldgutter',
              'CodeMirror-lint-markers',
            ],
            theme: 'monokai',
            lineNumbers: true,
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
          }}
        />
      </div>
    </>
  );
}
