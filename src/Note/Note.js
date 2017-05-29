import React from 'react';
import './Note.css';

function Note(props) {

  const handleChangeText = (e) => {
    props.handleChangeText(e, props.listId, props.note.id);
  };

  return (
    <li className="Note">
      <div className="Note-header">
          Here be the note's menu
      </div>
      <textarea className="Note-text" onChange={handleChangeText} />
    </li>
  );
}

export default Note;
