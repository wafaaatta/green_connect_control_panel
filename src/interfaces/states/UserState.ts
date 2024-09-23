import User from '../User';
import ApiInterface from './../ApiInterface';

interface UserState extends ApiInterface{
    users: User[]
}

export default UserState