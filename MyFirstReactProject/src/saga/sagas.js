import {
  put,
  takeLatest,
  call,
  fork,
  join
} from "redux-saga/effects";
import {
  setData,
  stopLoading,
  loadingFailure,
  setProp,
  constants
} from "../reduxStuff/actions";

function fetchData(url) {
  return fetch(url)
    .then(response => response.json());
}

function* fetchPersonsSaga({ url }) {
  try {
    while (url) {
      // const { results } = yield call(fetchData, url);
      const { results, next } = yield call(fetchData, url);
      yield put(setData(results));
      // url = "";
      url = next;
    }
    yield put(stopLoading());
  } catch (error) {
    yield put(loadingFailure(error));
  }
}

function* fetchProp(url) {
  return yield call(fetchData, url);
}

function* fetchPropsSaga({ payload }) {
  const { personName, ...propList } = payload;
  let response;
  let val;
  let result;
  for (const prop in propList) {
    result = { prop, personName };
    if (typeof propList[prop] === "object") {
      result = { ...result, val: [] };
      for (const index in propList[prop]) {
        response = yield fork(fetchProp, propList[prop][index]);// url
        response = yield join(response);
        val = response[prop === "films" ? "title" : "name"];
        result = { ...result, val: [...result.val, val] };
      }
    } else {
      response = yield fork(fetchProp, propList[prop]);// url
      response = yield join(response);
      val = response[prop === "films" ? "title" : "name"];
      result = { ...result, val };
    }
    yield put(setProp(result));
  }
}

export function* watcherSaga() {
  yield takeLatest(constants.FETCH_PROPS, fetchPropsSaga);
  yield takeLatest(constants.START_LOADING, fetchPersonsSaga);
}
