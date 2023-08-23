import { combineReducers, configureStore } from '@reduxjs/toolkit';

/** call reducers */
import questionReducer from './question_reducer';
import resultReducer from './Result_reducer';

const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer
})

/** create store with reducer */
export default configureStore({ reducer : rootReducer});