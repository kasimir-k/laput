import React, { Component } from 'react';
import './Note.css';

class Note extends Component {
  render() {
    return (
      <div className="Note">
        <div className="Note-header">
            Here be the note's menu
        </div>
        <p className="Note-text">
            Here be the note text
        </p>
      </div>
    );
  }
}

export default Note;
