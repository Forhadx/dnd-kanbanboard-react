import React, { useState } from "react";
import { RiMoreFill } from "react-icons/ri";

const ListHeader = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const isEditHandler = (e) => {
    if (e.detail === 2) {
      setIsEdit(true);
    }
  };
  return (
    <>
      {isEdit ? (
        <form
          className="form"
          //  onSubmit={addTitleHandler}
        >
          <input
            type="text"
            placeholder="Enter list title"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
          />
          <div className="btns">
            <button type="submit">Add list</button>
            <div className="cancel" onClick={() => setIsEdit(false)}>
              X
            </div>
          </div>
        </form>
      ) : (
        <div className="lists-title" onClick={isEditHandler}>
          <h5>{props.grp.title}</h5>
          <div>
            <RiMoreFill />
          </div>
        </div>
      )}
    </>
  );
};

export default ListHeader;
