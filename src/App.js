import React from "react";
import "./App.scss";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <div className="App">
      <header>Kanban Board</header>
      <main>
        <KanbanBoard />
      </main>
    </div>
  );
}

export default App;
