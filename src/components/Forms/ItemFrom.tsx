import React, { useState } from "react";

const ItemFrom: React.FC<any> = ({
  type,
  item,
  updateCardItemHandler,
  cancelEditItemHandler,
  addGroupItemHandler,
  setShowAddCard,
}) => {
  const [title, setTitle] = useState(item ? item.title : "");

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length > 0 && title.length <= 40) {
      if (type === "editItem") {
        updateCardItemHandler(title);
      } else {
        addGroupItemHandler(title);
        setTitle("");
      }
    }
  };

  const cancelHandler = () => {
    if (type === "editItem") {
      cancelEditItemHandler();
    } else {
      setShowAddCard(true);
    }
  };

  return (
    <form className="form" onSubmit={formHandler}>
      <textarea
        rows={3}
        placeholder="Enter a title for the card.."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>
      <div className="btns">
        <button type="submit">
          {type === "editItem" ? "Edit Item" : "Add Item"}
        </button>
        <div className="cancel" onClick={cancelHandler}>
          X
        </div>
      </div>
    </form>
  );
};

export default ItemFrom;
