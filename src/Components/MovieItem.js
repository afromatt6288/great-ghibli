import React from "react";
import { Link } from "react-router-dom";

function MovieItem({ movie }) {
  const{ id, title, poster, release_date} = movie

  return (
    <div className="movie-item">
      <Link to={`/movies/${id}`}>
        <img className="img-thumb" src={poster} alt={title} />
      </Link>

      <p>{release_date}</p>
    </div>
  );
}

export default MovieItem;