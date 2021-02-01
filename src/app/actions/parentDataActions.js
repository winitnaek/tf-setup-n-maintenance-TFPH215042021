import  {SET_PARENT_DATA} from '../../base/constants/ActionTypes';

export const setParentData = (data) => {
    return  {
        type: SET_PARENT_DATA,
        data: data
    }   
}  