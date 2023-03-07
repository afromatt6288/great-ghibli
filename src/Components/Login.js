import React from "react";

function Login({loggedIn, onLoggedIn}) {
    return (
        <button className="login" onClick={(e)=> onLoggedIn(!loggedIn)}>{loggedIn ? "Log Out" : "Log In"}</button>
    );
}

export default Login;