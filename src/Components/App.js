import React, {useState} from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home";
import About from "./About";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import Merch from "./Merch"
import NewMovie from "./NewMovie";
import Login from "./Login"
import EditUsers from "./EditUsers"

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [seen, setSeen] = useState(false)
  const [currentUser, setCurrentUser] = useState([])
  const admin = currentUser.admin

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
            {seen ? <Login toggle={togglePop} loggedIn={loggedIn} onLoggedIn={setLoggedIn} admin={admin} currentUser={currentUser} onCurrentUser={setCurrentUser}/> : null}
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
            <Route exact path="/editUsers">
                <EditUsers />
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
