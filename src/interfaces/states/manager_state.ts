import ApiInterface from "../ApiInterface";
import Manager from "../Manager";

interface ManagerState extends ApiInterface{
    managers: Manager[];
}

export default ManagerState