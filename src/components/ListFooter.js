import React, { useState } from "react";

const ListFooter = ({ grpIndex, data, setData }) => {
  const [cardTitle, setCardTitle] = useState("");
  const [showAddCard, setShowAddCard] = useState(true);

  const addGroupItemHandler = (e) => {
    e.preventDefault();
    if (cardTitle.length < 40) {
      let newData = data;
      newData[grpIndex].items.push({ title: cardTitle, lock: false });
      localStorage.setItem("data", JSON.stringify(newData));
      setData([...newData]);
      setCardTitle("");
    }
  };

  return (
    <div className="list-footer">
      {showAddCard ? (
        <div className="add-card" onClick={() => setShowAddCard(false)}>
          + Add a card
        </div>
      ) : (
        <form className="form" onSubmit={addGroupItemHandler}>
          <textarea
            rows="3"
            placeholder="Enter a title for the card.."
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          ></textarea>
          <div className="btns">
            <button type="submit">Add card</button>
            <div className="cancel" onClick={() => setShowAddCard(true)}>
              X
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ListFooter;
