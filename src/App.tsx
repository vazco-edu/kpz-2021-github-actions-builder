import { render } from '@testing-library/react';
import React from 'react';
import { isEmptyBindingElement } from 'typescript';

import './App.css';

export default class App extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      field: '',
      clicked: false,
    };
  }
  handleKeyDown = (event: any) => {
    if (event.keyCode === 9) {
      event.preventDefault();
      const val = this.state.field;
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;
      this.setState(
        {
          field: val.substring(0, start) + '\t' + val.substring(end),
        },
        () => {
          event.target.selectionStart = event.target.selectionEnd = start + 1;
        },
      );
    }
  };
  handleInputChange = (event: any) => {
    this.setState({
      field: event.target.value,
    });
  };
  handleClickEvent = (event: any) => {
    if (this.state.field === 'smile') {
      this.setState({
        clicked: true,
      });
    }
    if (this.state.field !== 'smile') {
      this.setState({
        clicked: false,
      });
    }
  };

  render() {
    return (
      <div className="GUI">
        <textarea
          className="text"
          value={this.state.field}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <div className="show_image">
          {this.state.clicked ? (
            <svg>
              <g>
                <circle r="30%" cx="50%" cy="50%" fill="yellow" />
                <text x="45%" y="50%" fill="red" />
              </g>
              <path fill="white" d="M115 100 A1 1, 0, 0 0, 185 100" />
              <circle
                className="eye"
                r="5%"
                cx="40%"
                cy="30%"
                fill="black"
                stroke="white"
                strokeWidth="3px"
              />
              <circle
                className="eye"
                r="5%"
                cx="60%"
                cy="30%"
                fill="black"
                stroke="white"
                strokeWidth="3px"
              />
            </svg>
          ) : null}
        </div>
        <button className="PRESSME" onClick={this.handleClickEvent}>
          KONWERTUJ
        </button>
        <footer className="foot">
          <img
            src="https://avatars.githubusercontent.com/u/80331274?s=180&v=4"
            alt="logo_of_the_company"
          />
          <br />
          Copyright <span>©</span> 2021. All rights reserved.
        </footer>
      </div>
    );
  }
}
