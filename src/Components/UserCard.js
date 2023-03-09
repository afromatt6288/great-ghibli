import React, { useState } from "react";

function UserCard({user, onUserDelete}) {
    const {id, username, admin} = user
    const [isAdmin, setIsAdmin] = useState(admin);
    
    function handleUpdate(e) {
        e.preventDefault()
        const formData = {
            admin: !isAdmin
        }
        fetch(`http://localhost:3001/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then(data => {
            setIsAdmin(data.admin)
        })
    }

    function handleUserDelete() {
        fetch(`http://localhost:3001/users/${id}`, {
          method: "DELETE"
        })        
        onUserDelete(id)
    }    
   
    return (
        <div className ="users">
            <h3>{username}</h3>
            <label> Admin? <input type="checkbox" onChange={handleUpdate} checked={isAdmin}/></label>
            <button onClick={handleUserDelete}>Delete</button>
        </div>
    )
}

export default UserCard