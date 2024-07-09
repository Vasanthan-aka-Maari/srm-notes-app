import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase.js";
import NoteUploader from "./NoteUploader.jsx";
import Note from "./Note.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.js";
import SignIn from "./SignIn.js";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    db.collection("notes").onSnapshot((snapshot) => {
      setNotes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          note: doc.data(),
        }))
      );
    });
  }, []);

  console.log(notes);

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <NoteUploader username={user.displayName} /> : <SignIn />}
      {notes.map(({ id, note }) => (
        <Note
          key={id}
          title={note.title}
          username={note.username}
          subjectCode={note.subjectCode}
          fileUrl={note.fileUrl}
        />
      ))}
      <br />
      <br />
    </div>
  );
}

export default App;
