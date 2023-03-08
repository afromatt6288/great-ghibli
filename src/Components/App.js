import React, {useState, useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home";
import About from "./About";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import Merch from "./Merch"
import NewMovie from "./NewMovie";
import Login from "./Login"
import Users from "./Users"

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [seen, setSeen] = useState(false)
    const [currentUser, setCurrentUser] = useState([])  
    const [users, setUsers] = useState([]) 
    const admin = currentUser.admin

    useEffect(() => {
        fetch("http://localhost:3001/users")
        .then(r => r.json())
        .then(data => setUsers(data))
    }, [])

    function handleAddUser(addUser) {
        const updatedUsers = [...users, addUser]
        setUsers(updatedUsers);
    }

    function handleUserDelete(id) {
        const updatedUsers = users.filter(user => user.id !== id)
        setUsers(updatedUsers)
    }

    function togglePop () {
        setSeen(!seen);
    };

    return (
        <div className={loggedIn ? "background-image-login" : "background-image-logout"}>
            <header className="app-header"> 
            <h1>Great Ghibli Bibli</h1>
            <h5>Ie: The Great Ghibli Bible</h5>
            <div>
                <button className="login" onClick={togglePop} >{loggedIn ? "Profile" : "Log In"}</button>
                {seen ? <Login toggle={togglePop} loggedIn={loggedIn} onLoggedIn={setLoggedIn} admin={admin} currentUser={currentUser} onCurrentUser={setCurrentUser} users={users} onAddUser={handleAddUser}/> : null}
            </div>
            </header>
            {loggedIn ? <NavBar admin={admin} /> : seen ? null : <h2 className="please">Please Log In</h2>}
            {loggedIn ? <Switch>
                <Route exact path="/">
                 <Home />
                </Route>
                <Route exact path="/about">
                <About />
                </Route>
                <Route exact path="/movies">
                    <MovieList />
                </Route>
                {admin ? 
                <Route exact path="/movies/new">
                    <NewMovie />
                </Route> : null }
                {admin ? 
                <Route exact path="/users">
                    <Users users={users} onUserDelete={handleUserDelete}/>
                </Route> : null }
                <Route exact path="/movies/:id">
                    <MovieDetail admin={admin}/>
                </Route>
                <Route exact path="/merch">
                    <Merch />
                </Route>
                <Route path="*">
                    <h1>404 not found</h1>
                </Route>
            </Switch> : null
            }
        </div>
    );
}

export default App;
