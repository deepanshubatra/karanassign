import { Dispatch } from "redux";
import * as index from "./index";
import axios from 'axios';

export const getPublishedItems = () => {
  const query = {
    "from": 0, "size": 20, "query": {
      "bool": {
        "filter": [{ "term": { "entityState.itemID": 5 } }]
      }
    }
  };
  return async (dispatch: Dispatch<any>) => {
    axios.post('http://localhost:3000/searchRoles', query)
      .then(res => {
        var filteredData = filterItems(res.data.hits.hits);
        dispatch({
          allItems: filteredData,
          type: index.ActionTypes.GET_ALL_ITEMS,
        });
      })
      .catch(error => { console.log(error) })
  };
}
export const getAllItems = () => {
  const query = {
    "from": 0, "size": 20, "query": {
      "bool": {
        "should": [
          {
            "match": {
              "entityState.itemID": 5
            }
          },
          {
            "match": {
              "entityState.itemID": 7
            }
          }
        ]
      }
    }
  };
  return async (dispatch: Dispatch<any>) => {
    axios.post('http://localhost:3000/searchRoles', query)
      .then(res => {
        var filteredData = filterItems(res.data.hits.hits);
        dispatch({
          allItems: filteredData,
          type: index.ActionTypes.GET_ALL_ITEMS,
        });
      })
      .catch(error => { console.log(error) })
  };
}
export const searchByNameAndDescription = (searchText: any) => {
  const query = {
    "from": 0, "size": 20, "query": {
      "multi_match": {
        "query": searchText,
        "fields": ["name", "description"]
      }
    }
  };
  return async (dispatch: Dispatch<any>) => {
    if (searchText.length !== 0) {
      axios.post('http://localhost:3000/searchRoles', query)
        .then(res => {
          var array = filterItems(res.data.hits.hits);
          dispatch({
            allItems: array,
            type: index.ActionTypes.GET_ALL_ITEMS,
          });
        })
        .catch(error => { console.log(error) })
    } else {
      dispatch<any>(getPublishedItems());
    }
  }
}
const filterItems = (hits) => {
  var items = []
  hits.map((item) => {
    items.push(item._source);
  })
  return items;
}