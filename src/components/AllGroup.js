import React, { useState, useRef } from "react";
import CardForm from "./Forms/CardForm";
import ListFooter from "./ListFooter";
import ListHeader from "./ListHeader";

import ListItem from "./ListItem";

const AllGroup = ({ data, setData }) => {
  const [dragging, setDragging] = useState(false);
  const [editItemIdx, setEditItemidx] = useState(null);
  const [editGroupIdx, setEditGroupidx] = useState(null);

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handlerDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
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

  const getStyle = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem.grpIndex === params.grpIndex &&
      currentItem.itemIndex === params.itemIndex
    ) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  const lockCardHandler = (grpIndex, itemIndex) => {
    let newData = data;
    if (newData[grpIndex].items[itemIndex].lock === true) {
      newData[grpIndex].items[itemIndex].lock = false;
    } else {
      newData[grpIndex].items[itemIndex].lock = true;
    }
    setData([...newData]);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  const deleteCardHandler = (grpIndex, itemIndex) => {
    let newData = data;
    newData[grpIndex].items.splice(itemIndex, 1);
    setData([...newData]);
    localStorage.setItem("data", JSON.stringify(newData));
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
                ? (e) => handleDragEnter(e, { grpIndex, itemIndex: 0 })
                : null
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
                    <CardForm />
                  ) : (
                    <li
                      draggable={!item.lock}
                      onDragStart={(e) =>
                        handleDragStart(e, { grpIndex, itemIndex })
                      }
                      onDragEnter={
                        dragging
                          ? (e) => handleDragEnter(e, { grpIndex, itemIndex })
                          : null
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
                        setEditGroupidx={setEditGroupidx}
                        setEditItemidx={setEditItemidx}
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
