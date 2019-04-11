export const constants = {
  AUTHENTICATE:   "AUTHENTIFICATE",
  SET_DATA:       "SET_DATA",
  START_LOADING:  "START_LOADING",
  FINISH_LOADING: "FINISH_LOADING",
  LOADING_ERROR:  "LOADING_ERROR",
  FETCH_PROPS:    "FETCH_PROPS",
  SET_PROP:       "SET_PROP"
};

export const authenticate = credentials => ({ type: constants.AUTHENTICATE, payload: credentials });
export const setData = data => ({ type: constants.SET_DATA, payload: data });

export const startLoading = () => ({ type: constants.START_LOADING, url: "https://swapi.co/api/people/" });
export const stopLoading = () => ({ type: constants.FINISH_LOADING });
export const loadingFailure = error => ({ type: constants.LOADING_ERROR, payload: error });

export const fetchProps = info => ({ type: constants.FETCH_PROPS, payload: info });
export const setProp = propVal => ({ type: constants.SET_PROP, payload: propVal });
