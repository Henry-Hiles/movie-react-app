import { Link } from "react-router-dom"
import styles from "styles/Card.module.css"
import Rate from "./Rate"

const Card = ({ movie, setRating }) => (
    <Link to={`/movie/${movie.id}`} className={styles.Link}>
        <div className={styles.Card}>
            <img
                src={movie.posterUrl}
                alt={movie.title}
                className={styles.Image}
            />
            <div className={styles.Bottom}>
                {movie.rating && (
                    <Rate rating={movie.rating} setRating={setRating} />
                )}
            </div>
        </div>
    </Link>
)

export default Card
