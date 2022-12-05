import { useState } from "react"
import { AiFillStar } from "react-icons/ai"
import styles from "styles/Rate.module.css"

const Rate = ({ rating, setRating }) => {
    const [hover, setHover] = useState()
    return (
        <div>
            {[...Array(5)].map((_, index) => {
                index++
                return (
                    <button
                        type="button"
                        key={index}
                        className={`${styles.Star} ${
                            index <= (hover || rating) ? styles.On : styles.Off
                        }`}
                        onClick={(event) => {
                            event.preventDefault()
                            setRating(index)
                        }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover()}
                    >
                        <AiFillStar size={30} />
                    </button>
                )
            })}
        </div>
    )
}

export default Rate
