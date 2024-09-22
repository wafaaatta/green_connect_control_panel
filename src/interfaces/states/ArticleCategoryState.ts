import ApiInterface from "../ApiInterface";
import ArticleCategory from "../ArticleCategory";

interface ArticleCategoryState extends ApiInterface{
    categories: ArticleCategory[]
}

export default ArticleCategoryState