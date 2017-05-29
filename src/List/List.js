import React, { Component } from 'react';
import './List.css';

import Note from '../Note/Note.js';

class List extends Component {
  render() {

    const notes = this.props.list.notes && this.props.list.notes.map((note) =>
      <Note note={note} key={note.id} />
    );

    const handleAddNote = (e) => {
      this.props.handleAddNote(e, this.props.list.id);
    };

    return (
      <li className="List">
        <div className="List-header">
            <button onClick={handleAddNote}>Add Note</button>
        </div>
        <ul className="List-notes">
            {notes}
        </ul>
      </li>
    );
  }
}

export default List;
