import { combineReducers } from '@reduxjs/toolkit';
import notification_store from './stores/notification_store';
import article_category_store from './stores/article_category_store';
import article_store from './stores/article_store';
import event_store from './stores/event_store';
import user_store from './stores/user_store';
import announce_store from './stores/announce_store';
import statistics_store from './stores/statistics_store';


const rootReducer = combineReducers({
    notification_store: notification_store,
    article_category_store: article_category_store,
    article_store: article_store,
    event_store: event_store,
    user_store: user_store,
    announce_store: announce_store,
    statistics_store: statistics_store
});

export default rootReducer;
