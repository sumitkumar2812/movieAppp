import {Component} from 'react'
import Cookies from 'js-cookie'
import MovieCard from '../MovieCard'

import Footer from '../Footer'
import Header from '../Header'

import './index.css'

class MoviesHome extends Component {
  state = {
    trendingMovieList: [],
  }

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedMovies = await response.json()
      console.log(fetchedMovies)
      const updatedMovies = fetchedMovies.results.map(movie => ({
        backdropPath: movie.backdrop_path,
        id: movie.id,
        overview: movie.overview,
        posterPath: movie.poster_path,
        title: movie.title,
      }))

      this.setState({
        trendingMovieList: updatedMovies,
      })
    }
  }

  renderMoviesList = () => {
    const {trendingMovieList} = this.state
    return (
      <div>
        <h1 className="trending-heading">Trending Now</h1>
        <ul className="movies-list">
          {trendingMovieList.map(movie => (
            <MovieCard movieData={movie} key={movie.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <>
        <div className="home-background">
          <div className="background_image">
            <Header />
            <h1 className="main-heading">Super Man</h1>
            <p className="main-para">
              Superman is a fictional superhero who first appeared in American
              comic books published by DC Comics.
            </p>

            <button className="main-button" type="button">
              Play
            </button>
          </div>
          {this.renderMoviesList}

          <Footer />
        </div>
      </>
    )
  }
}

export default MoviesHome
