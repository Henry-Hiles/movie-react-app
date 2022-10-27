import styles from "styles/TopBar.module.css"

const TopBar = ({ search, setSearch }) => (
    <div className={styles.Container}>
        <h1 className={styles.Title}>React Movie Finder</h1>
        <input
            type="text"
            className={styles.Search}
            value={search}
            autoFocus
            placeholder="Search for movies..."
            onChange={({ target }) => setSearch(target.value)}
        />
    </div>
)

export default TopBar
