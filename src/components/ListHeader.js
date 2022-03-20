import React, { useState } from "react";
import { RiMoreFill } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";

const ListHeader = ({ grp, grpIndex, data, setData }) => {
  const [title, setTitle] = useState(grp.title);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const isEditHandler = (e) => {
    if (e.detail === 2) {
      setIsEdit(true);
    }
  };

  const editTitleHandler = (e) => {
    e.preventDefault();
    let newData = data;
    newData[grpIndex].title = title;
    setData([...newData]);
    localStorage.setItem("data", JSON.stringify(newData));
    setIsEdit(false);
  };

  const groupDeleteHandler = () => {
    let newData = data;
    newData.splice(grpIndex, 1);
    setData([...newData]);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  return (
    <>
      {isEdit ? (
        <form className="form" onSubmit={editTitleHandler}>
          <input
            type="text"
            placeholder="Update list title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="btns">
            <button type="submit">update</button>
            <div className="cancel" onClick={() => setIsEdit(false)}>
              X
            </div>
          </div>
        </form>
      ) : (
        <div className="lists-title">
          <h5 onClick={isEditHandler}>{grp.title}</h5>
          <div className="more-option" onClick={() => setIsDelete(!isDelete)}>
            <RiMoreFill />
            {isDelete && (
              <ul>
                <li onClick={groupDeleteHandler}>
                  Delete
                  <AiOutlineDelete />
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ListHeader;
