import React from "react";
import { NavLink } from "react-router-dom"
import Login from "./Login"
import Search from "./Search"

function NavBar({loggedIn, onLoggedIn, search, onSearchChange}) {
    return (
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink exact to="/movies">Movies</NavLink>
            <NavLink exact to="/movies/new">Add Movie</NavLink>
            <Search search={search} onSearchChange={onSearchChange}/>
            <Login loggedIn={loggedIn} onLoggedIn={onLoggedIn}/>
        </nav>
    );
}

export default NavBar;