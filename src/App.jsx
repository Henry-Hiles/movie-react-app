import { Routes, Route } from "react-router-dom"
import "./App.css"
import Home from "pages/Home"
import Movie from "pages/Movie"
import Actor from "pages/Actor"

const App = () => (
    <div className="App">
        <Routes>
            <Route index element={<Home />} />
            <Route path="/movie/:movieId" element={<Movie />} />
            <Route path="/actor/:actorId" element={<Actor />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
    </div>
)

export default App
