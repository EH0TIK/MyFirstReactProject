import { constants } from "./actions";

const initialState = {
  isAuthentificated: false,
  user:              { login: "", password: "" },
  data:              [],
  isFetching:        false,
  dataFetched:       false,
  fetchError:        null
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.AUTHENTICATE:
      return { ...state, ...{ isAuthentificated: true, user: action.payload } };
    case constants.SET_DATA:
      return { ...state, data: [...state.data, ...action.payload] };
    case constants.START_LOADING:
      return { ...state, isFetching: true };
    case constants.FINISH_LOADING:
      return { ...state, isFetching: false, dataFetched: true };
    case constants.LOADING_ERROR:
      return {
        ...state, isFetching:  false, dataFetched: true, fetchError:  action.payload
      };
    case constants.FETCH_PROPS:
      return state;
    case constants.SET_PROP:
      const { payload } = action;
      const persons = state.data.slice();
      const person = persons.find(e => e.name === payload.personName);
      const index = persons.indexOf(person);

      person[payload.prop] = payload.val;
      persons[index] = person;
      return { ...state, data: persons };
    default:
      return state;
  }
};

export default mainReducer;
