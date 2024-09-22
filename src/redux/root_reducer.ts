import { combineReducers } from '@reduxjs/toolkit';
import notification_store from './stores/notification_store';


const rootReducer = combineReducers({
    notification_store: notification_store,
});

export default rootReducer;
