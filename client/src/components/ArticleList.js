import React from 'react'
import { useCookies } from 'react-cookie'
import APIService from '../APIService'

const ArticleList = (props) => {
    const [token] = useCookies('loginToken')

    const editBtn = (article) =>{
        props.editBtn(article)
    }

    const deleteBtn = (article) =>{
        APIService.DeleteArticle(article.id, token['loginToken'])
            .then(() => props.deleteBtn(article))
            .catch(error => console.log(error))
    }

    return (
        <div>
            {props.articles && props.articles.map(article => {
                const {id, title, description} = article
                return (
                <div key={id}>
                    <h2>{title}</h2>
                    <p>{description}</p>

                    <div className="row">
                        <div className="col-md-1">
                            <button className="btn btn-primary" onClick={() => editBtn(article)}>Edit</button>
                        </div>
                        <div className="col">
                            <button className="btn btn-danger" onClick={() => deleteBtn(article)}>Delete</button>
                        </div>
                    </div>
                    <hr className="hrclass"/>
                </div>
                )
            })}
        </div>
    )
}

export default ArticleList
