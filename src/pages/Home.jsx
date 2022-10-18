import { useMovies } from "contexts/MoviesContext"
import CardList from "components/CardList"
import TopBar from "components/TopBar"
import styles from "styles/Home.module.css"

const Home = () => {
    const [movies, page, search, { nextPage, setSearch }] = useMovies()

    return (
        <div className={styles.Container}>
            <TopBar search={search} setSearch={setSearch} />
            <CardList movies={movies} />
        </div>
    )
}

export default Home
