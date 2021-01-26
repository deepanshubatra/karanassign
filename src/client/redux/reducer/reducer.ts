import _ from "lodash";
import { Reducer } from "redux";
import { ActionTypes } from "../actions/index";

export const reduxReducer: Reducer<any> = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_ITEMS: {
      return {
        ...state,
        allItemsReducer: action.allItems,
      };
    }
   
    default:
      return state;
  }
};
