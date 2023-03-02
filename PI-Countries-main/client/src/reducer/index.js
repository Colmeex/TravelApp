const initialState = {
  countries: [],
  allCountries: [],
  allActivities: [],
  activities: [],
  detail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case "GET_NAME_COUNTRY":
      return {
        ...state,
        countries: action.payload,
      };
    case "GET_COUNTRY_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "FILTER_COUNTRIES_BY_CONTINENT":
      const allCountries = state.allCountries;
      const continentFiltred =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((el) => el.continent === action.payload);
      return {
        ...state,
        countries: continentFiltred,
      };
    case "GET_ACTIVITIES":
      return {
        ...state,
        allActivities: action.payload,
      };
    case "POST_ACTIVITIES":
      return {
        ...state,
      };
    case "FILTER_BY_ACTIVITIES":
      const allCountries2 = state.allCountries;

      const solo = allCountries2.filter((pais) => {
        return pais.Activities.length > 0;
      });

      let array = [];

      for (let i = 0; i < solo.length; i++) {
        for (let j = 0; j < solo[i].Activities.length; j++) {
          if (solo[i].Activities[j].name === action.payload) {
            array.push(solo[i]);
          }
        }
      }

      const filtro = action.payload === "Todos" ? allCountries2 : array;

      return {
        ...state,
        countries: filtro,
      };

    case "GET_BY_NAME":
      let nombre =
        action.payload === ""
          ? state.allCountries
          : state.countries.filter(
              (e) =>
                e.name.toLowerCase().includes(action.payload.toLowerCase()) ||
                e.name === action.payload
            );
      return {
        ...state,
        countries: nombre,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedArr,
      };
    case "ORDER_COUNTRIES_POPULATION":
      let sortedArrPopulation =
        action.payload === "popAsc"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedArrPopulation,
      };
    default:
      return state;
  }
}
export default rootReducer;
