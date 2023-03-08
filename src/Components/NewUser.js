import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewUser({onNewUser, toggle}) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    const history = useHistory();
    
    function handleSubmit(e) {
        e.preventDefault()
        const formData = {
                username: userName,
                password: password,
                admin: false
        }
        fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(data => {
                history.push(`/`)
            })
            toggle()
    }    

    return (
        <section id="form">
            <form className="user-signup" onSubmit={handleSubmit}>
                <p> Welcome New User <br/> Create Account Below!</p>
                <input type="text" id="userName" placeholder="Set User Name" value={userName} onChange={e => setUserName(e.target.value)} />
                <br/>
                <input type="text" id="password" placeholder="Set Password" value={password} onChange={e => setPassword(e.target.value)} />
                <br/>
                <button type="submit">Create New Profile</button>
                <button className="new-user-button" onClick={onNewUser}>Returning User? Login!</button>
            </form>
        </section>
    )
}

export default NewUser