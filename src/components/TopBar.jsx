const TopBar = ({ search, setSearch }) => (
    <div id="top-bar">
        <h1>React Movie Finder</h1>
        <input
            type="text"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
        />
    </div>
)

export default TopBar
