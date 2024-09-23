import ApiInterface from "../ApiInterface";
import Article from "../Article";

interface ArticleState extends ApiInterface{
    articles: Article[],
}

export default ArticleState