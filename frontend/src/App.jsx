import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/api/hello')
      .then((response) => {
        if (!response.ok) {
          throw new Error('API request failed')
        }
        return response.text()
        })
        .then((data) => {
          setMessage(data)
        })
        .catch((error) => {
          setError('Spring Boot API に接続できません。backend が起動しているか確認してください。')
          console.error(error)
        })
  }, [])

  return (
    <main style={{ padding: '32px', fontFamily: 'sans-serif' }}>
      <h1>React + Spring Boot</h1>
      <p>開発分離構成の最小サンプルです。</p>
      <section style={{ marginTop: '24px' }}>
        <h2>API Response</h2>
        {message && <p>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </section>
    </main>
  )
}

export default App