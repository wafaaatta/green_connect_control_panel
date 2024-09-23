import { combineReducers } from '@reduxjs/toolkit';
import notification_store from './stores/notification_store';
import article_category_store from './stores/article_category_store';
import article_store from './stores/article_store';


const rootReducer = combineReducers({
    notification_store: notification_store,
    article_category_store: article_category_store,
    article_store: article_store
});

export default rootReducer;
