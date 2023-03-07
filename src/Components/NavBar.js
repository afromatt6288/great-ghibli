import React from "react";
import { NavLink } from "react-router-dom"
import Login from "./Login"

function NavBar({loggedIn, onLoggedIn}) {
    return (
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/about">About</NavLink>
            <NavLink exact to="/movies">Movies</NavLink>
            <NavLink exact to="/merch">Merch</NavLink>
            <NavLink exact to="/movies/new">Add Movie</NavLink>
            <Login loggedIn={loggedIn} onLoggedIn={onLoggedIn}/>
        </nav>
    );
}

export default NavBar;