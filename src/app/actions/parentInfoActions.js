import  {SET_PARENT_INFO} from '../../base/constants/ActionTypes';

export const setParentInfo = (data) => {
    return  {
        type: SET_PARENT_INFO,
        data: data
    }
}  