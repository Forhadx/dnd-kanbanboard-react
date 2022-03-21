import React, { useState } from "react";
import ItemFrom from "./Forms/ItemFrom";

const ListFooter = ({ grpIndex, data, setData }) => {
  const [showAddCard, setShowAddCard] = useState(true);

  const addGroupItemHandler = (title) => {
    let newData = data;
    newData[grpIndex].items.push({ title: title, lock: false });
    localStorage.setItem("data", JSON.stringify(newData));
    setData([...newData]);
  };

  return (
    <div className="list-footer">
      {showAddCard ? (
        <div className="add-card" onClick={() => setShowAddCard(false)}>
          + Add a card
        </div>
      ) : (
        <ItemFrom
          type="addItem"
          addGroupItemHandler={addGroupItemHandler}
          setShowAddCard={setShowAddCard}
        />
      )}
    </div>
  );
};

export default ListFooter;
