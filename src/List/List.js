import React, { Component } from 'react';
import './List.css';
import Note from '../Note/Note.js';

class List extends Component {

  render() {

    const notes = this.props.list.notes && this.props.list.notes.map((note, i) =>
      <Note
        listId={this.props.list.id}
        note={note}
        key={note.id}
        index={i}
        handleChangeText={this.props.handleChangeText}
        handleNoteDrag={this.props.handleNoteDrag} />
    );

    const handleAddNote = (e) => {
      this.props.handleAddNote(e, this.props.list.id);
    };

    const handleChangeName = (e) => {
      this.props.handleChangeName(e, this.props.list.id);
    };

    return (
      <li className="List">
        <div className="List-header">
          <input type="text" value={this.props.list.name} onChange={handleChangeName} />
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
