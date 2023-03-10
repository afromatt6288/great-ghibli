import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import MovieSearch from "./MovieSearch"
import { Card } from "semantic-ui-react"

function MovieList({movies}) {
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("Alphabetical")
    const [filterBy, setFilterBy] = useState("All")

    // handle my Movie sort
    const sortedMovies = [...movies].sort((movie1, movie2) => {
        if (sortBy === "Alphabetical") {
            return movie1.title.localeCompare(movie2.title)
        } else if (sortBy === "Date") {
            const dateA = new Date(movie1.release_date);
            const dateB = new Date(movie2.release_date);
            return dateA.getTime() - dateB.getTime();
        }
        return console.log('error on sort')
    })

    // handle my Genre filter    
    const genres = movies.map((movie)=> movie.genres)
    const allGenres = genres.flat(1)
    const uniqueGenres = [...new Set(allGenres)]
    const filteredMovies = sortedMovies.filter((movie)=> filterBy === "All" ? sortedMovies : movie.genres[0] === filterBy || movie.genres[1] === filterBy )

    // this is how I am handling the MovieSearch function
    const displayedMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()))
        
    return (
        <section id="movies">
            <h2 className="header">Ghibli Movies</h2>
            <div className="search-bar">
                <MovieSearch search={search} onSearchChange={setSearch} sortBy={sortBy} onSortChange={setSortBy} filterBy={filterBy} onHandleFilter={setFilterBy} genres={uniqueGenres}/>
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
