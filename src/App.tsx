import React, { useState } from "react";
import "./App.css";
import { MyLayout } from "./components/Layout/Layout";
import { ManagePage } from "./pages/Manage/Manage";

function App() {
  const [manage, setMange] = useState(false);
  return (
    <div className="App">
      {!manage ? (
        <MyLayout changemode={() => setMange(true)} />
      ) : (
        <ManagePage changemode={() => setMange(false)}></ManagePage>
      )}
    </div>
  );
}

export default App;
