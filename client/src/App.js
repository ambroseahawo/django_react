import React, { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [articles, setArticles] = useState(['one', 'two'])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 5365599a52d9a85b1550661b81833c7495ef42b1'
      }
    }).then(resp => resp.json()).then(resp => setArticles(resp))
      .catch(error => console.log(error))
  }, [])

  return (
    <div className="App">
      <h1>Client-Side</h1>

      {articles.map(article => {
        const {id, title, description} = article
        return (
          <div key={id}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
