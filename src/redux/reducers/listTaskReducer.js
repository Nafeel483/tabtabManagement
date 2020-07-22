import { ADD_LIST, LIST_TASK, DELETE_TASK } from '../actions/types';

const initialState = {
	listTasks : [],
	task      : {},
};

export default function (state = initialState, action){
	switch (action.type) {
		case LIST_TASK:
			return { ...state, listTasks: action.payload };

		case ADD_LIST:
			return { ...state, task: action.payload };

		case DELETE_TASK:
			let result = state.listTasks.filter((el) => el.name !== action.payload);
			return { ...state, listTasks: result };
		default:
			return state;
	}
}
