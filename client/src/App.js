import React, { useState, useEffect } from 'react'
import './App.css'
import ArticleList from './components/ArticleList'
import Form from './components/Form'

const App = () => {
  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState(null)

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

  const editBtn = (article) =>{
    setEditArticle(article)
  }

  const deleteBtn = (article) =>{
    const new_articles = articles.filter(item => {
      if (item.id === article.id) {
        return false
      }
      return true
    })

    setArticles(new_articles)
  }

  const articleForm = () => {
    setEditArticle({title: '', description: ''})
  }

  const updatedInformation = (article) => {
    const new_article = articles.map(item => {
      if (item.id === article.id){
        return article
      }
      else {
        return item
      }
    })

    setArticles(new_article)
  }

  const newInformation = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h1>Client-Side</h1><br />
        </div>
        <div className="col">
          <button onClick={articleForm} className="btn btn-primary">Add article</button>
        </div>
      </div>

      <ArticleList articles={articles} editBtn={editBtn} deleteBtn={deleteBtn}/>
      {editArticle ? <Form article={editArticle} updatedInformation={updatedInformation} newInformation={newInformation}/> : null}
      
    </div>
  )
}

export default App
