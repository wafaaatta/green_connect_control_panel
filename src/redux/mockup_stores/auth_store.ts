import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Manager from "../../interfaces/Manager"
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


const mockAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginManager: (state, action: PayloadAction<{ email: string, password: string }>) => {
            if(action.payload.email != 'test@example.com') {
                state.status_code = 404
                state.error = 'Wrong Email'
                return
            }

            if(action.payload.password != 'test') {
                state.status_code = 400
                state.error = 'Wrong Password'
                return
            }

            state.manager = {
                name: 'test',
                email: 'test@example.com',
                id: Math.floor((Math.random() * 100000)),
            }
            state.authorizations = ['*']
            state.isAuthenticated = true
            state.status_code = 200

            saveAuthenticationToken('test-token')
        },
        logout: (state) => {
            state.manager = null
            state.authorizations = []
            state.isAuthenticated = false

            removeAuthenticationToken()
        }
    }
})


export const { logout, loginManager } = mockAuthSlice.actions
export default mockAuthSlice.reducer