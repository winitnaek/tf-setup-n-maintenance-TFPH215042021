import * as types from "../../../base/constants/LinksConstants";
import initialState from "../../../base/config/initialState";

const favoriteLinks = (state = initialState.favoriteAreas, action) => {
  console.log(action);
  console.log(types.SAVE_FAVORITE_LINKS);
  switch (action.type) {
    case types.FETCH_FAVORITE_LINKS_SUCCESS: {
      return state = action.favLink;
    }
    case types.SAVE_FAVORITE_LINKS:
      return [...action.payload];
    default:
      return state;
  }
};

export default favoriteLinks;
