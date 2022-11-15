import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styles from "styles/Movie.module.css"
import useLocalStorage from "hooks/useLocalStorage"
import Rate from "components/Rate"
import TopBar from "components/TopBar"

const Movie = () => {
    const { movieId } = useParams()
    const [movie, setMovie] = useState()
    const [cast, setCast] = useState()
    const [ratings, setRatings] = useLocalStorage("ratings", [])
    const rating = ratings.find(({ id }) => id == movieId)?.rating

    const setRating = (rating) =>
        setRatings((currentRatings) => [
            ...currentRatings.filter(({ id }) => id != movieId),
            { ...movie, rating },
        ])

    useEffect(() => {
        const run = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
                    import.meta.env.VITE_APIKEY
                }`
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
                averageVote: data.vote_average / 2,
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
                `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${
                    import.meta.env.VITE_APIKEY
                }`
            )
            const data = await response.json()
            setCast(data.cast)
        }
        run()
    }, [movieId])

    return (
        <>
            <TopBar absolute />
            <div className={styles.Container}>
                <div
                    className={styles.Top}
                    style={{
                        backgroundImage: `url(${movie?.backdropUrl})`,
                    }}
                >
                    <img className={styles.Thumb} src={movie?.posterUrl} />

                    <div className={styles.Summary}>
                        <h1 className={styles.Title}>
                            {movie?.title} - {movie?.year}
                        </h1>
                        {movie?.tagline && (
                            <p className={styles.Tagline}>{movie?.tagline}</p>
                        )}
                        <a href="#bottom" className={styles.More}>
                            <p>More info</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className={styles.Bottom} id="bottom">
                    <div className={styles.Tags}>
                        {movie?.genres.map((genre) => (
                            <p key={genre}>{genre}</p>
                        ))}
                        <p className={styles.Average}>
                            <span>
                                Average Rating: {movie?.averageVote.toFixed(1)}
                            </span>
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
                    <div className={styles.Section}>
                        <h1 className={styles.Header}>Overview</h1>
                        <p className={styles.Overview}>{movie?.overview}</p>
                    </div>
                    <div className={styles.Section}>
                        <h1 className={styles.Header}>Your Rating</h1>
                        <Rate rating={rating} setRating={setRating} />
                        <br />
                        <Link to="/ratings" className={styles.RatingsLink}>
                            Go to ratings
                        </Link>
                    </div>
                    <div className={styles.Section}>
                        <h1 className={styles.Header}>Actors</h1>
                        <div className={styles.Actors}>
                            {cast?.map((actor) => (
                                <Link
                                    key={actor.id}
                                    to={`/actor/${actor.id}`}
                                    className={styles.Actor}
                                >
                                    <img
                                        src={
                                            actor.profile_path
                                                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                                : "../placeholder.svg" //`https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&size=300`
                                        }
                                        alt={actor.name}
                                    />

                                    <h3>{actor.name}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Movie
