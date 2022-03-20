import React from "react";

const CardForm = () => {
  return (
    <form className="form">
      <textarea rows="3" placeholder="Enter a title for the card.."></textarea>
      <div className="btns">
        <button type="submit">Add card</button>
        <div className="cancel">X</div>
      </div>
    </form>
  );
};

export default CardForm;
