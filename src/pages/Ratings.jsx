import Card from "components/Card"
import TopBar from "components/TopBar"
import useLocalStorage from "hooks/useLocalStorage"
import styles from "styles/Ratings.module.css"

const Ratings = () => {
    const [ratings, setRatings] = useLocalStorage("ratings", [])
    const setRating = (rating, movie) =>
        setRatings((currentRatings) => [
            ...currentRatings.filter(({ id }) => id != movie.id),
            { ...movie, rating },
        ])

    return (
        <>
            <TopBar />
            <div className={styles.Container}>
                <h1 className={styles.Header}>Your rated movies</h1>
                {ratings?.length ? (
                    <div className={styles.CardList}>
                        {ratings?.map((movie) => (
                            <Card
                                key={movie.id}
                                movie={movie}
                                setRating={(rating) => setRating(rating, movie)}
                            />
                        ))}
                    </div>
                ) : (
                    <h1 className={styles.NoMovies}>No rated movies.</h1>
                )}
            </div>
        </>
    )
}

export default Ratings
