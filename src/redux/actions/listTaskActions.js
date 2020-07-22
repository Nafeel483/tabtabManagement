import { ADD_LIST, LIST_TASK, DELETE_TASK } from '../actions/types';

export function fetchlistTask (){
	return {
		type    : LIST_TASK,
		payload : [],
	};
}

export function AddTask (task){
	return {
		type    : ADD_LIST,
		payload : { name: task, duration: '1 minute ago' },
	};
}

export function deleteTask (id){
	return {
		type    : DELETE_TASK,
		payload : id,
	};
}
