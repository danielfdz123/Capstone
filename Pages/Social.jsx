// Pages/Social.jsx
import React, { useState } from "react";
import FriendCard from "../Components/FriendCard";
import "./Social.css";

const Social = () => {
  // initial hard‑coded suggestions
  const suggestedList = ["Taki", "Afif", "Daniel", "Kevin", "Jason", "Alpha"];
  
  // state for your friends and remaining suggestions
  const [friends, setFriends] = useState([]);
  const [suggested, setSuggested] = useState(suggestedList);

  // state for search query
  const [query, setQuery] = useState("");

  // handle adding a friend
  const handleAdd = (name) => {
    setFriends((old) => [...old, name]);
    setSuggested((old) => old.filter((n) => n !== name));
  };

  // filter suggestions by search query
  const filtered = suggested.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="social-page">
      <h2>Your Friends</h2>
      <div className="friend-list">
        {friends.length
          ? friends.map((n) => <FriendCard key={n} name={n} />)
          : <p>No friends yet</p>
        }
      </div>

      <h2>Find Friends</h2>
      {/* Search bar */}
      <input
        className="friend-search"
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="friend-list">
        {filtered.length
          ? filtered.map((n) => (
              <FriendCard
                key={n}
                name={n}
                onAdd={() => handleAdd(n)}
              />
            ))
          : <p>No matching users</p>
        }
      </div>
    </div>
  );
};

export default Social;
