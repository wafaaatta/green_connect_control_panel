export const checkAuthentication = (): boolean => {
    const token = localStorage.getItem('token');
    return token != null;
}

export const getAuthenticationToken = (): string | null  => {
    return localStorage.getItem('token')
}

export const saveAuthenticationToken = (token: string) => {
    localStorage.setItem('token', token)
}

export const removeAuthenticationToken = () => {
    localStorage.removeItem('token')
}