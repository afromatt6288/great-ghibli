import React, { useState, useEffect } from "react";

function Login({loggedIn, onLoggedIn, admin, onAdmin}) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(r => r.json())
            .then(data => setUsers(data))
    }, [])
    console.log(users)
    
    return (
        <div>
        <button className="login" onClick={(e)=> onLoggedIn(!loggedIn)}>{loggedIn ? "Log Out" : "Log In"}</button>
        <br/>
        <button className="admin" onClick={(e)=> onAdmin(!admin)}>{admin ? "Admin Off" : "Admin On"}</button>
        </div>
    );
}

export default Login;