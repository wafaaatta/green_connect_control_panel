import { combineReducers } from '@reduxjs/toolkit';
import notification_store from './stores/notification_store';
import article_category_store from './stores/article_category_store';
import article_store from './stores/article_store';
import event_store from './stores/event_store';
import user_store from './stores/user_store';
import announce_store from './stores/announce_store';
import auth_store from './stores/auth_store';
import statistics_store from './stores/statistics_store';
import manager_store from './stores/manager_store';
import contact_submission_store from './stores/contact_submission_store';


const rootReducer = combineReducers({
    notification_store: notification_store,
    article_category_store: article_category_store,
    article_store: article_store,
    event_store: event_store,
    user_store: user_store,
    announce_store: announce_store,
    auth_store: auth_store,
    statistics_store: statistics_store,
    manager_store: manager_store,
    contact_submission_store: contact_submission_store
});

export default rootReducer;
