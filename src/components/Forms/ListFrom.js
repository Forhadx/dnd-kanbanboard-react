import React, { useState } from "react";

const ListForm = ({
  type,
  grp,
  setIsEdit,
  editTitleHandler,
  setHideAddGrp,
  setIsAddGroup,
  addTitleHandler,
}) => {
  const [title, setTitle] = useState(grp ? grp.title : "");

  const formHandler = (e) => {
    e.preventDefault();
    if (title.length > 0 && title.length <= 20) {
      if (type === "editList") {
        editTitleHandler(title);
      } else {
        addTitleHandler(title);
        setTitle("");
      }
    }
  };

  const cancelHandler = () => {
    if (type === "editList") {
      setIsEdit(false);
    } else {
      setIsAddGroup(false);
      setHideAddGrp(false);
    }
  };

  return (
    <form className="form" onSubmit={formHandler}>
      <input
        type="text"
        placeholder="Enter list title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="btns">
        <button type="submit">
          {type === "editList" ? "Edit List" : "Add List"}
        </button>
        <div className="cancel" onClick={cancelHandler}>
          X
        </div>
      </div>
    </form>
  );
};

export default ListForm;
