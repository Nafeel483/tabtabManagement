import { combineReducers } from 'redux';

import listTaskReducer from './listTaskReducer';

export default combineReducers({
	listTask : listTaskReducer,
});
