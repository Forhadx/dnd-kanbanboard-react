import React, { useEffect, useState } from "react";
import AllGroup from "./AllGroup";
import ListForm from "./Forms/ListFrom";

export interface IItem {
  title: string;
  lock: boolean;
}

export interface IList {
  title: string;
  items: IItem[];
}

const KanbanBoard: React.FC = () => {
  const [data, setData] = useState<IList[]>([]);
  const [isAddGroup, setIsAddGroup] = useState<boolean>(false);
  const [hideAddGrp, setHideAddGrp] = useState<boolean>(true);

  useEffect(() => {
    const temp = localStorage.getItem("data");
    let alldata = temp ? JSON.parse(temp) : [];
    if (alldata) {
      setData([...alldata]);
    }
  }, []);

  const addTitleHandler = (title: string) => {
    let newData: IList[] = [...data, { title: title, items: [] }];
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
                inputType="addList"
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
