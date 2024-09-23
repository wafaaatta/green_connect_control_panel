import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import ApiError from "../../interfaces/ApiError"
import UserState from "../../interfaces/states/UserState"
import axiosHttp from "../../utils/axios_client"

const initialState: UserState = {
    users: [],
    status_code: null,
    loading: false,
    error: null
}

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async () => {
        try{
            const response = await axiosHttp.get('/users')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })

    }
})

export default userSlice.reducer