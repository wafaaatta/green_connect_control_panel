import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import AnnounceState from "../../interfaces/states/announce_state";
import axiosHttp from "../../utils/axios_client";

const initialState: AnnounceState = {
    announces: [],
    status_code: null,
    loading: false,
    error: null
}

export const getAllAnnounces = createAsyncThunk(
    'announce/getAllAnnounces',
    async () => {
        try{
            const response = await axiosHttp.get('/announces')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const acceptAnnounce = createAsyncThunk(
    'announce/acceptAnnounce',
    async (id: number) => {
        try{
            const response = await axiosHttp.patch(`/announces/${id}`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const rejectAnnounce = createAsyncThunk(
    'announce/rejectAnnounce',
    async (id: number) => {
        try{
            const response = await axiosHttp.patch(`/announces/${id}`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const announceSlice = createSlice({
    name: 'announce',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllAnnounces.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllAnnounces.fulfilled, (state, action) => {
                state.loading = false
                state.announces = action.payload
            })
            .addCase(getAllAnnounces.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(acceptAnnounce.pending, (state) => {
                state.loading = true
            })
            .addCase(acceptAnnounce.fulfilled, (state, action) => {
                state.loading = false
                state.announces = action.payload
            })
            .addCase(acceptAnnounce.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(rejectAnnounce.pending, (state) => {
                state.loading = true
            })
            .addCase(rejectAnnounce.fulfilled, (state, action) => {
                state.loading = false
                state.announces = action.payload
            })
            .addCase(rejectAnnounce.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })
    }
})

export default announceSlice.reducer