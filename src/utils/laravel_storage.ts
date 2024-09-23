import { storageUrl } from "../constants/app_constants"

export const getFileUrl = (endpoint: string) => {
    return `${storageUrl}/${endpoint}`
}