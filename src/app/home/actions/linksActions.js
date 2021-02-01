import { fetchProducts } from "./getLinks";



export const FETCH_LINKS_PENDING = 'FETCH_LINKS_PENDING';
export const FETCH_LINKS_SUCCESS = 'FETCH_LINKS_SUCCESS';
export const FETCH_LINKS_ERROR = 'FETCH_LINKS_ERROR';

export function fetchLinksPending() {
    return {
        type: FETCH_LINKS_PENDING
    }
}

export function fetchLinksSuccess(details) {
    console.log(details)
    return {
        type: FETCH_LINKS_SUCCESS,
        data: details
    }
}

export function fetchLinksError(error) {
    return {
        type: FETCH_LINKS_ERROR,
        error: error
    }
}

