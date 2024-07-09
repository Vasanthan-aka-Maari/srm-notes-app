import React from "react";
import { auth } from "./firebase.js";

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export default SignOut;
