import Card from "components/Card"
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
        <div className={styles.Container}>
            <hr />
            <div className={styles.CardList}>
                {ratings?.map((movie) => (
                    <Card
                        key={movie.id}
                        movie={movie}
                        setRating={(rating) => setRating(rating, movie)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Ratings
