import { combineReducers } from '@reduxjs/toolkit';
import mockup_statistics_store from './mockup_stores/statistics_store'
import mockup_auth_store from './mockup_stores/auth_store'
import mockup_notification_store from './mockup_stores/notification_store'

const mockupRootReducer = combineReducers({
    statistics_store: mockup_statistics_store,
    auth_store: mockup_auth_store,
    notification_store: mockup_notification_store
});

export default mockupRootReducer;
