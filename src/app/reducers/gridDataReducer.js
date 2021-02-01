import {FETCH_GRID_DATA_PENDING, FETCH_GRID_DATA_SUCCESS, FETCH_GRID_DATA_ERROR} from '../actions/gridDataActions';

const initialState = {
    pending: false,
    data: [],
    error: null
}

export function gridDataReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_GRID_DATA_PENDING:   
            return {
         
                pending: true
            }
        case FETCH_GRID_DATA_SUCCESS:

            return {
               
                pending: false,
                data: action.data
            }
        case FETCH_GRID_DATA_ERROR:
            return {
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const getGirdData = state => state;
export const getGirdDataPending = state => state.pending;
export const getGirdDataError = state => state.error;

export default gridDataReducer;