import React, { Component } from 'react';
import './Board.css';

import List from '../List/List.js';

class Board extends Component {

  constructor(props) {
      super(props);
      this.state = {
          lists : []
      };
      this.handleAddList = this.handleAddList.bind(this);
      this.handleAddNote = this.handleAddNote.bind(this);
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
  }

  render() {

    const lists = this.state.lists.map((list) =>
      <List list={list} key={list.id} handleAddNote={this.handleAddNote} />
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

export default Board;
