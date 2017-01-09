import fetch from 'isomorphic-fetch'

const INITIAL_STATE = {
	list: [],
	selectedRows: [],
	currentItem: {}
}

const FETCH_LIST = 'FETCH_LIST'
const fetchList = ()=> (dispatch)=> {
	dispatch({type: FETCH_LIST});
	fetch('/api/items?n=50')
		.then(resp => resp.json())
		.then(data => dispatch(fetchListSuccess(data)))
		.catch(err => dispatch(fetchListError(err)))
}


const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
const fetchListSuccess = (list)=> {
	console.log('Received List: ', list)
	return {
		type: FETCH_LIST_SUCCESS,
		list
	}
}

const FETCH_LIST_ERROR = 'FETCH_LIST_ERROR'
const fetchListError = (error)=> {
	console.error(error)
	return {
		type: FETCH_LIST_ERROR,
		error: error.message
	}
}


const SELECT_ROWS = 'SELECT_ROWS'
const selectRows = (ids)=> {
	return {
		type: SELECT_ROWS,
		ids
	}
}

const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM'
const setCurrentItem = (item)=> {
	return {
		type: SET_CURRENT_ITEM,
		item
	}
}


export const actions = {
	fetchList,
	selectRows,
	setCurrentItem
}


export default function DataReducer(state = INITIAL_STATE, action){
	switch(action.type){
		case FETCH_LIST:
			return {...state, isLoading: true }
		case FETCH_LIST_SUCCESS:
			return { ...state, isLoading: false, list: [...action.list] }
		case FETCH_LIST_ERROR:
			return {...state, isLoading: false, hasError: action.error }
		case SELECT_ROWS:
			return {...state, selectedRows: [...action.ids]}
		case SET_CURRENT_ITEM:
			return {...state, currentItem: {...action.item}}
		default:
			return state
	}
}