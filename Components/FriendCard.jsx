import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import "./FriendCard.css";

const FriendCard = ({ viewer, user, onChange }) => {
  	const [isFollowing, setIsFollowing] = useState(false);

  	const fullName = (user.firstName || "") + " " + (user.lastName || "");
  	const showName = fullName || user?.username || "";

  	// Check follow status when viewer or user changes
  	useEffect(() => {
    	const getFollowers = async () => {
      		if (!viewer || !user?.username || viewer === user.username) {
				return;
			}
			const { data, error } = await supabase
        		.from("Accounts")
        		.select("following")
        		.eq("username", viewer)
        		.limit(1);

			// Checks if the logged in user follows so and so
      		if (!error) {
        		const arr = Array.isArray(data?.[0]?.following) ? data[0].following : [];
        		setIsFollowing(arr.includes(user.username));
      		}
    	};
    	getFollowers();
    }, [viewer, user?.username]);

  	const followUser = async () => {
		// Gets the following list of the currently logged in user
    	const { data: viewerAcc } = await supabase
      		.from("Accounts")
      		.select("following")
    		.eq("username", viewer)
    		.limit(1);

    	const myFollowing = Array.isArray(viewerAcc?.[0]?.following) ? viewerAcc[0].following : [];
    	if (!myFollowing.includes(user.username)) 
		{
			myFollowing.push(user.username);
		}
    	await supabase
      		.from("Accounts")
      		.update({ following: myFollowing })
      		.eq("username", viewer);

    	// Gets the followers list of the target user
    	const { data: targetAcc } = await supabase
      		.from("Accounts")
      		.select("followers")
      		.eq("username", user.username)
      		.limit(1);

    	const theirFollowers = Array.isArray(targetAcc?.[0]?.followers) ? targetAcc[0].followers : [];
    	if (!theirFollowers.includes(viewer)) 
		{
			theirFollowers.push(viewer);
		}

		// Update backend
    	await supabase
      		.from("Accounts")
      		.update({followers: theirFollowers})
      		.eq("username", user.username);

    	setIsFollowing(true);
    	onChange?.();
  	};

  	const unfollowUser = async () => {
		// Gets the following list of the currently logged in user
    	const { data: viewerAcc } = await supabase
      		.from("Accounts")
      		.select("following")
      		.eq("username", viewer)
      		.limit(1);

		// Remove acc from the following list of the currently logged in user & updates backend
    	const myFollowing = (viewerAcc?.[0]?.following || []).filter((u) => u !== user.username);
    	await supabase
      		.from("Accounts")
      		.update({ following: myFollowing })
      		.eq("username", viewer);

    	// Gets the followers list of the target user
    	const { data: targetAcc } = await supabase
      		.from("Accounts")
      		.select("followers")
      		.eq("username", user.username)
      		.limit(1);
		
		// Removes the currently logged in user from the targets followers list & updates backend
    	const theirFollowers = (targetAcc?.[0]?.followers || []).filter((u) => u !== viewer);
    	await supabase
      		.from("Accounts")
      		.update({ followers: theirFollowers })
      		.eq("username", user.username);

    	setIsFollowing(false);
    	onChange?.();
  	};

  	const handleToggle = () => {
  		if (isFollowing) 
		{
    		unfollowUser();
  		} 
		else 
		{
    		followUser();
  		}
	};
  	const showButton = viewer && user?.username && viewer !== user.username;

  	return (
    	<div className = "accountCard">
      		<div className = "accountInfo">
        		<div className={`accountPFP ${user?.pfp ? "" : "placeholder"}`}>
          			{user?.pfp ? (
            		<img className = "pfp" src = {user.pfp} alt={`${showName} avatar`}/>
          				) : (
            		(showName || "U").slice(0, 1).toUpperCase()
          			)}
        		</div>

        		<div className = "accountInfoText">
          			<div className = "accountFirstName">
						{showName}
					</div>
          			<div className = "accountUsername"> 
						@{user?.username} 
					</div>
        		</div>
      		</div>
			
			{/* FOLLOW/UNFOLLOW BUTTONS */}
      		{showButton && (
        	<button className={`toggle ${isFollowing ? "unfollow" : "follow"}`} onClick={handleToggle}>
          		{isFollowing ? "Unfollow" : "Follow"}
        	</button>
      		)}
    	</div>
  	);
};

export default FriendCard;