import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { NoteColors } from '../Constants';
import './Board.css';
import { findNote, findNotesList } from '../Util.js';
import List from '../List/List.js';

class Board extends Component {

  constructor(props) {
      super(props);

      const initStateJSON = localStorage.getItem('laputState');

      this.state = (initStateJSON && JSON.parse(initStateJSON)) || { lists : [] };

      this.handleAddList = this.handleAddList.bind(this);
      this.handleAddNote = this.handleAddNote.bind(this);
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeText = this.handleChangeText.bind(this);
      this.handleNoteDrag = this.handleNoteDrag.bind(this);
      this.handleNoteColorChange = this.handleNoteColorChange.bind(this);
      this.handleDeleteNote = this.handleDeleteNote.bind(this);
  }



  handleAddList(e) {
    e.preventDefault();
    const lists = this.state.lists.slice();
    const list = {
      id: 'list' + Date.now(),
      name: '',
      notes: []
    }
    lists.push(list);
    this.setState({ lists: lists});
    localStorage.setItem('laputState', JSON.stringify(this.state));
  }

  handleAddNote(e, listId) {
    e.preventDefault();
    const listIndex = this.state.lists.findIndex((i) => {
      return i.id === listId;
    });
    const lists = this.state.lists.slice();
    const note = {
      id: 'note' + Date.now(),
      done: false,
      prio: false,
      text: '',
      color: NoteColors.YELLOW
    }
    lists[listIndex].notes.push(note);
    this.setState({ lists: lists});
    localStorage.setItem('laputState', JSON.stringify(this.state));
  }

  handleDeleteNote(e, listId, noteId) {
    e.preventDefault();
    const listIndex = this.state.lists.findIndex((i) => {
      return i.id === listId;
    });
    const lists = this.state.lists.slice();
    const noteIndex = lists[listIndex].notes.findIndex((i) => {
      return i.id === noteId;
    });
    lists[listIndex].notes.splice(noteIndex, 1);
    this.setState({ lists: lists});
    localStorage.setItem('laputState', JSON.stringify(this.state));
  }

  handleChangeName(e, listId) {
    e.preventDefault();
    const listIndex = this.state.lists.findIndex((i) => {
      return i.id === listId;
    });
    const lists = this.state.lists.slice();
    lists[listIndex].name = e.target.value;
    this.setState({ lists: lists});
    localStorage.setItem('laputState', JSON.stringify(this.state));
  }

  handleChangeText(e, listId, noteId) {
    e.preventDefault();
    const listIndex = this.state.lists.findIndex((i) => {
      return i.id === listId;
    });
    const lists = this.state.lists.slice();
    const noteIndex = lists[listIndex].notes.findIndex((i) => {
      return i.id === noteId;
    });
    lists[listIndex].notes[noteIndex].text = e.target.value;
    this.setState({ lists: lists});
    localStorage.setItem('laputState', JSON.stringify(this.state));
  }

  handleNoteDrag(dragNoteId, hoverNoteId) {
    const lists = this.state.lists.slice();

    const dragNote = findNote(dragNoteId, lists);
    const dragList = findNotesList(dragNoteId, lists);
    const dragIndex = dragList.notes.findIndex((i) => {
      return i.id === dragNote.id;
    });
    const hoverNote = findNote(hoverNoteId, lists);
    const hoverList = findNotesList(hoverNoteId, lists);
    const hoverIndex = hoverList.notes.findIndex((i) => {
      return i.id === hoverNote.id;
    });

    // remove dragged note from it's position
    dragList.notes.splice(dragIndex, 1);
    // inser dragged note to new position
    hoverList.notes.splice(hoverIndex, 0, dragNote);

    this.setState({ lists: lists});
    localStorage.setItem('laputState', JSON.stringify(this.state));
  }

  handleNoteColorChange(e, noteId) {
    e.preventDefault();
    console.log(e.target.value);
    const lists = this.state.lists.slice();
    const note = findNote(noteId, lists);
    note.color = e.target.value;

    this.setState({ lists: lists});
    localStorage.setItem('laputState', JSON.stringify(this.state));
  }

  render() {

    const lists = this.state.lists.map((list) =>
      <List
        list={list}
        key={list.id}
        handleAddNote={this.handleAddNote}
        handleDeleteNote={this.handleDeleteNote}
        handleChangeName={this.handleChangeName}
        handleChangeText={this.handleChangeText}
        handleNoteDrag={this.handleNoteDrag}
        handleNoteColorChange={this.handleNoteColorChange} />
    );

    return (
      <div className="Board">
        <div className="Board-header">
            <button onClick={this.handleAddList}>Add List</button>
        </div>
        <ul className="Board-lists">
          {lists}
        </ul>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
