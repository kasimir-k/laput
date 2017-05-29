import React from 'react';
import './Note.css';

function Note(props) {
  return (
    <li className="Note">
      <div className="Note-header">
          Here be the note's menu
      </div>
      <textarea className="Note-text" />
    </li>
  );
}

export default Note;
