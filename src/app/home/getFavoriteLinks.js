
import {fetchFavoriteLinksPending, fetchFavortieLinksSuccess, fetchFavoriteLinksError} from './linksActions';

const url = `http://localhost:8000/api/getLinks/`

export function fetchFavoriteLinks() {
    return dispatch => {
        dispatch(fetchFavoriteLinksPending());
        fetch(url)
        .then(res => res.json())
        .then(res => { 
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchFavoriteLinksSuccess(res))
            return res.details;
        })
        .catch(error => {
            dispatch(fetchFetchLinksError(error));
        })
    }
}

export default fetchFavoriteLinks;