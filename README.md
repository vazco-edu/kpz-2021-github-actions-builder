# kpz-2021-github-actions-builder
  <img align=center width="460" height="300" src="https://cdn.galleries.smcloud.net/t/galleries/gf-VDt5-Pkub-mkWa_nie-zyje-bob-budowniczy-aktor-podkladajacy-glos-mial-62-lata-664x442-nocrop.jpg"></img>
## About the product
  Our goal was to create a GUI for Github Actions pipelines. As of now, [GitHub Actions](https://github.com/features/actions) is a Continous Integration/Deployment tool that is integrated directly with GitHub. Currently, after configuring it with YAML files, there could be a scenario, where You would need to wait 30 minutes, just to receive an error. We wanted to make a simple application, that would prevent this kind of situations.
## Functionalities
   1. Integrated editor <br><br>
   <img align=center src="https://i.imgur.com/yUIHuAw.png"></img>
   2. Interpretation of YAML format
      * Conversion to JSON
      * Validation <br><br>
      <img align=center src="https://i.imgur.com/NtIlAQE.png"></img>
      * Error handling: <br> - detection of self-links <br> - detection of all dependent jobs <br> - detection of cycles <br> - detection of duplicate needs <br> - detection of not-existant job needed<br><br>
      <img align=center src="https://i.imgur.com/UGTGhsf.png"></img>
   3. Providing links to used actions <br><br>
   <img align=center src="https://i.imgur.com/fxIj9B1.png"></img>
   4. Graphical representation of provided workflow <br><br>
   <img align=center src="https://i.imgur.com/EgxXz61.png"></img>
   5. Changing orientation of diagrams <br><br>
   <img align=center src="https://cdn.discordapp.com/attachments/557975485892657173/851748201811935292/Actions_builder_-_Google_Chrome_2021-06-08_10-59-46.gif"></img>
   6. Hiding editor and diagrams window <br><br>
   <img align=center src="https://cdn.discordapp.com/attachments/557975485892657173/851750761196814366/Actions-builder-Google-Chrome-2021-06-08-11-06-57.gif"></img>
   7. Handling matrixes <br><br>
   <img align=center src="https://cdn.discordapp.com/attachments/557975485892657173/851783582413488148/Actions-builder--Brave-2021-06-08-13-21-50.gif"></img>
   8. Autocomplete on shortcut (CTRL+SPACE)<br><br>
   <img align=center src="https://cdn.discordapp.com/attachments/557975485892657173/851859589514919986/2021-06-08-18-23-49.gif"></img> 
    
### Roadmap
1. Interpreting a workflow, based on "if" statement
2. Displaying all kinds of errors inline
3. Extend error handling logic
4. 'End', 'with', matrix depth handling
## Technologies
* [DagreJS](https://github.com/dagrejs/dagre/wiki)
* [React-Diagrams](https://github.com/projectstorm/react-diagrams)
* [Js-Yaml](https://www.npmjs.com/package/js-yaml)
* [Codemirror2](https://www.npmjs.com/package/react-codemirror2)
* [Reactjs-Popup](https://www.npmjs.com/package/reactjs-popup)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [JSON Schema](https://json-schema.org/)
* [AJV](https://ajv.js.org/)
## Project chronology
Week 1 - Week 5 - Assimilating with new technologies, first concept creation, added first functionalities (codemirror), creating first SVG's <br>
Week 6 - Week 7 - Interpretation of YAML, converting YAML to JSON format, first errors (inline) <br>
Week 8 - Week 9 - Integration with [React-Diagrams](https://github.com/projectstorm/react-diagrams) and [DagreJS](https://github.com/dagrejs/dagre/wiki) <br>
Week 10 - Week 11 - Bug-fixes, implementing custom errors, working on style-sheet (added grid) <br>
Week 12 - Finishing touches <br>
## Encountered bugs, problems and provided solutions
1. "OffsetWidth error" - First encoutered after implementing [DagreJS](https://github.com/dagrejs/dagre/wiki). It was caused, by calling a `setTimeout` function, before the previous call ended. We fixed it, by deleting said timeout in `componentWillUnmount` function. 
2. Incorrect assumption, that the first job of provided workflow, needs to be independent - Huge mistake on our part, that forced us to re-write a whole function, which was handling the creation of diagrams. 
3. Problems with [DagreJS](https://github.com/dagrejs/dagre/wiki)
    * Redistribution of diagrams - problem visible only in a scenario of changing the size of a diagram component. The only solution that we could come up with was to force a re-mount of our diagram component, by adding the "key" property to said component.




