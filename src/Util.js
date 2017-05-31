export function findNote(noteId, lists) {
  let note = null;
  lists.forEach((v1, i1) => {
    lists[i1].notes.forEach((v2, i2) => {
      if (lists[i1].notes[i2].id === noteId) {
        note = lists[i1].notes[i2];
      }
    });
  });
  return note;
}

export function findNotesList(noteId, lists) {
  let list = null
  lists.forEach((v1, i1) => {
    lists[i1].notes.forEach((v2, i2) => {
      if (lists[i1].notes[i2].id === noteId) {
        list = lists[i1];
      }
    });
  });
  return list;
}
