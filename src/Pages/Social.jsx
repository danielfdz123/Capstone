import React, { useEffect, useState } from "react";
import FriendCard from "../../Components/FriendCard";
import "./Social.css";
import Navbar from '../../Components/Navbar';
import {supabase} from '../client';

const Social = () => {
  	// const [selectedDate, setSelectedDate] = useState('');
  	const [username, setUsername] = useState('');
  	const [showModal, setShowModal] = useState(false);
  	const [query, setQuery] = useState("");
  
  	const [viewMode, setViewMode] = useState("all"); 
  	const [accounts, setAccounts] = useState([]);

 	useEffect(() => {
    	const storedUser = localStorage.getItem('user');
		const parsedUser = storedUser ? JSON.parse(storedUser) : {};
		const username_ = parsedUser.username || '';
    	setUsername(username_);

    	const modalFlagKey = `socialModalShown_${username_}`;
    	const modalShown = localStorage.getItem(modalFlagKey);
    	if (!modalShown && username_) 
    	{
      	setShowModal(true);
      	localStorage.setItem(modalFlagKey, 'true');
    	}

    	if (!username) {
    	  return;
    	}
    	fetchAccounts();
  	}, [viewMode, username]);


  	const fetchAccounts = async () => {
    	let { data, error } = await supabase
      	.from("Accounts")
      	.select("pfp, username, first_name, last_name, following, followers");

    	// Change the viewing based on if "all accounts", "following", and "followers" are selected
    	if (viewMode === "following") 
    	{
      		const myAccount = data.find(a => a.username === username);
      		const myFollowing = myAccount?.following || [];
      		data = data.filter(a => myFollowing.includes(a.username));
    	} 
    	else if (viewMode === "followers") 
    	{
      		const myAccount = data.find(a => a.username === username);
      		const myFollowers = myAccount?.followers || [];
      		data = data.filter(a => myFollowers.includes(a.username));
    	}
    	setAccounts(data.filter(a => a.username !== username));
  		};

  		// filter by search query
  		const filteredAccounts = accounts.filter(acc => {
    		const fullName = `${acc.first_name || ""} ${acc.last_name || ""}`.toLowerCase();
    		return (
      			acc.username.toLowerCase().includes(query.toLowerCase()) ||
      			fullName.includes(query.toLowerCase())
    		);
  		});

  		return (
    	<>
      	{showModal && (
        	<div className = "welcomeDiv">
          		<div className = "welcomeMsg">
            		<h1> 👥 Welcome to the Social Page! 👥 </h1>
					<p> Connect with your friends! </p>
            		<p> Here you can follow/unfollow people and stay connected! </p>
					<p> You can either filter through all accounts, your following, and your followers! </p>
            		<button onClick={() => setShowModal(false)}> Awesome! </button>
          		</div>
        	</div>
      	)}

      	<div className="social-page">
          	{/* IMPORT NAVBAR COMPONENT */}
            <div className = "navDiv">
                <Navbar />
            </div>

        	<div className = " socialContent">
        	  	{/* SEARC BAR + VIEW SOCIAL PAGE STUFF */}
        	  	<div className = "searchViewDiv">
        	    	<input
        	      		className = "searchBar"
        	      		type = "text"
        	      		placeholder = "Search users..."
        	      		onChange={(e) => setQuery(e.target.value)}
        	    	/>
        	    	<div className = "viewDiv">

						{/* VIEW ALL */}
        	      		<button
        	        		className = {`viewButtons ${viewMode === "all" ? "active" : ""}`}
        	        		onClick={() => setViewMode("all")}
        	      		>
        	        	All Accounts
        	      		</button>

						{/* VIEW FOLLOWING */}
        	      		<button
        	        		className = {`viewButtons ${viewMode === "following" ? "active" : ""}`}
        	        		onClick={() => setViewMode("following")}
        	      		>
        	        	Following
        	      		</button>

						{/* VIEW FOLLOWERS*/}
        	      		<button
        	        		className = {`viewButtons ${viewMode === "followers" ? "active" : ""}`}
        	        		onClick={() => setViewMode("followers")}
        	      		>
        	        	Followers
        	      		</button>
        	    	</div>
        	  	</div>

        	  	{/* VIEWING ALL/FOLLOWING/FOLLOWERS STUFF */}
        	  	<div className = "viewAccounts">
        	    	{filteredAccounts.length > 0 ? (
        	      		filteredAccounts.map((acc, i) => (
        	        	<FriendCard
        	        	  	key = {i}
        	        	  	viewer = {username}
        	        	  	user = {{
        	        	    	username: acc.username,
								firstName: acc.first_name,
								lastName: acc.last_name,
        	            		pfp: acc.pfp
        	          		}}
        	          		onChange={fetchAccounts}
        	        	/>
        	      		))
        	    	) : (
        	      	<h3 className = "noUsersFound"> No users found. </h3>
        	    	)}
        	  	</div>
        	</div>
      	</div>
    </>
  );
};

export default Social;