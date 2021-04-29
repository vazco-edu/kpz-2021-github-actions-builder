import jsyaml from 'js-yaml';
import React from 'react';
import { Controlled } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/yaml/yaml';
<<<<<<< HEAD
<<<<<<< HEAD
import { Controlled } from 'react-codemirror2';
<<<<<<< HEAD
<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, no-console */
=======
=======
>>>>>>> 6d36f31 (errors inline, normalizing input)
=======
>>>>>>> 47d4b70 (changed stuff)
=======
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
import 'codemirror/addon/lint/yaml-lint';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/indent-fold.js';

window.jsyaml = jsyaml;
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
<<<<<<< HEAD
            mode: 'yaml',
            indentWithTaba: false,
=======
            mode: 'text/x-yaml',
<<<<<<< HEAD
            indentWithTabs: false,
>>>>>>> 06cc739 (added autocomplete)
=======
            mode: 'text/x-yaml',
<<<<<<< HEAD
<<<<<<< HEAD
            indentWithTabs: false,
>>>>>>> 6d36f31 (errors inline, normalizing input)
=======
            indentWithTabs: true,
>>>>>>> 5d5a48d (added dynamic jobs and name interpretation in diagrams)
=======
            indentWithTabs: false,
>>>>>>> 3553cda (workin)
=======
            indentWithTabs: true,
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
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
