import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import Search from "./Search"
import { Card } from "semantic-ui-react"

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("Alphabetical")
    const [filterBy, setFilterBy] = useState("All")
    
    useEffect(() => {
        fetch("http://localhost:3001/movies")
            .then(r => r.json())
            .then(data => setMovies(data))
    }, [])

    // handle my sort
    const sortedMovies = [...movies].sort((movie1, movie2) => {
    if (sortBy === "Title") {
     return movie1.title.localeCompare(movie2.title)
    } else if (sortBy === "Date") {
     return movie1.date - movie2.date
    }
   })

    // handle my filter
    
    
    
    // const allGenres = movies.map((movie)=> movie.genre)
    // const uniqueGenres = [...new Set(allGenres)]
    
    
    const genres = movies.map((movie)=> movie.genres.map ((genre) => genre))
    const allGenres = genres.map((genre)=> [...genres, genre])
    console.log(genres)
    console.log(allGenres)
    const filteredMovies = sortedMovies.filter((movie)=> filterBy === "All" ? sortedMovies : movie.genres === filterBy )

    // this is how I am handling the Search function
    const displayedMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()))
        
    return (
        <section id="movies">
            <h2 className="header">Ghibli Movies</h2>
            <div className="search-bar">
                <Search search={search} onSearchChange={setSearch} sortBy={sortBy} onSortChange={setSortBy} filterBy={filterBy} onHandleFilter={setFilterBy} genres={genres}/>
            </div>
            <div>
            <div className="movie-list">
            <Card.Group className="cards" itemsPerRow={6}>
                {displayedMovies.map((movie)=> (
                <MovieItem key={movie.id} movie={movie} />
                ))}
            </Card.Group>
            </div>
            </div>
        </section>
    );
}

export default MovieList;
