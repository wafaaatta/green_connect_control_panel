import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatisticsState from "../../interfaces/states/statistics_state";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";

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


const mockupStatisticsSlice = createSlice({
    name: 'statistics',
    initialState: initalState,
    reducers: {
        getStatistics: (state) => {
            const data =
                 {
                    statistics: {
                      articles: 10,
                      events: 5,
                      managers: 2,
                      users: 100,
                      announces: 3,
                      contact_submissions: 15,
                    },
                    userGraph: [
                      { month: 'January', count: 5 },
                      { month: 'February', count: 10 },
                    ],
                    groupedStatistics: [
                      { month: 'January', events: 3, announces: 1, articles: 2 },
                      { month: 'February', events: 2, announces: 2, articles: 5 },
                    ],
                    articlesByCategory: [
                      { category: 'Tech', count: 5 },
                      { category: 'Health', count: 3 },
                    ],
                  }
            state.loading = true
            state.status_code = 200
            state.error = null
            state.userGraph = data.userGraph
            state.groupedStatistics = data.groupedStatistics
            state.articlesByCategory = data.articlesByCategory
            state.statistics = data.statistics
            state.loading = false
            state.error = null
            state.status_code = 200
        },
    }
})

export const { getStatistics } = mockupStatisticsSlice.actions
export default mockupStatisticsSlice.reducer