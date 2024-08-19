import { all, fork } from "redux-saga/effects";
import { watchFetchNews } from "./features/news/newsSaga";

export default function* rootSaga() {
  yield all([fork(watchFetchNews)]);
}
