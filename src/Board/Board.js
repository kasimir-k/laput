import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './Board.css';

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
      text: ''
    }
    lists[listIndex].notes.push(note);
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

  handleNoteDrag(dragIndex, hoverIndex, dragList, hoverList) {
    const lists = this.state.lists.slice();
    const dragListIndex = lists.findIndex((i) => {
      return i.id === dragList;
    });
    const hoverListIndex = lists.findIndex((i) => {
      return i.id === hoverList;
    });
    const dragNote = lists[dragListIndex].notes[dragIndex];
    lists[dragListIndex].notes.splice(dragIndex, 1);
    lists[hoverListIndex].notes.splice(hoverIndex, 0, dragNote);
    this.setState({ lists: lists});
    localStorage.setItem('laputState', JSON.stringify(this.state));
  }

  render() {

    const lists = this.state.lists.map((list) =>
      <List
        list={list}
        key={list.id}
        handleAddNote={this.handleAddNote}
        handleChangeName={this.handleChangeName}
        handleChangeText={this.handleChangeText}
        handleNoteDrag={this.handleNoteDrag} />
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
