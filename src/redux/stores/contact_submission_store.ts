import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ContactSubmissionState from "../../interfaces/states/ContactSubmissionState";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";

const initialState: ContactSubmissionState = {
    contact_submissions: [],
    status_code: null,
    loading: false,
    error: null
}

export const getAllContactSubmissions = createAsyncThunk(
    'contactSubmission/getAllContactSubmissions',
    async () => {
        try{
            const response = await axiosHttp.get('/contact-submissions')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const deleteContactSubmission = createAsyncThunk(
    'contactSubmission/deleteContactSubmission',
    async (id: number) => {
        try{
            await axiosHttp.delete(`/contact-submissions/${id}`)
            return id
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const contactSubmissionSlice = createSlice({
    name: 'contactSubmission',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllContactSubmissions.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllContactSubmissions.fulfilled, (state, action) => {
                state.loading = false
                state.contact_submissions = action.payload
            })
            .addCase(getAllContactSubmissions.rejected, (state) => {
                state.loading = false
            })


            .addCase(deleteContactSubmission.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteContactSubmission.fulfilled, (state, action) => {
                state.loading = false
                state.contact_submissions = state.contact_submissions.filter((submission) => submission.id !== action.payload)
            })
            .addCase(deleteContactSubmission.rejected, (state) => {
                state.loading = false
            })
    }
})

export default contactSubmissionSlice.reducer