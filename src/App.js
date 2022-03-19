import React from "react";
import "./App.scss";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  // const handleClick = (e) => {
  //   console.log(e);
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
  // };

  const data = [
    { title: "group 1", items: ["1", "2", "3"] },
    { title: "group 2", items: ["4", "5"] },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <KanbanBoard data={data} />
      </header>
    </div>
  );
}

export default App;
