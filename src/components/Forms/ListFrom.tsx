import React, { useState } from "react";

const ListForm: React.FC<any> = ({
  inputType,
  grp,
  setIsEdit,
  editTitleHandler,
  setHideAddGrp,
  setIsAddGroup,
  addTitleHandler,
}) => {
  const [title, setTitle] = useState<string>(grp ? grp.title : "");

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length > 0 && title.length <= 20) {
      if (inputType === "editList") {
        editTitleHandler(title);
      } else {
        addTitleHandler(title);
        setTitle("");
      }
    }
  };

  const cancelHandler = () => {
    if (inputType === "editList") {
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
          {inputType === "editList" ? "Edit List" : "Add List"}
        </button>
        <div className="cancel" onClick={cancelHandler}>
          X
        </div>
      </div>
    </form>
  );
};

export default ListForm;
