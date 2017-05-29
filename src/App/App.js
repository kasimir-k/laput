import React, { Component } from 'react';
import Board from '../Board/Board';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React-Laput</h2>
        </div>
        <p className="App-board">
          <Board />
        </p>
      </div>
    );
  }
}

export default App;
