import React, { Component } from 'react';
import Board from '../Board/Board';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>
            Laput
          </p>
        </div>
        <div className="App-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
