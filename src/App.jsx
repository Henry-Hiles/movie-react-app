import { Routes, Route } from "react-router-dom"
import Home from "pages/Home"
import Movie from "pages/Movie"
import Actor from "pages/Actor"
import Ratings from "pages/Ratings"
import styles from "styles/App.module.css"

const App = () => (
    <div className={styles.App}>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/movie/:movieId" element={<Movie />} />
            <Route path="/actor/:actorId" element={<Actor />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
    </div>
)

export default App
