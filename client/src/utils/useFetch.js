import { useEffect, useState } from 'react'
import { handleErrors } from '../utils/handleErrors'

export const useFetch = (url, numberOfUpdates = 0) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    setIsLoaded(false)
    fetch(url)
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        setItems(result)
        setIsLoaded(true)
      })
      .catch((error) => {
        setError(error)
        setIsLoaded(true)
      })
    console.log(items)
    console.log('useEffect custom hook here!', numberOfUpdates)
    // return () => ac.abort()
  }, [url, numberOfUpdates])

  return {
    isLoaded,
    items,
    error,
  }
}
