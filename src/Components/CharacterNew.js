import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function CharacterNew() {
    const [name, setName] = useState("")
    const [originalCast, setOriginalCast] = useState("");
    const [lastEnglishDubbingActor, setLastEnglishDubbingActor] = useState("");
    const [still, setStill] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [eyeColor, setEyeColor] = useState("");
    const [hairColor, setHairColor] = useState("");
    const [species, setSpecies] = useState("");

    //fetching film data for character entry and patching
    const [movies, setMovies] = useState([]); 
    const [filterFilmBy, setFilterFilmBy] = useState("All")   
    useEffect(() => {
        fetch("http://localhost:3001/movies")
            .then(r => r.json())
            .then(data => setMovies(data))
    }, [])
console.log(movies)
    function handleFilmFilter(e){
        console.log(e.target.value)
        setFilterFilmBy(e.target.value)
    }
    // End of film data
    
    const history = useHistory();
    
    function handleSubmit(e) {
        e.preventDefault()        
        const formData = {
                name: name,
                originalCast: originalCast,
                lastEnglishDubbingActor: lastEnglishDubbingActor,
                still: still,
                gender: gender,
                age: age,
                eye_color: eyeColor,
                hair_color: hairColor,
                species: {
                    name: species,
                }
        }
        fetch("http://localhost:3001/characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(data => {
                history.push(`/characters/${data.id}`)
            })
    }
    

    return (
        <section >
            <h3 className="header">Add New Character</h3>
            <form className="new-movie-form" onSubmit={handleSubmit}>
                <input type="text" id="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input type="text" id="originalCast" placeholder="Original Cast" value={originalCast} onChange={e => setOriginalCast(e.target.value)} />
                <input type="text" id="lastEnglishDubbingActor" placeholder="Last English Dubbing Actor" value={lastEnglishDubbingActor} onChange={e => setLastEnglishDubbingActor(e.target.value)} />
                <input type="text" id="still" placeholder="Title" value={still} onChange={e => setStill(e.target.value)} />
                <input type="text" id="gender" placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} />
                <input type="text" id="age" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
                <input type="text" id="eyeColor" placeholder="Eye Color" value={eyeColor} onChange={e => setEyeColor(e.target.value)} />
                <input type="text" id="hairColor" placeholder="Hair Color" value={hairColor} onChange={e => setHairColor(e.target.value)} />
                <input type="text" id="species" placeholder="Species" value={species} onChange={e => setSpecies(e.target.value)} />
                <label htmlFor="film">Film</label>
                    <select onChange={handleFilmFilter} value={filterFilmBy}>
                        <option value="pleaseSelectFilm">Please Select Film</option>
                        {movies.map((movie)=> <option value={movie.title}>{movie.title}</option>)}
                    </select>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default CharacterNew


    // make this a pull down menu of films that already exist in the 
    // then have it auto populate the film.title, film.poster, film.movie_banner
// const [film, setFilm] = useState({});
// film: film,
// <input type="text" id="film" placeholder="Film" value={film} onChange={e => setFilm(e.target.value)} />
//      film: {
//         "title": "Castle in the Sky",
//         "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg",
//         "movie_banner": "https://image.tmdb.org/t/p/w533_and_h300_bestv2/3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg"
//       },

// need to push species to the DB
// 
// 






