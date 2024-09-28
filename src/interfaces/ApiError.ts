import { AxiosError } from "axios";

interface HostError{
    message: string
}

class ApiError{
    message: string | null = null
    
    static from(error: AxiosError){
        return (error.response?.data as HostError).message
    }
}

export default ApiError