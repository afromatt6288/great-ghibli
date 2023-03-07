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

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [admin, setAdmin] = useState(false)

  return (
    <div className={loggedIn ? "background-image-login" : "background-image-logout"}>
     <header className="app-header"> 
     <h1>Great Ghibli Bibli</h1>
     <h5>Ie: The Great Ghibli Bible</h5>
     <Login loggedIn={loggedIn} onLoggedIn={setLoggedIn} admin={admin} onAdmin={setAdmin}/>
     </header>
      {/* {loggedIn ? <MoviePage/> : <LandingPage />} */}
      <NavBar admin={admin} />
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
                <Route exact path="/movies/:id">
                    <MovieDetail admin={admin}/>
                </Route>
                <Route exact path="/merch">
                    <Merch />
                </Route>
                <Route path="*">
                    <h1>404 not found</h1>
                </Route>
            </Switch> : <h2>Please Log In</h2> }
    </div>
  );
}

export default App;
