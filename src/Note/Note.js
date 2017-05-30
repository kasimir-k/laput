import React, { Component } from 'react';
import Toggle from 'react-toggle'

import { findDOMNode } from 'react-dom';
import { DragItemTypes } from '../Constants';
import { DragSource, DropTarget } from 'react-dnd';

import './Note.css';
import '../../node_modules/react-toggle/style.css';

const noteSource = {
  beginDrag(props) {
    return {
      noteId: props.note.id,
      listId: props.listId
    };
  }
};

const noteTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.note.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.handleNoteDrag(monitor.getItem(), props.note, dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
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
    const handleChangeText = (e) => {
      this.props.handleChangeText(e, this.props.listId, this.props.note.id);
    };

    const handleDoneChange = (e) => {};

    const handlePrioChange = (e) => {};

    const handleDeleteNote = (e) => {};

    return this.props.connectDragSource(this.props.connectDropTarget(
      <li className="Note">
        <div className="Note-header">
            <button className="drag-handle">::::::</button>
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
              <button onClick={handleDeleteNote}>✕</button>
            </div>
        </div>
        <textarea className="Note-text" onChange={handleChangeText} value={this.props.note.text} />
      </li>
    ));
  }
}

export default DropTarget(DragItemTypes.NOTE, noteTarget, dropCollect)(DragSource(DragItemTypes.NOTE, noteSource, dragCollect)(Note));
