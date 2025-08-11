import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { supabase } from "../client";
import './Account.css';

const Account = () => {
    const [username, setUsername] = useState("");

    const [pfp, setPfp] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [calorieGoal, setCalorieGoal] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const parsedUser = storedUser ? JSON.parse(storedUser) : {};
        const username_ = parsedUser.username || '';
        setUsername(username_);

        const fetchAccountInfo = async () => {
            if (!username_) return;

            // Fetch info from Accounts table
            const { data, error } = await supabase
                .from("Accounts")
                .select("pfp, first_name, last_name")
                .eq("username", username_)
                .limit(1)
                .single();

            if (!error && data) 
            {
                setPfp(data.pfp || "");
                setFirstName(data.first_name || "");
                setLastName(data.last_name || "");
            }
            
            // Fetch info from Stats table, specifically Calorie Goal
            const { data: statsRow } = await supabase
                .from("Stats")
                .select("calorieGoal")
                .eq("username", username_)
                .limit(1)
                .single();
            if (statsRow) 
            {
                setCalorieGoal(statsRow.calorieGoal ?? "");
            }
        };
        fetchAccountInfo();
    }, []);

    // Update ACCOUNT TABLE in backend after saving changes
    const updateAccount = async () => {
        // First name can not be empty
        if (!firstName.trim()) 
        {
            alert("Your first name can NOT be blank!");
            return;
        }
        await supabase
            .from("Accounts")
            .update({
                pfp: pfp,
                first_name: firstName,
                last_name: lastName
            })
        .eq("username", username);
        
        // Update STATS TABLE in backend after saving changes
        const parsedGoal = calorieGoal === "" ? null : Number(calorieGoal);
        await supabase
            .from('Stats')
            .update({
                first_name: firstName,
                calorieGoal: parsedGoal,
            })
            .eq('username', username);
        
        // Update LOCALLY SAVED info
        const storedUser = localStorage.getItem("user");
        const parsedUser = storedUser ? JSON.parse(storedUser) : {};
        const updatedUser = {...parsedUser, pfp, first_name: firstName, last_name: lastName};
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Account Updated Successfully!")
    };

    return (
        <> 
            <div className = "accountSettings">
                {/* IMPORT NAVBAR COMPONENT */}
                <div className = "navDiv">
                    <Navbar />
                </div>

                {/* CONTENT TEXT */}
                <div className = "settingsContent">
                    <h1 className = "settingsTitle"> Account Settings: </h1>
                    <div className = "settingsDiv"> 

                        {/* EDIT PFP */}
                        <div className = "settingColumn">
                            <label className = "changeTitle"> Profile Picture: </label>
                            <input
                                type = "text"
                                value = {pfp}
                                onChange = {(e) => setPfp(e.target.value)}
                                placeholder = "Image URL"
                            />
                        </div>                  
                        
                        {/* EDIT FIRST NAME */}
                        <div className = "settingColumn">
                            <label className = "changeTitle"> First Name: </label>
                            <input
                                type = "text"
                                value = {firstName}
                                onChange = {(e) => setFirstName(e.target.value)}
                                placeholder = "First Name"
                                required
                            />
                        </div>
                        
                        {/* EDIT LAST NAME */}
                        <div className = "settingColumn">
                            <label className = "changeTitle"> Last Name: </label>
                            <input
                                type = "text"
                                value = {lastName}
                                onChange = {(e) => setLastName(e.target.value)}
                                placeholder = "Last Name"
                            />
                        </div>

                        {/* EDIT CALORIE GOAL */}
                        <div className = "settingColumn">
                            <label className = "changeTitle"> Calorie Goal: </label>
                            <input
                                type = "number"
                                value = {calorieGoal}
                                onChange = {(e) => setCalorieGoal(e.target.value)}
                                placeholder = "Ex: 2000"
                            />
                        </div>
                        
                        {/* SAVE CHANGES BUTTON */}
                        <button className = "saveButton" onClick={updateAccount}> Save Changes </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Account;