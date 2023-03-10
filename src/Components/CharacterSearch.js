import React from "react";

function CharacterSearch({search, onSearchChange, onHandleSpeciesFilter, filterBySpecies, onHandleMovieFilter, filterByMovie, species, films}) {

  function handleSpeciesFilter(e){
    onHandleSpeciesFilter(e.target.value)
  }

  function handleMoviesFilter(e){
    onHandleMovieFilter(e.target.value)
  }

  return (
    <div className="ui search">
        <label className="filter">
            <strong> Filter by Species:</strong>
            <select onChange={handleSpeciesFilter} value={filterBySpecies}>
                <option value="All">All</option>
                {species.map((species)=> <option value={species.name}>{species.name}</option>)}
            </select>
        </label>
        <label className="filter">
            <strong> Filter by Movie:</strong>
            <select onChange={handleMoviesFilter} value={filterByMovie}>
                <option value="All">All</option>
                {films.map((film)=> <option value={film.title}>{film.title}</option>)}
            </select>
        </label>
      <div className="ui icon input">
        <input className="prompt" type="text" name="search" placeholder="Search..." value={search} onChange={e=> onSearchChange(e.target.value)}/>
        <i className="search icon" />
      </div>
    </div>
  );
}

export default CharacterSearch;