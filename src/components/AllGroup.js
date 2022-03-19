import React, { useState, useRef, useEffect } from "react";
import ListFooter from "./ListFooter";
import ListHeader from "./ListHeader";

const AllGroup = ({ data, setData }) => {
  const [dragging, setDragging] = useState(false);

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
            <ListHeader grp={grp} />
            <ul>
              {grp.items.map((item, itemIndex) => (
                <li
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, { grpIndex, itemIndex })
                  }
                  onDragEnter={
                    dragging
                      ? (e) => handleDragEnter(e, { grpIndex, itemIndex })
                      : null
                  }
                  className={
                    dragging ? getStyle({ grpIndex, itemIndex }) : "dnd-item"
                  }
                  key={itemIndex}
                >
                  <p>{item.title}</p>
                </li>
              ))}
            </ul>

            <ListFooter grpIndex={grpIndex} data={data} setData={setData} />
          </div>
        ))}
    </>
  );
};

export default AllGroup;