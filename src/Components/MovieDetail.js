import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"

function MovieDetail({admin}) {
    const [movie, setMovie] = useState(null);
    const { id } = useParams()
    const history = useHistory()
    
    useEffect(() => {
        fetch(`http://localhost:3001/movies/${id}`)
            .then(r => r.json())
            .then(data => setMovie(data))
    }, [id])
    console.log(movie)
    
    if (!movie) return <h2>Loading...</h2>
    
    const { title, original_title, original_title_romanised, synopsis, poster, genres} = movie
    
    function handleDeleteClick() {
        fetch(`http://localhost:3001/movies/${id}`, {
          method: "DELETE"
        }) 
        history.push(`/movies`)       
      }
    
    return (
        <section>
            <div className="detail-intro">
                <h2>{title} / {original_title} / {original_title_romanised}</h2>
                <p>{genres}</p>
                <p>{synopsis}</p>
            </div>
            <div className="detail-image-container">
                <img className="detail-image" src={poster} alt={title}/>
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