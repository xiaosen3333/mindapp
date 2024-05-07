import React from "react";
import "./App.css";
import { MyLayout } from "./components/Layout/Layout";
import { Button } from "antd";
// import { PageProvider } from "./context/MyContext";

function App() {
  return (
    <div className="App">
      {/* <PageProvider> */}
      <MyLayout />
      {/* </PageProvider> */}
    </div>
  );
}

export default App;
