import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
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
        handleDeleteNote={this.props.handleDeleteNote}
        handleChangeText={this.props.handleChangeText}
        handleNoteDrag={this.props.handleNoteDrag}
        handleNoteColorChange={this.props.handleNoteColorChange} />
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
          <CSSTransitionGroup
            transitionName="notes-trans"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
          {notes}
          </CSSTransitionGroup>
        </ul>
      </li>
    );
  }
}

export default List;
