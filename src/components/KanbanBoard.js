import React, { useEffect, useState } from "react";
import AllGroup from "./AllGroup";
import ListForm from "./Forms/ListFrom";

const KanbanBoard = () => {
  const [data, setData] = useState([]);
  const [isAddGroup, setIsAddGroup] = useState(false);
  const [hideAddGrp, setHideAddGrp] = useState(true);

  useEffect(() => {
    let alldata = JSON.parse(localStorage.getItem("data"));
    if (alldata) {
      setData([...alldata]);
    }
  }, []);

  const addTitleHandler = (title) => {
    let newData = [...data, { title: title, items: [] }];
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
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
              <ListForm
                type="addList"
                addTitleHandler={addTitleHandler}
                setHideAddGrp={setHideAddGrp}
                setIsAddGroup={setIsAddGroup}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default KanbanBoard;
