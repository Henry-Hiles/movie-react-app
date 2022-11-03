import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from "styles/TopBar.module.css"

const TopBar = ({ search, setSearch, absolute }) => {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div
            className={`${styles.Container} ${
                absolute && width > 1000 ? styles.Absolute : ""
            } ${setSearch ? styles.HasSearch : ""}`}
        >
            <Link to="/">
                <h1 className={styles.Title}>React Movie Finder</h1>
            </Link>

            {setSearch && (
                <input
                    type="text"
                    className={styles.Search}
                    value={search}
                    autoFocus
                    placeholder="Search for movies..."
                    onChange={({ target }) => setSearch(target.value)}
                />
            )}

            <Link to="/ratings" className={styles.Ratings}>
                <h1>Your ratings</h1>
            </Link>
        </div>
    )
}

export default TopBar
