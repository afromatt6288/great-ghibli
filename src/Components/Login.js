import React, {useState, useEffect} from "react";
import { useHistory, Redirect, NavLink } from "react-router-dom"

function Login ({toggle, loggedIn, onLoggedIn, admin, onAdmin, currentUser, onCurrentUser}) {
    const [users, setUsers] = useState([])    
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [invalidUser, setInvalidUser] = useState(false)
    
    


    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(r => r.json())
            .then(data => setUsers(data))
    }, [])
    console.log(users)
    const validUser = users.find((user)=> user.name === userName && user.password === password)

    function handleSubmit(e){
        e.preventDefault()
        if (validUser) {
            onCurrentUser(validUser)
        // {<Redirect to="/"/>}
        // window.location.replace("http://localhost:3000/")
        // history.push(`/`)
        onLoggedIn(e)
        toggle()
        console.log("Logging in")
        } else { 
        setInvalidUser(e=>setInvalidUser(!invalidUser))
        console.log("Invalid User")
    }
    }
    
  return (
   <div className="modal">
     <div className="modal_content">
        {loggedIn ? 
        <div>
        <h3>Hello {currentUser.name}</h3>
        <label> Admin </label>
        <input label="Admin" type="checkbox" readOnly checked={admin} />
        </div>
        :
        <form onSubmit={handleSubmit}>
            <input type="text" id="userName" placeholder="User Name" value={userName} onChange={e => setUserName(e.target.value) }/>
            <button type="click" onClick={(e)=>setIsPasswordSecure(!isPasswordSecure)}>Show Password</button>
            <input type={isPasswordSecure? "password" : "text"} id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            {/* <span toggle="#password-field" className="field-icon">Show Password</span> */}
            <br/>
            <button type="submit">Login</button>
            <br/>
        {invalidUser ? <small>Invalid User</small> : null}
        </form>}
        {/* <br/> */}
        {loggedIn ? 
        <button className="login-button" onClick={(e)=> onLoggedIn(!loggedIn)}>Log Out</button>
        : <NavLink exact to="/newUser">New User? Sign up here!</NavLink>}
        {/* <button className="admin" onClick={(e)=> onAdmin(!admin)}>{admin ? "Admin Off" : "Admin On"}</button>        */}
    </div>
   </div>
  );
 }

export default Login