import TopBar from "components/TopBar"
import useDebounce from "hooks/useDebounce"
import { useEffect, useState } from "react"
import styles from "styles/Home.module.css"
import config from "config"
import { GENRES } from "../constants"
import Card from "components/Card"

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
            <input
                type="text"
                className={styles.Search}
                value={search}
                autoFocus
                placeholder="Search for movies..."
                onChange={({ target }) => setSearch(target.value)}
            />
            <div className={styles.CardList}>
                {movies?.map((movie) => (
                    <Card key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default Home
