import axios from "axios";

export class  articleAPI{
    static async fetchArticle() {
        return (
            await axios.get(`https://jsonplaceholder.typicode.com/posts`)).data
    }
}