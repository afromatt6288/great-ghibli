import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function MovieDetail() {
    const [movie, setMovie] = useState(null);
    const { id } = useParams()
    
    useEffect(() => {
        fetch(`http://localhost:3001/movies/${id}`)
            .then(r => r.json())
            .then(data => setMovie(data))
    }, [id])
    console.log(movie)
    
    if (!movie) return <h2>Loading...</h2>
    
    const{ title, original_title, original_title_romanised, sysnopsis, poster, genres} = movie
    

    
    return (
        <section>
            <div className="movie-item">
                <h1>{title}</h1>
                <p>{original_title}</p>
            </div>
        </section>
    );
}

export default MovieDetail;