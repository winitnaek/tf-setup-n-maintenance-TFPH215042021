
import {fetchLinksPending, fetchLinksSuccess, fetchLinksError} from './linksActions';

const url = `http://localhost:8000/api/getLinks/`

export function fetchLinks() {
    return dispatch => {
        dispatch(fetchLinksPending());
        fetch(url)
        .then(res => res.json())
        .then(res => { 
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchLinksSuccess(res))
            return res.details;
        })
        .catch(error => {
            dispatch(fetchLinksError(error));
        })
    }
}

export default fetchLinks;
