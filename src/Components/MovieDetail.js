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
    
    if (!movie) return <h2>Loading...</h2>
    
    const { title, original_title, original_title_romanised, synopsis, poster, genres, movie_banner, release_date, director, screenwriters, producers, music, rating, running_time, budgetUSD, boxOfficeUSD, awards, reviews, characters} = movie
    const [genre1, genre2] = genres
    
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
                <span>
                <p>{genre1} / {genre2}</p> 
                <p>Released: {release_date}</p>
                <p>Running time: {running_time}</p>
                <p>Rated: {rating}</p>
                </span>
                <p>{synopsis}</p>
            </div>
            <div className="detail-image-container">
                <img className="detail-image" src={poster} alt={title}/>
            </div>
            <div className="detail-banner-container">
                <img className="detail-banner" src={movie_banner} alt={`${title} banner`} />
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

// director
// screenwriters
// producers
// music
// budgetUSD
// boxOfficeUSD
// awards
// reviews
// characters