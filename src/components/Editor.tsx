import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/yaml/yaml'
import {Controlled} from 'react-codemirror2'

export default function Editor(props: any) {
    const {
        value,
        onChange
    } = props

    function handleChange(editor: any, data: any, value: any){
        onChange(value)
    }
    return (
        <>
        <div className = 'container'>
            <Controlled
            onBeforeChange = {handleChange}
            value = {value}
            className = "editor-wrapper"
            options = {{
                linewrapping: true,
                lint: true,
                mode: "yaml",
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                theme:  'material',
                lineNumbers: true
            }}
            />
        </div>
        
        </>
    )
}
