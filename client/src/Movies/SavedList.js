import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AddMovie from "./AddMovie";
export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {this.props.list.map(movie => {
          return (

            <NavLink
              to={`/movies/${movie.id}`}
              key={movie.id}
              activeClassName="saved-active"
            >
              <span className="saved-movie">{movie.title}</span>
            </NavLink>
          );
        })}
        <div className="">
          <Link className="home-button" to="/">Home</Link>
          <Link className="add-movie-button" to="/AddMovie">Add Movie</Link>
        </div>
      </div>
    );
  }
}
