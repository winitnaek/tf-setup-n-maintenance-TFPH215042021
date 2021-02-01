export const FETCH_GRID_DATA_PENDING = 'FETCH_GRID_DATA_PENDING';
export const FETCH_GRID_DATA_SUCCESS = 'FETCH_GRID_DATA_SUCCESS';
export const FETCH_GRID_DATA_ERROR = 'FETCH_GRID_DATA_ERROR';

export function fetchGridDataPending() {
    return {
        type: FETCH_GRID_DATA_PENDING
    }
}

export function fetchGridDataSuccess(data) {
    
    return {
        type: FETCH_GRID_DATA_SUCCESS,
        data: data
    }
}

export function fetchSaveFormDataSuccess(data) {
    
    return {
        type: FETCH_GRID_DATA_SUCCESS,
        data: data
    }
}


export function fetchDeleteGridDataSuccess(details) {
    return {
        type: FETCH_GRID_DATA_SUCCESS,
        data: {}
    }
}

export function fetchGridDataError(error) {
    return {
        type: FETCH_GRID_DATA_ERROR,
        error: error
    }
}

