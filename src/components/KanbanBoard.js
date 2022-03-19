import React, { useContext, useEffect, useRef, useState } from "react";
import AllGroup from "./AllGroup";
// import DndContext from "../store/dnd-context";

const DragNDrop = () => {
  const [data, setData] = useState([]);
  const [isAddGroup, setIsAddGroup] = useState(false);
  const [title, setTitle] = useState("");

  // const DndCtx = useContext(DndContext);
  // const { data, addGroupTitle } = DndCtx;

  useEffect(() => {
    let alldata = JSON.parse(localStorage.getItem("data"));
    if (alldata) {
      setData([...alldata]);
    }
  }, []);

  console.log("datalist: ", data);

  const addTitleHandler = (e) => {
    e.preventDefault();
    if (title) {
      let newData = [...data, { title: title, items: [] }];
      setData(newData);
      localStorage.setItem("data", JSON.stringify(newData));
      setTitle("");
    }
  };

  return (
    <div className="kanban-board">
      {data.length <= 0 && !isAddGroup ? (
        <div className="add-list" onClick={() => setIsAddGroup(true)}>
          + Add a list
        </div>
      ) : (
        <>
          <AllGroup data={data} setData={setData} />
          <div className="dnd-group">
            <form className="form" onSubmit={addTitleHandler}>
              <input
                type="text"
                placeholder="Enter list title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="btns">
                <button type="submit">Add list</button>
                <div className="cancel" onClick={() => setIsAddGroup(false)}>
                  X
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default DragNDrop;
