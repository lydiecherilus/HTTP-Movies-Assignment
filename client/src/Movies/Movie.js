import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleUpdate = e => {
    e.preventDefault();
    this.props.history.push(`/update-movie/${this.state.editMovie}`);
  }

  handleDelete = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        this.props.history.push('/update-movie');
      })
      .catch(error => console.log(error))
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <span> <button className="save-button" onClick={this.saveMovie}>Save</button></span>
        <span> <button className="edit-button" onClick={this.handleUpdate}>Edit</button></span>
        <span><button className="delete-button" onClick={this.handleDelete}>Delete</button></span>
      </div>
    );
  }
}