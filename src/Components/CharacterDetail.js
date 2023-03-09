import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"

function CharacterDetail({admin}) {
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
    const {rottenTomatoes, imdb} = reviews
    const {name, originalCast, lastEnglishDubbingActor, still} = characters
    
    function handleDeleteClick() {
        fetch(`http://localhost:3001/movies/${id}`, {
          method: "DELETE"
        }) 
        history.push(`/movies`)       
    }
    
    return (
        <section>
            <header className="detail-header">
                <div className="container">
                    <span className="highlight">{title}</span>
                </div>
                <div className="container">
                    <span className="highlight">{original_title}</span>
                </div>
                <div className="container">
                    <span className="highlight">{original_title_romanised}</span>
                </div>
            </header>
            <div className="detail-intro">
                <span>
                    <label>Genres: <p>{genre1} / {genre2}</p></label> 
                    <label>Released: <p>{release_date}</p></label>
                    <label>Running time:<p>{running_time} min</p></label>
                    <label>Rated: <p>{rating}</p></label>
                </span>
                <p>{synopsis}</p>
                <span>
                    <label>Directed by:<p>{director}</p></label> 
                    <label>Produced by:<p>{producers}</p></label>
                    <label>Music by:<p>{music}</p></label>
                    <label>Screenwriters:<p>{screenwriters}</p></label>
                </span>
                <h3>Reviews: rottenTomatoes: {rottenTomatoes} / imdb: {imdb}</h3>
                <h2>Characters:</h2>
                <div>{characters.map((character)=> (
                    <div>
                        <h4>{character.name}</h4>
                        <h4>{character.originalCast}</h4>
                        <h4>{character.lastEnglishDubbingActor}</h4>
                        <Link to={`/movies/${id}`}>
                            <img className="img-thumb" src={poster} alt={title} />
                        </Link>
                        <img className="img-thumb" src={character.still}/>
                    </div>
                ))}
                </div>
                <h2>Awards:</h2>
                <div>{awards}</div>
                <span>
                    <label>Budget USD: <p>{budgetUSD}</p></label> 
                    <label>Box Office USD: <p>{boxOfficeUSD}</p></label>
                </span>
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

export default CharacterDetail;