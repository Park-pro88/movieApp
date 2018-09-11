import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

export default class App extends Component {

  // MOUNT : UNSAFE_componentWillMount() -> render() -> componentDidMount()
  // UPDATE : UNSAFE_componentWillReceiveProps() -> shouldComponentUpdate() if(true) -> componentWillUpdate() (v17 getSnapshotBeforeUpdate()) -> render() -> componentDidMount()

  state = {}

  /**
  componentDidMount() {
    setTimeout(() => {
      //this.state.greeting = 'hello again !' NEVER USE
      this.setState({
        greeting: 'hello again !'
      });
    }, 2000)
  }
  **/

  componentDidMount() {

    console.log("componentDidMount()");

    this._getMovies();
  }

  _getMovies = async () => {
    console.log('_getMovies()');
    const movies = await this._callApi();

    console.log(movies);

    this.setState({
      movies: movies
    })
  }

  _callApi = () => {
    console.log('_callApi()');
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  _renderMovies = () => {

    console.log("renderMovie()");

    const movies = this.state.movies.map(movie => {

      console.log(movie);

      return <Movie
        key={movie.id}
        title={movie.title_english}
        poster={movie.medium_cover_image}
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    })

    return movies;
  }

  render() {

    console.log("render()");

    const { movies } = this.state;

    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}