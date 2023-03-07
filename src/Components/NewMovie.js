import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const technologyList = ["React", "Redux", "Rails", "JavaScript"];

function NewMovie() {
    const [title, setTitle] = useState("");
    const [originalTitle, setOriginalTitle] = useState("");
    const [originalTitleRomanised, setOriginalTitleRomanised] = useState("")
    const [poster, setPoster] = useState("");
    const [movieBanner, setMovieBanner] = useState("")
    const [synopsis, setSynopsis] = useState("");
    
    const history = useHistory();
    
    function handleSubmit(e) {
        e.preventDefault()
        const formData = {
                title: title,
                original_title: originalTitle,
                original_title_romanised: originalTitleRomanised,
                poster: poster,
                movie_banner: movieBanner,
                synopsis: synopsis,
        }
        fetch("/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(data => {
                // redirect /projects/:id
                history.push(`/movies/${data.id}`)
            })
    }
    

    return (
        <section id="form">
            <h3 className="header">Add New Movie</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" id="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="text" id="originalTitle" placeholder="Original Title" value={originalTitle} onChange={e => setOriginalTitle(e.target.value)} />
                <input type="text" id="originalTitleRomanised" placeholder="Original Title Romanised" value={originalTitleRomanised} onChange={e => setOriginalTitleRomanised(e.target.value)} />
                <input type="text" id="poster" placeholder="Poster URL" value={poster} onChange={e => setPoster(e.target.value)} />
                <input type="text" id="movieBanner" placeholder="Movie Banner URL" value={movieBanner} onChange={e => setMovieBanner(e.target.value)} />
                <textarea id="synopsis" placeholder="Synopsis" value={synopsis} onChange={e => setSynopsis(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default NewMovie

// title
// original_title
// original_title_romanised
// poster
// movie_banner
// synopsis
// director
// screenwriters
// producers
// music
// genre
// rating
// release_date
// running_time
// budgetUSD
// boxOfficeUSD
// awards
// reviews
// characters