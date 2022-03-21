import React, { useState } from "react";
import { RiMoreFill } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import ListForm from "./Forms/ListFrom";

const ListHeader = ({ grp, grpIndex, data, setData }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const isEditHandler = (e) => {
    if (e.detail === 2) {
      setIsEdit(true);
    }
  };

  const editTitleHandler = (title) => {
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
        <ListForm
          type="editList"
          editTitleHandler={editTitleHandler}
          grp={grp}
          setIsEdit={setIsEdit}
        />
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
