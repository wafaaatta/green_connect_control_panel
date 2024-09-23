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
            const response = await axiosHttp.get('/article-categories')
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
    }
})

export default articleCategorySlice.reducer