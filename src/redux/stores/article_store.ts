import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ArticleState from "../../interfaces/states/ArticleState";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";

const initialState: ArticleState = {
    articles: [],
    status_code: null,
    loading: false,
    error: null
}

export const getAllArticles = createAsyncThunk(
    'article/getAllArticles',
    async () => {
        try{
            const response = await axiosHttp.get('/articles')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const createArticle = createAsyncThunk(
    'article/createArticle',
    async (article: FormData) => {
        try{
            const response = await axiosHttp.post('/articles', article)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)


export const deleteArticle = createAsyncThunk(
    'article/deleteArticle',
    async (id: number) => {
        try{
            await axiosHttp.delete(`/articles/${id}`)
            return { id }
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

interface UpdateArticlePayload {
    id: number
    data: FormData
}

export const updateArticle = createAsyncThunk(
    'article/updateArticle',
    async (payload: UpdateArticlePayload) => {
        try{
            const response = await axiosHttp.post(`/articles/${payload.id}?_method=PUT`, payload.data)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllArticles.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllArticles.fulfilled, (state, action) => {
                state.loading = false
                state.articles = action.payload
            })
            .addCase(getAllArticles.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(createArticle.pending, (state) => {
                state.loading = true
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.loading = false
                state.articles.unshift(action.payload)
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(deleteArticle.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.loading = false
                state.articles = state.articles.filter((article) => article.id !== action.payload.id)
            })
            .addCase(deleteArticle.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(updateArticle.pending, (state) => {
                state.loading = true
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                state.loading = false
                state.articles = state.articles.map((article) => article.id === action.payload.id ? action.payload : article)
            })
            .addCase(updateArticle.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })
    }
})

export default articleSlice.reducer