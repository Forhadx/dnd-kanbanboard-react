import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const handleClick = (e) => {
    console.log(e);
    // console.log(e.detail);
    // switch (e.detail) {
    //   case 1:
    //     console.log("click");
    //     break;
    //   case 2:
    //     console.log("double click");
    //     break;
    //   case 3:
    //     console.log("triple click");
    //     break;
    //   default:
    //     return;
    // }
  };

  const handleDragStart = (e) => {
    console.log("dragging...");
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={handleClick}
          draggable
          onDragStart={(e) => handleDragStart(e)}
        >
          Click me
        </button>
      </header>
    </div>
  );
}

export default App;
