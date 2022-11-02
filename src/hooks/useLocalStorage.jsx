import { useEffect, useState } from "react"

const useLocalStorage = (key, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(key)

            if (value) {
                return JSON.parse(value)
            } else {
                window.localStorage.setItem(key, JSON.stringify(defaultValue))
                return defaultValue
            }
        } catch (err) {
            return defaultValue
        }
    })

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (err) {
            console.error(err)
        }
    }, [storedValue])

    return [storedValue, setStoredValue]
}

export default useLocalStorage
