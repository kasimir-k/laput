import React, { Component } from 'react';
import Board from '../Board/Board';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>
            <img src={logo} className="App-logo" alt="logo" />
            Welcome to React-Laput
          </h2>
        </div>
        <div className="App-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
