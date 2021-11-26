export default class APIService {

    static async UpdateArticle(article_id, body) {

        const resp = await fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 5365599a52d9a85b1550661b81833c7495ef42b1'
            },
            body: JSON.stringify(body)
        })
        return await resp.json();
    }

    static async InsertArticle(body) {

        const resp = await fetch(`http://127.0.0.1:8000/api/articles/`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 5365599a52d9a85b1550661b81833c7495ef42b1'
            },
            body: JSON.stringify(body)
        })
        return await resp.json();
    }

    static async DeleteArticle(article_id) {

        return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 5365599a52d9a85b1550661b81833c7495ef42b1'
            },
        })
    }

}