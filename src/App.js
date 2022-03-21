import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  const [message, setMessage] = useState()

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(setMessage)
  }, [])

  if (!message) {
    return <p>loading</p>
  }

  return (
    <Routes>
      <Route path="/" element={<p>{message}</p>} />
    </Routes>
  )
}

export default App
