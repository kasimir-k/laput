import React, { Component } from 'react';
import './List.css';

class List extends Component {
  render() {
    return (
      <div className="List">
        <div className="List-header">
            Here be the note add button
        </div>
        <p className="List-notes">
            Here be the notes
        </p>
      </div>
    );
  }
}

export default List;
