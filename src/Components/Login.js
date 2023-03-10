import React, {useState} from "react";
import { useHistory } from "react-router-dom"
import NewUser from "./NewUser"

function Login ({toggle, loggedIn, onLoggedIn, admin, onAdmin, currentUser, onCurrentUser, users, onAddUser}) {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [invalidUser, setInvalidUser] = useState(false)
    const [newUser, setNewUser] = useState(false)
    
    const history = useHistory()
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

    function handleNewUser(addUser){
        onAddUser(addUser)
        setNewUser(!newUser)
    }

    return (
        <div className="modal">
            <div className="modal_content">
                {loggedIn ? 
                <div className="admin">
                    <h4>{currentUser.username}</h4>
                    <label> Admin </label>
                    <input label="Admin" type="checkbox" readOnly checked={admin} />
                </div>
                : newUser ? <NewUser onNewUser={handleNewUser} toggle={toggle}/> :
                <form onSubmit={handleSubmit}>
                    <input type="text" id="userName" placeholder="User Name" value={userName} onChange={e => setUserName(e.target.value) }/>
                    <input type={isPasswordSecure? "password" : "text"} id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <span className="show-password-button"><input label="show-password" type="checkbox" checked={!isPasswordSecure} onChange={(e)=>setIsPasswordSecure(!isPasswordSecure)}/> Show</span>
                    <br/>
                    <button type="submit">Login</button>
                <   br/>
                    {invalidUser ? <small>Invalid User</small> : null}
                    <button className="new-user-button" onClick={e=>setNewUser(!newUser)}>New User? Sign up here!</button> 
                </form>}
                {loggedIn ? 
                <button className="login-button" onClick={(e)=> onLoggedIn(!loggedIn)} >Log Out</button>
                : null}
            </div>
        </div>
    );
 }

export default Login




