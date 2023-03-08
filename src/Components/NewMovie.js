import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewMovie() {
    const [title, setTitle] = useState("");
    const [originalTitle, setOriginalTitle] = useState("");
    const [originalTitleRomanised, setOriginalTitleRomanised] = useState("")
    const [poster, setPoster] = useState("");
    const [movieBanner, setMovieBanner] = useState("")
    const [synopsis, setSynopsis] = useState("");
    const [genre1, setGenre1] = useState("")
    const [genre2, setGenre2] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    
    const history = useHistory();
    
    function handleSubmit(e) {
        e.preventDefault()
        const date = new Date(releaseDate)             
        const formattedDate = date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric', })
        const formData = {
                title: title,
                original_title: originalTitle,
                original_title_romanised: originalTitleRomanised,
                poster: poster,
                movie_banner: movieBanner,
                synopsis: synopsis,
                genres: [genre1, genre2],
                release_date: formattedDate,
        }
        fetch("http://localhost:3001/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(data => {
                history.push(`/movies/${data.id}`)
            })
    }
    

    return (
        <section >
            <h3 className="header">Add New Movie</h3>
            <form className="new-movie-form" onSubmit={handleSubmit}>
                <input type="text" id="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="text" id="originalTitle" placeholder="Original Title" value={originalTitle} onChange={e => setOriginalTitle(e.target.value)} />
                <input type="text" id="originalTitleRomanised" placeholder="Original Title Romanised" value={originalTitleRomanised} onChange={e => setOriginalTitleRomanised(e.target.value)} />
                <input type="text" id="genre1" placeholder="First Genre" value={genre1} onChange={e => setGenre1(e.target.value)} />
                <input type="text" id="genre2" placeholder="Second Genre" value={genre2} onChange={e => setGenre2(e.target.value)} />
                <input type="text" id="poster" placeholder="Poster URL" value={poster} onChange={e => setPoster(e.target.value)} />
                <input type="text" id="movieBanner" placeholder="Movie Banner URL" value={movieBanner} onChange={e => setMovieBanner(e.target.value)} />
                <label>Release Date<input type="date" id="releaseDate" placeholder="Release Date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} /></label>
                <textarea id="synopsis" placeholder="Synopsis" value={synopsis} onChange={e => setSynopsis(e.target.value)} />
                <br/>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default NewMovie

// director
// screenwriters
// producers
// music
// genres
// rating
// release_date
// running_time
// budgetUSD
// boxOfficeUSD
// awards
// reviews
// characters