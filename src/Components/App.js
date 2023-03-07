import React, {useState} from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home";
import About from "./About";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import NewMovie from "./NewMovie";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)


  return (
    <div className={loggedIn ? "background-image-login" : "background-image-logout"}>
     <header className="app-header"> 
     <h1>Great Ghibli Bibli</h1>
     <h5>Ie: The Great Ghibli Bible</h5>
     </header>
      {/* {loggedIn ? <MoviePage/> : <LandingPage />} */}
      <NavBar loggedIn={loggedIn} onLoggedIn={setLoggedIn} />
      {loggedIn ? <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route exact path="/movies">
                    <MovieList />
                </Route>
                <Route path="/movies/new">
                    <NewMovie />
                </Route>
                <Route path="/movies/:id">
                    <MovieDetail />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="*">
                    <h1>404 not found</h1>
                </Route>
            </Switch> : <h2>Please Log In</h2> }
    </div>
  );
}

export default App;
