import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Eventstate from "../../interfaces/states/EventState";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";

const initialState: Eventstate = {
    events: [],
    status_code: null,
    loading: false,
    error: null
}

export const getAllEvents = createAsyncThunk(
    'event/getAllEvents',
    async () => {
        try{
            const response = await axiosHttp.get('/events')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const createEvent = createAsyncThunk(
    'event/createEvent',
    async (event: FormData) => {
        try{
            const response = await axiosHttp.post('/events', event)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async (id: number) => {
        try{
            await axiosHttp.delete(`/events/${id}`)
            return {id}
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

interface UpdateEventPayload {
    id: number
    data: FormData
}

export const updateEvent = createAsyncThunk(
    'event/updateEvent',
    async (payload: UpdateEventPayload) => {
        try{
            const response = await axiosHttp.post(`/events/${payload.id}?_method=PUT`, payload.data)
            console.log(response.data);
            
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllEvents.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllEvents.fulfilled, (state, action) => {
                state.loading = false
                state.events = action.payload
            })
            .addCase(getAllEvents.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(createEvent.pending, (state) => {
                state.loading = true
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.loading = false
                state.events.push(action.payload)
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(deleteEvent.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.loading = false
                state.events = state.events.filter(event => event.id !== action.payload.id)
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(updateEvent.pending, (state) => {
                state.loading = true
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.loading = false
                state.events = state.events.map(event => event.id === action.payload.id ? action.payload : event)
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })
    }
})

export default eventSlice.reducer