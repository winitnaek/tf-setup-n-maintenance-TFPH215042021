import {
  GET_FAVORITE_LINKS,
  SAVE_FAVORITE_LINKS,
  FETCH_FAVORTIE_LINKS_ERROR,
  FETCH_FAVORITE_LINKS_SUCCESS,
  FETCH_FAVORITE_LINKS_PENDING
} from "../../../base/constants/LinksConstants";
import favoriteLinksAPI from '../../home/actions/favoriteLinksAPI'
import { tftools } from "../../../base/constants/TFTools";
export function getFavoriteLinks(loginId, moduleId) {
  return function (dispatch, getState) {
      const state = getState();
      return favoriteLinksAPI.getFavoriteLinks(loginId,moduleId).then(favLink => {
          if(favLink){
              if(favLink && favLink.length >=0){
                  dispatch(getFavoriteLinksSuccess(favLink));
              }else if(favLink && favLink.message){
                  dispatch(getFavoriteLinksError(favLink));
              }
          }else{
              throw favLink;
          }
      }).catch(error => {
          generateAppErrorEvent(error.type,error.status,error.message,error);
      });
  };
}

function buildFavoriteLinks(favLink){
  let excluededPages=[];
  if(!isMock()){
    excluededPages = ["testHarness", "selectSamplePage", "dateFieldDoc","UQ","CD","GD","CT","MT","TS"];
  }
  let favoriteAreas =[]
  let tfTools =  tftools.filter(tool => !excluededPages.includes(tool.value));
  if(favLink && favLink.length > 0){
    favLink.forEach(function(item){
      console.log('ID: ' + item.linkid);
      console.log('ID: ' + item.toolName);
      tfTools.forEach(function(tft){
        if(tft.label===item.toolName){
          console.log('DIDIDIDI: ' + tft.label);
          favoriteAreas.push(tft);
        }
      })
    });
  }
  return favoriteAreas;
}

export function getFavoriteLinksSuccess(favLink) {
  return { type: FETCH_FAVORITE_LINKS_SUCCESS, favLink };
}
export function getFavoriteLinksError(favLink) {
  return { type: FETCH_FAVORITE_LINKS_SUCCESS, favLink };
}
export function fetchFavoriteLinksPending() {
  return {
    type: FETCH_FAVORITE_LINKS_PENDING
  };
}

export function fetchFavoriteLinksSuccess(details) {
  console.log(details);
  return {
    type: FETCH_FAVORITE_LINKS_SUCCESS,
    data: details
  };
}

export function fetchFavoriteLinksError(error) {
  return {
    type: FETCH_FAVORTIE_LINKS_ERROR,
    error: error
  };
}

export const saveFavoriteLinks = payload => {
  return {
    type: SAVE_FAVORITE_LINKS,
    payload: payload
  };
};

export function deleteFavoriteLink(loginId,linkid, moduleId,payload) {
  return function (dispatch, getState) {
      const state = getState();
      return favoriteLinksAPI.deleteFavoriteLink(loginId,linkid,moduleId).then(output => {
          if(favLink){
              if(output.status=='SUCCESS'){
                  dispatch(saveFavoriteLinks(payload));
              }else if(output.status=='ERROR'){
                  dispatch(fetchFavoriteLinksError(favLink));
              }
          }else{
              throw output;
          }
      }).catch(error => {
          generateAppErrorEvent(error.type,error.status,error.message,error);
      });
  };
}
