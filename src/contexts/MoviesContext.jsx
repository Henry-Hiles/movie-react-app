import { createContext, useContext, useEffect, useState } from "react"
import config from "config"

const MoviesContext = createContext()

export const useMovies = () => useContext(MoviesContext)

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState({})
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const run = async () => {
            const genresResponse = await fetch(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${config.apiKey}`
            )
            const genresData = await genresResponse.json()
            genresData.genres.forEach((genre) =>
                setGenres((current) => {
                    const copy = {}
                    Object.assign(copy, current)
                    copy[genre.id] = genre.name
                    return copy
                })
            )
        }
        run()
    })

    useEffect(() => {
        const run = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/${
                    search ? "search" : "discover"
                }/movie?api_key=${
                    config.apiKey
                }&page=${page}&query=${encodeURIComponent(search)}`
            )
            const data = await response.json()
            setMovies(
                data.results.map((movie) => ({
                    id: movie.id,
                    overview: movie.overview,
                    adult: movie.adult,
                    posterUrl: `https://image.tmdb.org/t/p/w342/${movie.poster_path}`,
                    backdropUrl: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
                    genres: movie.genre_ids.map((genreId) => genres[genreId]),
                    title: movie.title,
                    releaseDate: movie.release_date,
                    averageVote: movie.vote_average,
                    voteCount: movie.vote_count,
                    popularity: movie.popularity,
                }))
            )
        }

        run()
    }, [page, genres])

    const nextPage = () => setPage((page) => page + 1)

    return (
        <MoviesContext.Provider
            value={[movies, page, search, { nextPage, setSearch }]}
        >
            {children}
        </MoviesContext.Provider>
    )
}
