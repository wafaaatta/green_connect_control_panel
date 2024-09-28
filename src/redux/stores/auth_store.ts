import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Manager from "../../interfaces/Manager"
import { AxiosError } from "axios"
import ApiError from "../../interfaces/ApiError"
import axiosHttp from "../../utils/axios_client"
import { removeAuthenticationToken, saveAuthenticationToken } from "../../utils/authentication"

interface AuthState {
    status_code: number | null
    loading: boolean
    error: string | null
    manager: Manager | null
    authorizations: string[]
    isAuthenticated: boolean
}

const initialState: AuthState = {
    status_code: null,
    loading: false,
    error: null,
    manager: null,
    authorizations: [],
    isAuthenticated: false
}

export const loginManager = createAsyncThunk(
    'auth/login',
    async (data: {email: string, password: string}) => {
        try{
            const response = await axiosHttp.post('managers/login', data)
            saveAuthenticationToken(response.data.token)
            return response.data
        }catch(error){
            console.log(error);
            
            throw ApiError.from(error as AxiosError)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.manager = null
            state.authorizations = []
            state.isAuthenticated = false

            removeAuthenticationToken()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginManager.fulfilled, (state, action) => {
            state.manager = action.payload
            state.authorizations = action.payload.authorizations
            state.isAuthenticated = true
        })

        builder.addCase(loginManager.rejected, (state, action) => {
            state.manager = null
            state.authorizations = []
            state.isAuthenticated = false
        })

        builder.addCase(loginManager.pending, (state, action) => {
            state.loading = true
        })
    }
})


export const { logout } = authSlice.actions
export default authSlice.reducer