import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/countries", {});
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
  };
}

export function filterByContinents(payload) {
  return {
    type: "FILTER_COUNTRIES_BY_CONTINENT",
    payload,
  };
}

export function getActivities() {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/activities`)
      .then((info) => {
        return dispatch({
          type: "GET_ACTIVITIES",
          payload: info.data,
        });
      })
      .catch((err) => console.log(err));
  };
}
export function filterByActivities(activity) {
  return {
    type: "FILTER_BY_ACTIVITIES",
    payload: activity,
  };
}

export function countryByName(name) {
  return {
    type: "GET_BY_NAME",
    payload: name,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: "ORDER_COUNTRIES_POPULATION",
    payload,
  };
}

export function getCountriesSearch(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/countries?name=" + name
      );
      return dispatch({
        type: "GET_NAME_COUNTRY",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCountriesDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/countries/" + id);
      return dispatch({
        type: "GET_COUNTRY_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postActivity(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/activities",
      payload
    );
    console.log(response);
    return response;
  };
}
