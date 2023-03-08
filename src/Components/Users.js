import React from "react";
import UserCard from "./UserCard"

function Users({users, onUserDelete}) {

    console.log(users)    

    return (
        <section id="users">
            <h3 className="header">Users</h3>
            {users.map((user)=> (
            <UserCard user={user} onUserDelete={onUserDelete}/>
        ))}
        </section>
    )
}

export default Users