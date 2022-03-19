import { createContext, useState } from "react";

const DndContext = createContext({
  data: [],
  addGroupTitle: function (title) {},
});

export function DndContextProvider(props) {
  const [data, setData] = useState([]);

  function addGroupTitleHandler(title) {
    console.log("t c: ", title);
  }

  const context = {
    data: data,
    addGroupTitle: addGroupTitleHandler,
  };

  return (
    <DndContext.Provider value={context}>{props.children}</DndContext.Provider>
  );
}

export default DndContext;
