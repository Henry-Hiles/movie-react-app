import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "styles/Movie.module.css"
import config from "config"

const Movie = () => {
    const { movieId } = useParams()
    const [movie, setMovie] = useState()
    const [cast, setCast] = useState()

    useEffect(() => {
        const run = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${config.apiKey}`
            )
            const data = await response.json()
            setMovie({
                id: data.id,
                overview: data.overview,
                adult: data.adult,
                posterUrl: `https://image.tmdb.org/t/p/w342${data.poster_path}`,
                backdropUrl: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
                genres: data.genres.map((genre) => genre.name),
                title: data.title,
                releaseDate: data.release_date,
                year: data.release_date.split("-")[0],
                averageVote: data.vote_average,
                voteCount: data.vote_count,
                popularity: data.popularity,
                tagline: data.tagline,
            })
        }
        run()
    }, [movieId])

    useEffect(() => {
        const run = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${config.apiKey}`
            )
            const data = await response.json()
            setCast(data.cast)
        }
        run()
    }, [movieId])

    return movie ? (
        <div className={styles.Container}>
            <div
                className={styles.Top}
                style={{
                    backgroundImage: `url(${movie.backdropUrl})`,
                }}
            >
                <div className={styles.Summary}>
                    <h2 className={styles.Title}>
                        {movie.title} - {movie.year}
                    </h2>
                    <p>{movie.tagline}</p>
                    <p className={styles.Overview}>{movie.overview}</p>
                </div>
            </div>
            <div className={styles.Bottom}>
                <div className={styles.Tags}>
                    {movie.genres.map((genre) => (
                        <p>{genre}</p>
                    ))}
                    <p className={styles.Average}>
                        {movie.averageVote}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                    </p>
                </div>
                <div className={styles.Section}></div>
                <div className={styles.Section}>
                    <h1 className={styles.Header}>Actors</h1>
                    <div className={styles.Actors}>
                        {cast?.map((actor) => (
                            <div key={actor.id}>
                                {actor.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                        alt={actor.name}
                                    />
                                ) : (
                                    <p>Image Unavailable</p>
                                )}

                                <h3>{actor.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div></div>
    )
}

export default Movie
