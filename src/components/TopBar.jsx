import { Link } from "react-router-dom"
import styles from "styles/TopBar.module.css"

const TopBar = () => (
    <div className={styles.Container}>
        <Link to="/">
            <h1 className={styles.Title}>React Movie Finder</h1>
        </Link>
        <Link to="/ratings">
            <h1>Your ratings</h1>
        </Link>
    </div>
)

export default TopBar
