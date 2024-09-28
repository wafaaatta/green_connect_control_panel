import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ArticleCategoryState from "../../interfaces/states/ArticleCategoryState";
import ApiError from "../../interfaces/ApiError";
import { AxiosError } from "axios";
import axiosHttp from "../../utils/axios_client";

const initialState: ArticleCategoryState = {
    categories: [],
    status_code: null,
    loading: false,
    error: null
}

export const getAllCategories = createAsyncThunk(
    'articleCategory/getAllCategories',
    async () => {
        try{
            const response = await axiosHttp.get('article-categories')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)


export const createCategory = createAsyncThunk(
    'articleCategory/createCategory',
    async (name: string) => {
        try{
            const response = await axiosHttp.post('article-categories', {
                name
            })
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'articleCategory/deleteCategory',
    async (id: number) => {
        try{
            const response = await axiosHttp.delete(`article-categories/${id}`)
            return response.data
        }catch(error){
            console.log(
                ApiError.from(error as AxiosError)
            );
            throw ApiError.from(error as AxiosError)
        }
    }
)

interface UpdateCategoryPayload {
    id: number
    name: string
}

export const updateCategory = createAsyncThunk(
    'articleCategory/updateCategory',
    async (payload: UpdateCategoryPayload) => {
        try{
            const response = await axiosHttp.post(`/article-categories/${payload.id}?_method=PUT`, {
                name: payload.name
            })
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const articleCategorySlice = createSlice({
    name: 'articleCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })

            .addCase(createCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false
                state.categories.push(action.payload)
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })

            .addCase(deleteCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false
                state.categories = state.categories.filter(category => category.id !== action.payload.id)
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })

            .addCase(updateCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false
                state.categories = state.categories.map(category => category.id === action.payload.id ? action.payload : category)
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })
    }
})

export default articleCategorySlice.reducer