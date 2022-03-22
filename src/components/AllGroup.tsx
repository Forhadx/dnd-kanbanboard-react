import React, { useState, useRef } from "react";
import { IList } from "./KanbanBoard";
import ItemFrom from "./Forms/ItemFrom";
import ListFooter from "./ListFooter";
import ListHeader from "./ListHeader";
import ListItem from "./ListItem";

interface IProps {
  data: IList[];
  setData: React.Dispatch<React.SetStateAction<IList[]>>;
}

const AllGroup: React.FC<IProps> = ({ data, setData }) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [editItemIdx, setEditItemidx] = useState<number | null>(null);
  const [editGroupIdx, setEditGroupidx] = useState<number | null>(null);

  const dragItem = useRef<any>();
  const dragNode = useRef<any>();

  const handleDragStart = (e: any, params: any) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handlerDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e: any, params: any) => {
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      let newList = data;
      newList[params.grpIndex].items.splice(
        params.itemIndex,
        0,
        newList[currentItem.grpIndex].items.splice(currentItem.itemIndex, 1)[0]
      );
      dragItem.current = params;
      setData([...newList]);
      localStorage.setItem("data", JSON.stringify(newList));
    }
  };

  const handlerDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handlerDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyle = (params: any) => {
    const currentItem = dragItem.current;
    if (
      currentItem.grpIndex === params.grpIndex &&
      currentItem.itemIndex === params.itemIndex
    ) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  const lockCardHandler = (grpIndex: number, itemIndex: number) => {
    let newData = data;
    if (newData[grpIndex].items[itemIndex].lock === true) {
      newData[grpIndex].items[itemIndex].lock = false;
    } else {
      newData[grpIndex].items[itemIndex].lock = true;
    }
    setData([...newData]);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  const deleteCardHandler = (grpIndex: number, itemIndex: number) => {
    let newData = data;
    newData[grpIndex].items.splice(itemIndex, 1);
    setData([...newData]);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  const isUpdateCardItemHandler = (e: any, grpIdx: number, itemIdx: number) => {
    if (e.detail === 2) {
      setEditGroupidx(+grpIdx);
      setEditItemidx(+itemIdx);
    }
  };

  const updateCardItemHandler = (title: string) => {
    let newData: IList[] = data;
    if (editGroupIdx !== null && editItemIdx !== null) {
      newData[editGroupIdx].items[editItemIdx].title = title;
    }
    setData([...newData]);
    localStorage.setItem("data", JSON.stringify(newData));
    setEditGroupidx(null);
    setEditItemidx(null);
  };

  const cancelEditItemHandler = () => {
    setEditGroupidx(null);
    setEditItemidx(null);
  };

  return (
    <>
      {data &&
        data.map((grp, grpIndex) => (
          <div
            className="dnd-group"
            key={grpIndex}
            onDragEnter={
              dragging && !grp.items.length
                ? (e: any) => handleDragEnter(e, { grpIndex, itemIndex: 0 })
                : undefined
            }
          >
            <ListHeader
              grp={grp}
              grpIndex={grpIndex}
              data={data}
              setData={setData}
            />
            <ul>
              {grp.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  {editGroupIdx === grpIndex && editItemIdx === itemIndex ? (
                    <ItemFrom
                      type="editItem"
                      updateCardItemHandler={updateCardItemHandler}
                      cancelEditItemHandler={cancelEditItemHandler}
                      item={item}
                    />
                  ) : (
                    <li
                      draggable={!item.lock}
                      onDragStart={(e) =>
                        handleDragStart(e, { grpIndex, itemIndex })
                      }
                      onDragEnter={
                        dragging
                          ? (e) => handleDragEnter(e, { grpIndex, itemIndex })
                          : undefined
                      }
                      className={
                        dragging
                          ? getStyle({ grpIndex, itemIndex })
                          : "dnd-item"
                      }
                    >
                      <ListItem
                        item={item}
                        itemIndex={itemIndex}
                        grpIndex={grpIndex}
                        lockCardHandler={lockCardHandler}
                        deleteCardHandler={deleteCardHandler}
                        isUpdateCardItemHandler={isUpdateCardItemHandler}
                      />
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>

            <ListFooter grpIndex={grpIndex} data={data} setData={setData} />
          </div>
        ))}
    </>
  );
};

export default AllGroup;
