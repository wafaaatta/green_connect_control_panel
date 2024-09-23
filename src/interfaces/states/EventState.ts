import ApiInterface from "../ApiInterface"
import Event from "../Event"

interface Eventstate extends ApiInterface {
    events: Event[]
}

export default Eventstate