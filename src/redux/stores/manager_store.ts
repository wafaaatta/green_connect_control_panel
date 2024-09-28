import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import ManagerState from "../../interfaces/states/manager_state";
import axiosHttp from "../../utils/axios_client";

const initialState: ManagerState = {
    managers: [],
    status_code: null,
    loading: false,
    error: null
}

export const getAllManagers = createAsyncThunk(
    'manager/getAllManagers',
    async () => {
        try{
            const response = await axiosHttp.get('managers')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

interface CreateManagerPayload {
    name: string
    email: string
    password: string
}

export const createManager = createAsyncThunk(
    'manager/createManager',
    async (manager: CreateManagerPayload) => {
        try{
            const response = await axiosHttp.post('managers', manager)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const deleteManager = createAsyncThunk(
    'manager/deleteManager',
    async (id: number) => {
        try{
            await axiosHttp.delete(`managers/${id}`)
            return id
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

interface UpdateManagerPayload {
    id: number,
    data: {
        name: string
        email: string
        password: string
    }
}

export const updateManager = createAsyncThunk(
    'manager/updateManager',
    async (payload: UpdateManagerPayload) => {
        try{
            const response = await axiosHttp.post(`managers/${payload.id}?_method=PUT`, payload.data)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)


const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllManagers.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllManagers.fulfilled, (state, action) => {
                state.managers = action.payload
                state.loading = false
            })
            .addCase(getAllManagers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message as string
            })


            .addCase(createManager.pending, (state) => {
                state.loading = true
            })
            .addCase(createManager.fulfilled, (state, action) => {
                state.managers.push(action.payload)
                state.loading = false
            })
            .addCase(createManager.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message as string
            })


            .addCase(deleteManager.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteManager.fulfilled, (state, action) => {
                state.managers = state.managers.filter((manager) => manager.id !== action.payload)
                state.loading = false
            })
            .addCase(deleteManager.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message as string
            })


            .addCase(updateManager.pending, (state) => {
                state.loading = true
            })
            .addCase(updateManager.fulfilled, (state, action) => {
                state.managers = state.managers.map((manager) => {
                    if (manager.id === action.payload.id) {
                        return action.payload
                    }
                    return manager
                })
                state.loading = false
            })
            .addCase(updateManager.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message as string
            })
    }
})


export default managerSlice.reducer