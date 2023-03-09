import React from "react";
import { Link } from "react-router-dom";

function CharacterItem({ character }) {
    const { id, name, still, film, species} = character


    return (
        <div className="character-item">
            <p>{name}</p>
            <Link to={`/characters/${id}`}>
                <img className="img-thumb" src={still} alt={name} onerror="this.onerror=null;this.src='https://image.shutterstock.com/image-vector/blank-avatar-photo-place-holder-260nw-1114445501.jpg';" />
            </Link>
            <p>{species.name}</p>
            <p>{film.title}</p>
        </div>
    );
}

export default CharacterItem;

// {
//     "id": 1,
//     "name": "Pazu",
//     "film": {
//       "id": 1,
//       "title":"Castle in the Sky",
//       "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg"
//       },
//     "originalCast": "Mayumi Tanaka",
//     "lastEnglishDubbingActor": "James Van Der Beek",
//     "still": "https://static.wikia.nocookie.net/studio-ghibli/images/8/8b/Pazu.jpg/revision/latest?cb=20210214205023",
//     "gender": "Male",
//     "age": "13",
//     "eye_color": "Black",
//     "hair_color": "Brown",
//     "species": {
//       "id": 1,
//       "name": "Human"
//     }
//   },