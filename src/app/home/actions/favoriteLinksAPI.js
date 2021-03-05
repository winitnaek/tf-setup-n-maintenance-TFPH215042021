import AppError from '../../../base/utils/AppError';
import {ADMIN_ERROR_MSG} from '../../../base/utils/AppErrorEvent';
class favoriteLinksAPI { 

  static getFavoriteLinks(loginId,moduleId) {
    let paramurl = `${'?login='}${loginId}${'&module='}${moduleId}`;
    var svcs_url = `${'/tfws/r/v1/FavoriteLinksService/getFavoriteLinks'}${paramurl}`;
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
    var svcs_url = `${'/tfws/r/v1/FavoriteLinksService/deleteFavoriteLink'}${paramurl}`;
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
    var svcs_url = `${'/tfws/r/v1/FavoriteLinksService/addToFavoriteLinks'}${paramurl}`;
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