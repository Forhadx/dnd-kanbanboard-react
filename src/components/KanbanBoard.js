import React, { useEffect, useState } from "react";
import AllGroup from "./AllGroup";

const DragNDrop = () => {
  const [data, setData] = useState([]);
  const [isAddGroup, setIsAddGroup] = useState(false);
  const [hideAddGrp, setHideAddGrp] = useState(true);
  const [title, setTitle] = useState("");

  useEffect(() => {
    let alldata = JSON.parse(localStorage.getItem("data"));
    if (alldata) {
      setData([...alldata]);
    }
  }, []);

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
          {(isAddGroup || hideAddGrp) && (
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
                  <div className="cancel" onClick={() => setHideAddGrp(false)}>
                    X
                  </div>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DragNDrop;
