import { GET_ALL_USERS, GET_CURRENT_PAGE, GET_SINGLE_USER_BY_ID, TOTAL_COUNT } from "../../utils/type";

const initialState = {
  getAllUsers: [],
  totalCount: [],
  getCurrentPage:1,
  getSingleUserById:{}
};


export default (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_USERS:
        return {
          ...state,
          getAllUsers: action.payload,
        };
      case TOTAL_COUNT:
        return {
          ...state,
          totalCount: action.payload,
        };
      case GET_CURRENT_PAGE:
        return {
          ...state,
          getCurrentPage: action.payload,
        };
      case GET_SINGLE_USER_BY_ID:
        return {
          ...state,
          getSingleUserById: action.payload,
        };
      default:
        return state;
    }
  };
  