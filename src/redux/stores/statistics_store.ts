import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatisticsState from "../../interfaces/states/statistics_state";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";

const initalState: StatisticsState = {
    statistics: {
        articles: 0,
        events: 0,
        managers: 0,
        users: 0,
        announces: 0,
        contact_submissions: 0
    },
    userGraph: [],
    groupedStatistics: [],
    articlesByCategory: [],
    status_code: null,
    loading: false,
    error: null,
}

export const getStatistics = createAsyncThunk(
    'statistics/getStatistics',
    async () => {
        try{
            const response = await axiosHttp.get('/statistics')
            console.log(response.data);
            
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatistics.fulfilled, (state, action) => {
            state.statistics = action.payload.statistics
            state.userGraph = action.payload.userGraph
            state.groupedStatistics = action.payload.groupedStatistics
            state.articlesByCategory = action.payload.articlesByCategory
            state.loading = false
        })

        builder.addCase(getStatistics.rejected, (state, action) => {
            state.error = action.error as string
        })

        builder.addCase(getStatistics.pending, (state) => {
            state.loading = true
        })
    }
})

export default statisticsSlice.reducer