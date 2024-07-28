import { combineReducers } from 'redux';
import baseReducer from './baseReducer';
import collectionReducer from './collectionReducer';

const reducer = combineReducers({
    base: baseReducer,
    collection: collectionReducer
});
export default reducer;