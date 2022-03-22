import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { TiLockClosedOutline, TiLockOpenOutline } from "react-icons/ti";
import { IItem } from "./KanbanBoard";

interface IProps {
  item: IItem;
  itemIndex: number;
  grpIndex: number;
  lockCardHandler: Function;
  deleteCardHandler: Function;
  isUpdateCardItemHandler: Function;
}

const ListItem: React.FC<IProps> = ({
  item,
  itemIndex,
  grpIndex,
  lockCardHandler,
  deleteCardHandler,
  isUpdateCardItemHandler,
}) => {
  const [isDeleteItem, setIsDeleteItem] = useState(false);

  return (
    <>
      <p onClick={(e) => isUpdateCardItemHandler(e, grpIndex, itemIndex)}>
        {item.title}
      </p>
      <div className="icons">
        <div
          className="lock"
          onClick={() => lockCardHandler(grpIndex, itemIndex)}
        >
          {item.lock ? <TiLockClosedOutline /> : <TiLockOpenOutline />}
        </div>
        <div
          className="more-option"
          onClick={() => setIsDeleteItem(!isDeleteItem)}
        >
          <FiMoreVertical />
          {isDeleteItem && (
            <ul>
              <li onClick={() => deleteCardHandler(grpIndex, itemIndex)}>
                Delete
                <AiOutlineDelete />
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default ListItem;
