import TopBar from "components/TopBar"
import useDebounce from "hooks/useDebounce"
import { useEffect, useState } from "react"
import styles from "styles/Home.module.css"
import config from "config"
import Card from "components/Card"

const Home = () => {
    const [movies, setMovies] = useState([])
    const [page] = useState(1)
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
                data.results
                    .filter((movie) => movie?.poster_path)
                    .map((movie) => ({
                        id: movie.id,
                        posterUrl: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
                    }))
            )
        }

        run()
    }, [page, debouncedSearch])

    return (
        <div className={styles.Container}>
            <TopBar search={search} setSearch={setSearch} />
            {movies?.length ? (
                <div className={styles.CardList}>
                    {movies?.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <h1 className={styles.NoMovies}>No results found</h1>
            )}
        </div>
    )
}

export default Home
