import Announce from "../Announce"
import ApiInterface from "../ApiInterface"

interface AnnounceState extends ApiInterface{
    announces: Announce[]
}

export default AnnounceState