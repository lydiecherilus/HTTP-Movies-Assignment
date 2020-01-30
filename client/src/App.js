import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import AddMovie from "./Movies/AddMovie";
import UpdateMovie from "./Movies/UpdateMovie";

const App = (props) => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => {
        console.log('res.data', res.data)
        setMovies(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />

      <Route path="/addmovie" render={props => (
        <AddMovie {...props} movies={movies} />
      )} />

      <Route path="/update-movie/:id" render={props => (
        <UpdateMovie {...props} movies={movies} />
      )} />

      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} movies={movies} />;
        }}
      />
    </div>
  );
};
export default App;