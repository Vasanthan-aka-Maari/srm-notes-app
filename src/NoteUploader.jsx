import React, { useState } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase/compat/app";
import SignOut from "./SignOut";
import "./noteupload.css";
import { Button, LinearProgress } from "@mui/material";

function NoteUploader({ username }) {
  const [title, setTitle] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [note, setNote] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setNote(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`notes/${note.name}`).put(note);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("notes")
          .child(note.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("notes").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              title: title,
              subjectCode: subjectCode,
              fileUrl: url,
              username: username,
            });

            setProgress(0);
            setTitle("");
            setSubjectCode("");
            setNote(null);
          });
      }
    );
  };

  return (
    <div className="container">
      <LinearProgress variant="determinate" value={progress} max={100} />
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="Subject Code"
        onChange={(e) => setSubjectCode(e.target.value)}
        value={subjectCode}
      />
      <Button variant="contained" component="label">
        Upload Note
        <input type="file" onChange={handleUpload} hidden />
      </Button>
      <SignOut />
    </div>
  );
}

export default NoteUploader;
