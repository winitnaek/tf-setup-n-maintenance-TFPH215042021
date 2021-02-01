import  {SET_FORM_DATA, SAVE_FORM_DATA, CLOSE_FORM} from '../../base/constants/ActionTypes';

export const setFormData = (data) => {
    console.log('setting form data')
    return  {
        type: SET_FORM_DATA,
        data: data
    }   
}

export const saveFormData = (data) => {
    return  { 
        type: SAVE_FORM_DATA,
        data: data
    }   
}


export const closeForm = () => {
    return  {
        type: CLOSE_FORM,
    }   
}
