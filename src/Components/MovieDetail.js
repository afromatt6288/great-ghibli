import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function MovieDetail({admin}) {
    const [movie, setMovie] = useState(null);
    const { id } = useParams()
    
    useEffect(() => {
        fetch(`http://localhost:3001/movies/${id}`)
            .then(r => r.json())
            .then(data => setMovie(data))
    }, [id])
    console.log(movie)
    
    if (!movie) return <h2>Loading...</h2>
    
    const { title, original_title, original_title_romanised, sysnopsis, poster, genres} = movie
    
    function handleDeleteClick() {
        fetch(`http://localhost:3001/movies/${id}`, {
          method: "DELETE"
        })        
        window.location.replace("http://localhost:3000/movies#/movies")
      }
    
    return (
        <section>
            <div className="movie-item">
                <h1>{title}</h1>
                <p>{original_title}</p>
            </div>
            {admin ? (
            <div className="actions">
                <button>
                    <span role="img" aria-label="edit">
                        ✏️
                    </span>
                </button>
                <button onClick={handleDeleteClick}>
                    <span role="img" aria-label="delete">
                        🗑
                    </span>
                </button>
            </div>
            ) : null}
        </section>
    );
}

export default MovieDetail;