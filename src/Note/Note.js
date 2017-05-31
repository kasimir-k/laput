import React, { Component } from 'react';
import Toggle from 'react-toggle';
import Textarea from 'react-textarea-autosize';

import { findDOMNode } from 'react-dom';
import { DragItemTypes, NoteColors } from '../Constants';
import { DragSource, DropTarget } from 'react-dnd';

import './Note.css';
import '../../node_modules/react-toggle/style.css';

const noteSource = {
  beginDrag(props) {
    return {
      noteId: props.note.id,
      index: props.index
    };
  },
  isDragging(props, monitor) {
    return monitor.getItem().noteId === props.note.id;
  },
};

const noteTarget = {
  hover(props, monitor, component) {
    const dragNoteId = monitor.getItem().noteId;
    const dragIndex = monitor.getItem().index;
    const hoverNoteId = props.note.id;
    const hoverIndex = props.index;

    if (dragNoteId === hoverNoteId) {
      return;
    }

    // the target note's middle, i.e. half of the height of the target
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // the drag note's pointer position
    const clientOffset = monitor.getClientOffset();
    // pointer's position - target's top = distance of the pointer from target's top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging downwards, pointer is less than half way from top
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards, pointer is over half way from top
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.handleNoteDrag(dragNoteId, hoverNoteId);
    monitor.getItem().index = hoverIndex;
  }
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class Note extends Component {

  render() {

    const colorOptions = Object.entries(NoteColors).map((col, i) =>
      <option
        value={col[1]}
        style={{ backgroundColor: col[1]}}
        key={i}>{col[0]}</option>
    );

    const handleChangeText = (e) => {
      this.props.handleChangeText(e, this.props.listId, this.props.note.id);
    };

    const handleDoneChange = (e) => {};

    const handlePrioChange = (e) => {};

    const handleDeleteNote = (e) => {
      this.props.handleDeleteNote(e, this.props.listId, this.props.note.id);
    };

    const handleNoteColorChange = (e) => {
      this.props.handleNoteColorChange(e, this.props.note.id);
    };

    const noteClassName = "Note" + (this.props.isDragging ? ' dragging' : '');

    return this.props.connectDropTarget(this.props.connectDragPreview(
      <li className={noteClassName} style={{ backgroundColor: this.props.note.color }}>
        <div className="Note-header">
          {this.props.connectDragSource(
            <button className="drag-handle">::::::</button>
          )}
            <div className="menu-container">
              <label>
                <Toggle
                  defaultChecked={this.props.note.done}
                  onChange={handleDoneChange} />
                <span>Done</span>
              </label>
              <label>
                <Toggle
                  defaultChecked={this.props.note.prio}
                  onChange={handlePrioChange} />
                <span>Prio</span>
              </label>
              <select onChange={handleNoteColorChange} defaultValue={this.props.note.color}>
                {colorOptions}
              </select>
              <button onClick={handleDeleteNote} className="delete">✕</button>
            </div>
        </div>
        <Textarea className="Note-text" onChange={handleChangeText} value={this.props.note.text} />
      </li>
    ));
  }
}

export default DropTarget(DragItemTypes.NOTE, noteTarget, dropCollect)(DragSource(DragItemTypes.NOTE, noteSource, dragCollect)(Note));
