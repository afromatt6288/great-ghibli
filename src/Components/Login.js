import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom"
import NewUser from "./NewUser"

function Login ({toggle, loggedIn, onLoggedIn, admin, onAdmin, currentUser, onCurrentUser}) {
    const history = useHistory()
    const [users, setUsers] = useState([])    
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [invalidUser, setInvalidUser] = useState(false)
    const [newUser, setNewUser] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(r => r.json())
            .then(data => setUsers(data))
    }, [])
    const validUser = users.find((user)=> user.username === userName && user.password === password)

    function handleSubmit(e){
        e.preventDefault()
        if (validUser) {
            onCurrentUser(validUser)
            history.push(`/`)
            onLoggedIn(e)
            toggle()
        } else { 
            setInvalidUser(e=>setInvalidUser(!invalidUser))
        }
    }

  return (
   <div className="modal">
        <div className="modal_content">
            {loggedIn ? 
            <div>
                <h4>{currentUser.username}</h4>
                <label> Admin </label>
                <input label="Admin" type="checkbox" readOnly checked={admin} />
            </div>
            : newUser ? <NewUser onNewUser={e=>setNewUser(!newUser)} toggle={toggle}/> :
            <form onSubmit={handleSubmit}>
                <input type="text" id="userName" placeholder="User Name" value={userName} onChange={e => setUserName(e.target.value) }/>
                <input type={isPasswordSecure? "password" : "text"} id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <span className="show-button"><input label="show-password" type="checkbox" checked={!isPasswordSecure} onChange={(e)=>setIsPasswordSecure(!isPasswordSecure)}/> Show</span>
                <br/>
                <button type="submit">Login</button>
                <br/>
                {invalidUser ? <small>Invalid User</small> : null}
            </form>}
            {loggedIn ? 
            <button className="login-button" onClick={(e)=> onLoggedIn(!loggedIn)} >Log Out</button>
            : <button className="new-user-button" onClick={e=>setNewUser(!newUser)}>New User? Sign up here!</button> }
        </div>
   </div>
  );
 }

export default Login




