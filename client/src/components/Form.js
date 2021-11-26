import React, {useState, useEffect} from 'react'
import APIService from '../APIService'

const Form = (props) => {
    const [title, setTitle] = useState(props.article.title)
    const [description, setDescription] = useState(props.article.description)

    useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)
    }, [props.article])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, {title, description})
            //.then(resp => console.log(resp))
            .then(resp => props.updatedInformation(resp))
    }

    const insertArticle = () => {
        APIService.InsertArticle({title, description})
            .then(resp => props.newInformation(resp))
    }

    return (
        <div>
            {props.article ? (
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" 
                            placeholder="Enter title" value={title}
                            onChange={e => setTitle(e.target.value)}/>

                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea name="" id="description" cols="30" rows="5" className="form-control" 
                                value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <br/>
                    {
                        props.article.id ? <button onClick={updateArticle} className="btn btn-success">Update</button> :
                                            <button onClick={insertArticle} className="btn btn-success">Add</button>
                    }

                </div>
            ): null}
        </div>
    )
}

export default Form
