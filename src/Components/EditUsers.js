import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function EditUsers() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    const history = useHistory();
    
    function handleSubmit(e) {
        e.preventDefault()
        const formData = {
                name: userName,
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
    }
    

    return (
        <section id="form">
            <h3 className="header">Edit Users</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" id="userName" placeholder="Name" value={userName} onChange={e => setUserName(e.target.value)} />
                <input type="text" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default EditUsers