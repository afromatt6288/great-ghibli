import React, {useState, useEffect} from "react";

function Login ({toggle, loggedIn, onLoggedIn, admin, onAdmin}) {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [users, setUsers] = useState([])


    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(r => r.json())
            .then(data => setUsers(data))
    }, [])
    console.log(users)


    function handleSubmit(e){
        e.preventDefault()
        console.log("Logging in")
    }
  function handleClick() {
   toggle();
  };

  return (
   <div className="modal">
     <div className="modal_content">
        <h2> Log In </h2>
        <form onSubmit={handleSubmit}>
            <input type="text" id="name" placeholder="User Name" value={name} onChange={e => setName(e.target.value)}/>
            <input type="text" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
        <button className="login-button" onClick={(e)=> onLoggedIn(!loggedIn)}>{loggedIn ? "Log Out" : "Log In"}</button>
        <button className="admin" onClick={(e)=> onAdmin(!admin)}>{admin ? "Admin Off" : "Admin On"}</button>
        <button className="close" onClick={handleClick}> Close </button>
    </div>
   </div>
  );
 }

export default Login