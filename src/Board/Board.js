import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Board.css';

class Board extends Component {
    
  constructor(props) {
      super(props);
  }
    
  render() {
    return (
      <div className="Board">
        <div className="Board-header">
            Here be the list add button
        </div>
        <p className="Board-lists">
            Here be the lists
        </p>
      </div>
    );
  }
}

export default Board;
