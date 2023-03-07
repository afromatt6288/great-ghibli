import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { Card } from "semantic-ui-react"

function MovieList({search}) {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3001/movies")
            .then(r => r.json())
            .then(data => setMovies(data))
    }, [])

    // this is how I am handling the Search function
  const displayedMovies = movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()))
        
    return (
        <section id="movies">
            <h2 className="header">Ghibli Movies</h2>
            <Card.Group itemsPerRow={6}>
                {displayedMovies.map((movie)=> (
                <MovieItem key={movie.id} movie={movie} />
                ))}
            </Card.Group>
            {/* <div id="movie-list"> {
                displayedMovies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
                ))} 
            </div> */}
        </section>
    );
}

export default MovieList;
