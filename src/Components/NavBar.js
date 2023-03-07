import React from "react";
import { NavLink } from "react-router-dom"

function NavBar({admin}) {
    return (
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/about">About</NavLink>
            <NavLink exact to="/movies">Movies</NavLink>
            <NavLink exact to="/merch">Merch</NavLink>
            {admin ? <NavLink exact to="/movies/new">Add Movie</NavLink> : null }            
        </nav>
    );
}

export default NavBar;