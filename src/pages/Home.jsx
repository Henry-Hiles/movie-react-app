import CardList from "components/CardList"
import TopBar from "components/TopBar"
import useDebounce from "hooks/useDebounce"
import { useEffect, useState } from "react"
import styles from "styles/Home.module.css"
import config from "config"
import { GENRES } from "../constants"

const Home = () => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search)

    useEffect(() => {
        const run = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/${
                    debouncedSearch ? "search" : "discover"
                }/movie?api_key=${
                    config.apiKey
                }&page=${page}&query=${encodeURIComponent(debouncedSearch)}`
            )
            const data = await response.json()
            setMovies(
                data.results.map((movie) => ({
                    id: movie.id,
                    overview: movie.overview,
                    adult: movie.adult,
                    posterUrl: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
                    backdropUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
                    genres: movie.genre_ids.map((genreId) =>
                        GENRES.find((genre) => genre.id == genreId)
                    ),
                    title: movie.title,
                    releaseDate: movie.release_date,
                    year: movie.release_date.split("-")[0],
                    averageVote: movie.vote_average,
                    voteCount: movie.vote_count,
                    popularity: movie.popularity,
                }))
            )
        }

        run()
    }, [page, debouncedSearch])

    return (
        <div className={styles.Container}>
            <TopBar search={search} setSearch={setSearch} />
            <CardList movies={movies} />
        </div>
    )
}

export default Home
