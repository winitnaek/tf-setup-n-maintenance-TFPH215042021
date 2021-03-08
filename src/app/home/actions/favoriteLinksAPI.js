import AppError from '../../../base/utils/AppError';
import {ADMIN_ERROR_MSG} from '../../../base/utils/AppErrorEvent';
import {generateUrl} from "bsiuilib";
class favoriteLinksAPI { 

  static getFavoriteLinks(loginId,moduleId) {
    let paramurl = `${'?login='}${loginId}${'&module='}${moduleId}`;
    var url = `${'/FavoriteLinksService/getFavoriteLinks'}${paramurl}`;
    let svcs_url = generateUrl.buildURL(url);
    return fetch(svcs_url,{
        credentials: 'same-origin'
    }).then(response => {
        if(response.ok){
          return response.json();
        }else{
          var errorCode =  response.status;
          var errorMsg  =  'Unable to Load Employee W2 Document. '+ADMIN_ERROR_MSG;
          return new AppError(errorMsg, errorCode);
        } 
    }).catch(error => {
      return error;
    });
  }
  static deleteFavoriteLink(loginId,linkid, moduleId) {
    let paramurl = `${'?login='}${loginId}${'&linkid='}${linkid}${'&module='}${moduleId}`;
    var url = `${'/FavoriteLinksService/deleteFavoriteLink'}${paramurl}`;
    let svcs_url = generateUrl.buildURL(url);
    return fetch(svcs_url,{
        credentials: 'same-origin'
    }).then(response => {
        if(response.ok){
          return response.json();
        }else{
          var errorCode =  response.status;
          var errorMsg  =  'Unable to Delete Favorite. '+ADMIN_ERROR_MSG;
          return new AppError(errorMsg, errorCode);
        } 
    }).catch(error => {
      return error;
    });
  }
  static addToFavoriteLinks(loginId,linkid, moduleId) {
    let paramurl = `${'?login='}${loginId}${'&linkid='}${linkid}${'&module='}${moduleId}`;
    var url = `${'/FavoriteLinksService/addToFavoriteLinks'}${paramurl}`;
    let svcs_url = generateUrl.buildURL(url);
    return fetch(svcs_url,{
        credentials: 'same-origin'
    }).then(response => {
        if(response.ok){
          return response.json();
        }else{
          var errorCode =  response.status;
          var errorMsg  =  'Unable to Add Favorite. '+ADMIN_ERROR_MSG;
          return new AppError(errorMsg, errorCode);
        } 
    }).catch(error => {
      return error;
    });
  }
}
export default favoriteLinksAPI;