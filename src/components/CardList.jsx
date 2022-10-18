import Card from "components/Card"
import styles from "styles/CardList.module.css"

const CardList = ({ movies }) => (
    <div className={styles.CardList}>
        {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
        ))}
    </div>
)

export default CardList
