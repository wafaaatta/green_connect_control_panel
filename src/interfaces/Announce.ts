interface Announce {
    id: number
    title: string
    description: string
    country: string
    city: string
    postal_code: string
    request_type: 'creation' | 'modification'
    status: 'pending' | 'accepted' | 'rejected'
}

export default Announce