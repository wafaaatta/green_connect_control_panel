interface Announce {
    id: number
    title: string
    description: string
    location: string
    status: 'pending' | 'accepted' | 'rejected'
}

export default Announce