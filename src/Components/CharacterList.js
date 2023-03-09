import React, { useEffect, useState } from "react";
import CharacterItem from "./CharacterItem";
import CharacterSearch from "./CharacterSearch"
import { Card } from "semantic-ui-react"

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState("")
    const [filterBySpecies, setFilterBySpecies] = useState("All")
    const [filterByMovie, setFilterByMovie] = useState("All")
    
    useEffect(() => {
        fetch("http://localhost:3001/characters")
            .then(r => r.json())
            .then(data => {
                setCharacters(data)     
            })
        }, [])

    // set uniqueSpecies filter    
    const species = characters.map((character)=> character.species.name)
    const allSpecies = species.flat(1)
    const uniqueSpecies = [...new Set(allSpecies)]
   
    // set uniqueMovies filter   
    const films = characters.map((character)=> character.film.title)
    const allFilms = films.flat(1)
    const uniqueFilms = [...new Set(allFilms)]

    // Handle the dual filter output
    const filteredCharacters = characters.filter((character) => {
        const matchSpecies = filterBySpecies === "All" || character.species.name === filterBySpecies;
        const matchMovie = filterByMovie === "All" || character.film.title === filterByMovie;
        return matchSpecies && matchMovie;
      });

    // this is how I am handling the CharacterSearch function
    const displayedCharacters = filteredCharacters.filter(character => character.name.toLowerCase().includes(search.toLowerCase()))
        
    return (
        <section id="characters">
            <h2 className="header">Ghibli Characters</h2>
            <div className="search-bar">
                <CharacterSearch search={search} onSearchChange={setSearch} filterBySpecies={filterBySpecies} onHandleSpeciesFilter={setFilterBySpecies} filterByMovie={filterByMovie} onHandleMovieFilter={setFilterByMovie} species={uniqueSpecies} films={uniqueFilms}/>
            </div>
            <div>
            <div className="character-list">
                <Card.Group className="cards" itemsPerRow={6}>
                    {displayedCharacters.map((character)=> (
                    <CharacterItem key={character.id} character={character} />
                    ))}
                </Card.Group>
            </div>
            </div>
        </section>
    );
}

export default CharacterList;