import React, { useState } from "react";
import axios from 'axios'

const AddMovie = props => {

    const [newMovie, setNewMovie] = useState({
        id: "",
        title: "",
        director: "",
        metascore: Number(""),
        stars: []
    })

    const handleSubmit = event => {
        event.preventDefault()
    }

    const handleAdd = event => {
        axios
            .post(`http://localhost:5000/api/movies`, newMovie)
            .then(res => {
                window.location.reload(false);
                props.history.push('/');
                console.log(res.event.target)
                setNewMovie({
                    id: "",
                    title: "",
                    director: "",
                    metascore: Number(""),
                    stars: []
                })
            })
            .catch(err => console.log(err))
    }

    const handleChangesAdd = event => {
        setNewMovie({
            ...newMovie,
            [event.target.name]: event.target.value
        })
    }
    return (
        <div>
            <h3 className="add-movie-title">Add Movie</h3>
            <form className="add-movie" onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input
                    type="text"
                    name="title"
                    value={newMovie.title}
                    onChange={handleChangesAdd}>
                </input>
                <label htmlFor="director">Director: </label>
                <input
                    type="text"
                    name="director"
                    value={newMovie.director}
                    onChange={handleChangesAdd} >
                </input>
                <label htmlFor="metascore">Metascore: </label>
                <input
                    type="text"
                    name="metascore"
                    value={newMovie.metascore}
                    onChange={handleChangesAdd}>
                </input>
                <label htmlFor="stars">Stars: </label>
                <input
                    type="text"
                    name="stars"
                    value={[newMovie.stars]}
                    onChange={handleChangesAdd}>
                </input>
                <button type="submit" className="button" onClick={handleAdd}>Add Movie</button>
            </form>
        </div>
    )
}
export default AddMovie;