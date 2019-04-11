import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "../saga/sagas";
import mainReducer from "./reducer";

const sagaMiddl = createSagaMiddleware();
const store = createStore(mainReducer, applyMiddleware(sagaMiddl));
sagaMiddl.run(watcherSaga);

export default store;
