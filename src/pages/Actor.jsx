import { useEffect, useState } from "react"
import config from "config"
import styles from "styles/Actor.module.css"
import { Link, useParams } from "react-router-dom"
import { GENRES } from "../constants"
import TopBar from "components/TopBar"

const Actor = () => {
    const { actorId } = useParams()
    const [actor, setActor] = useState()
    const [images, setImages] = useState()
    const [collapsed, setCollapsed] = useState(true)
    const [credits, setCredits] = useState()

    useEffect(() => {
        const run = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/person/${actorId}?api_key=${config.apiKey}`
            )
            const data = await response.json()
            setActor(data)
        }
        run()
    }, [actorId])

    useEffect(() => {
        const run = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/person/${actorId}/images?api_key=${config.apiKey}`
            )
            const data = await response.json()
            setImages(data)
        }
        run()
    }, [actorId])

    useEffect(() => {
        const run = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${config.apiKey}`
            )
            const data = await response.json()
            setCredits(
                data.cast
                    .filter((movie) => movie.poster_path)
                    .map((movie) => ({
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
    }, [actorId])

    return (
        <>
            <TopBar />
            <div className={styles.Container}>
                <div className={styles.Top}>
                    <img
                        src={`https://image.tmdb.org/t/p/w300${images?.profiles[0]?.file_path}`}
                        alt={`Image of ${actor?.name}`}
                        className={styles.Thumb}
                    />
                    <div className={styles.Right}>
                        <h1 className={styles.Name}>{actor?.name}</h1>
                        <div className={styles.Section}>
                            <h1>Biography</h1>
                            <div>
                                {actor?.biography ? (
                                    <a
                                        href="#"
                                        className={styles.Collapse}
                                        onClick={() =>
                                            setCollapsed(
                                                (collapsed) => !collapsed
                                            )
                                        }
                                    >
                                        <p
                                            className={`${
                                                collapsed
                                                    ? styles.Collapsed
                                                    : ""
                                            } ${styles.Biography}`}
                                        >
                                            {actor.biography}
                                        </p>

                                        <p className={styles.ReadMore}>
                                            {collapsed
                                                ? "Read More"
                                                : "Read Less"}
                                        </p>
                                    </a>
                                ) : (
                                    <p>No biography available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.Section}>
                    <h1>Movies</h1>
                    <div className={styles.Credits}>
                        {credits?.map((movie) => (
                            <Link
                                to={`/movie/${movie.id}`}
                                key={movie.id}
                                className={styles.Movie}
                            >
                                <img src={movie.posterUrl} />
                                <h3 className={styles.MovieTitle}>
                                    {movie.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={styles.Section}>
                    <h1>Images</h1>
                    <div className={styles.Images}>
                        {images?.profiles.map((image) => (
                            <img
                                key={image.file_path}
                                className={styles.Image}
                                src={`https://image.tmdb.org/t/p/w300${image.file_path}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Actor
