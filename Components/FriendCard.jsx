import React from "react";
import "./FriendCard.css";

const FriendCard = ({ name, onAdd }) => (
  <div className="friend-card">
    <p>{name}</p>
    <button onClick={onAdd}>Add Friend</button>
  </div>
);

export default FriendCard;
