import React from "react";
import { RiDeleteBackFill } from "react-icons/ri";

const List = (props) => {
  console.log(props);
  return (
    <ul className="user-list">
      {props.data.map((person) => (
        <li key={person.id}>
          <Person {...person} removeItem={props.removeItem} />
        </li>
      ))}
    </ul>
  );
};

const Person = ({ id, nome, stato, img, removeItem }) => {
  return (
    <article>
      <img src={img} alt="person-img" className="person-img"></img>
      <div className="person-info">
        <div className="person-action">
          <h4>{nome}</h4>
          <button className="btn" onClick={() => removeItem(id)}>
            <RiDeleteBackFill className="icon" />
          </button>
        </div>
        <p>{stato}</p>
      </div>
    </article>
  );
};

export default List;
