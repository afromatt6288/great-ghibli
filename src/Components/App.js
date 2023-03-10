import React, {useState, useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home";
import About from "./About";
import FilmList from "./FilmList";
import FilmDetail from "./FilmDetail";
import FilmNew from "./FilmNew";
import CharacterList from "./CharacterList"
import CharacterDetail from "./CharacterDetail";
import CharacterNew from "./CharacterNew"
import Merch from "./Merch"
import Login from "./Login"
import Users from "./Users"
import MusicPlayer from "./MusicPlayer"

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [seen, setSeen] = useState(false)
    const [currentUser, setCurrentUser] = useState([])  
    const admin = currentUser.admin
    
    // gather my User Data
    const [users, setUsers] = useState([]) 
    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(r => r.json())
            .then(data => {
                setUsers(data)
            })
    }, [])
        
    // Gather my Film Data
    const [films, setFilms] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/films")
            .then(r => r.json())
            .then(data => {
                setFilms(data)
            })
    }, [])

    // Gather my Character Data
    const [characters, setCharacters] = useState([]);    
    useEffect(() => {
        fetch("http://localhost:3001/characters")
            .then(r => r.json())
            .then(data => {
                setCharacters(data)     
            })
    }, [])

    // Gather my Species Data
    const [species, setSpecies] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/species")
            .then(r => r.json())
            .then(data => {
                setSpecies(data)     
            })
        }, [])
    
    // Gather my Vehicles Data
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/vehicles")
            .then(r => r.json())
            .then(data => {
                setVehicles(data)     
            })
        }, [])

    // Handle User Add & Delete
    function handleAddUser(addUser) {
        const updatedUsers = [...users, addUser]
        setUsers(updatedUsers);
    }

    function handleUserDelete(id) {
        const updatedUsers = users.filter(user => user.id !== id)
        setUsers(updatedUsers)
    }

    // Handle Film Add & Delete
    function handleFilmAdd(addFilm) {
        const updatedFilms = [...films, addFilm]
        setFilms(updatedFilms);
    }

    function handleFilmDelete(id) {
        const updatedFilms = films.filter(film => film.id !== id)
        setFilms(updatedFilms)
    }

    // Handle Login and registration Pop-up
    function togglePop () {
        setSeen(!seen);
    };

    return (
        <div className={loggedIn ? "background-image-login" : "background-image-logout"}>
            <header className="app-header"> 
            <h1>Great Ghibli Bibli</h1>
            <h5>Ie: The Great Ghibli Bible</h5>
            <MusicPlayer/>
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
                <Route exact path="/films">
                    <FilmList films={films}/>
                </Route>
                {admin ? 
                <Route exact path="/films/new">
                    <FilmNew onFilmAdd={handleFilmAdd}/>
                </Route> : null }
                <Route exact path="/films/:id">
                    <FilmDetail admin={admin} onFilmDelete={handleFilmDelete}/>
                </Route>
                <Route exact path="/characters">
                    <CharacterList films={films} characters={characters} species={species} vehicles={vehicles}/>
                </Route>
                {admin ? 
                <Route exact path="/characters/new">
                    <CharacterNew key={""}/>
                </Route> : null }
                <Route exact path="/characters/:id">
                    <CharacterDetail admin={admin}/>
                </Route>
                <Route exact path="/merch">
                    <Merch />
                </Route>
                {admin ? 
                <Route exact path="/users">
                    <Users users={users} onUserDelete={handleUserDelete}/>
                </Route> : null }
                <Route path="*">
                    <h1>404 not found</h1>
                </Route>
            </Switch> : null
            }
        </div>
    );
}

export default App;
