import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

const initialItem = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const UpdateMovie = props => {
    const [editMovie, setEditMovie] = useState(initialItem);
    const { id } = useParams();


    useEffect(() => {
        const movieToUpdate = props.movies.find(thing => `${thing.id}` === id);
        if (movieToUpdate) {
            setEditMovie(movieToUpdate)
        }
    }, [props.movies, id])


    const handleChanges = event => {
        event.preventDefault();
        setEditMovie({
            ...editMovie,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies${id}`, editMovie)
            .then(res => {
                props.setEditMovie(res.data)
                props.history.push('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h3 className="edit-movie-title">Edit Movie</h3>
            <div>
                <form className="edit-movie" onSubmit={handleSubmit}>
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" value={editMovie.title} onChange={handleChanges}></input>
                    <label htmlFor="director">Director: </label>
                    <input type="text" name="director" value={editMovie.director} onChange={handleChanges}></input>
                    <label htmlFor="metascore">Metascore: </label>
                    <input type="text" name="metascore" value={editMovie.metascore} onChange={handleChanges}></input>
                    <label htmlFor="stars">Stars: </label>
                    <input type="text" name="stars" value={[editMovie.stars]} onChange={handleChanges}></input>
                    <button type="submit">Edit Movie</button>
                </form>
            </div>
        </div>
    );
}
export default UpdateMovie;