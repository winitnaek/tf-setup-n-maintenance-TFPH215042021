import {
    USAGE,
    USAGE_SUCCESS,
    USAGE_FAILED
} from '../../base/constants/ActionTypes'

const initialState = {
    //isLoading: false,
    error: false,
    errors: false,
    recentUsage: []
}

export default function usage(state = initialState, action) {
    switch (action.type) {
        case USAGE: {
            return Object.assign({}, state, {
                isLoading: true
              })
            };
        case USAGE_SUCCESS: {
            return Object.assign({}, state, {
                isLoading: false,
                recentUsage: action.payload,
              })
        }
        case USAGE_FAILED: {
            return Object.assign({}, state, {
                isLoading: false,
                errors: action.error,
              })
        }
        default:
            return state
        }
  }