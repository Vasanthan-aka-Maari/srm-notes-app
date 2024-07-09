import React from "react";
import "./note.css";
import { Button, Card, CardContent, Typography } from "@mui/material";

function Note({ title, username, subjectCode, fileUrl }) {
  return (
    <div className="note">
      <p className="note-title">{title}</p>
      <p className="note-subjectCode">Subject Code: {subjectCode}</p>
      <p className="note-username">By: {username}</p>
      <a href={fileUrl} target="_blank" download={title}>
        {/* <button type="button">Download Note</button> */}
        <Button variant="contained">Download Notes</Button>
      </a>
    </div>
  );
}

export default Note;
