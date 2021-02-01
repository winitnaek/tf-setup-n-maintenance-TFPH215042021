import  {SET_FILTER_FORM_DATA} from '../../base/constants/ActionTypes';

export const setFilterFormData = (data) => {
    console.log('Made it to the filterform action', data)
    return  {
        type: SET_FILTER_FORM_DATA,
        data: data
    }   
}  