import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchNewsStart,
  fetchNewsSuccess,
  ItemFailure,
  addNewsItemSuccess,
  addNewsItemRequest,
  updateNewsItemRequest,
  updateNewsItemSuccess,
  NewsArticle,
  deleteNewsItemRequest,
  deleteNewsItemSuccess,
  searchNewsRequest,
  searchNewsSuccess,
} from "./newsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse, AxiosError } from "axios";

function* fetchNewsSaga() {
  try {
    const response: AxiosResponse<NewsArticle[]> = yield call(
      axios.get,
      "http://localhost:5000/news",
    );
    yield put(fetchNewsSuccess(response.data));
  } catch (error) {
    const err = error as AxiosError;
    yield put(ItemFailure(err.message));
  }
}

function* addNewsItemSaga(action: ReturnType<typeof addNewsItemRequest>) {
  try {
    const response: AxiosResponse<NewsArticle> = yield call(
      axios.post,
      "http://localhost:5000/news",
      action.payload,
    );
    yield put(addNewsItemSuccess(response.data));
  } catch (error) {
    const err = error as AxiosError;
    yield put(ItemFailure(err.message));
  }
}

function* updateNewsItemSaga(action: PayloadAction<NewsArticle>) {
  try {
    const response: AxiosResponse<NewsArticle> = yield call(
      axios.patch,
      `http://localhost:5000/news/${action.payload.id}`,
      action.payload,
    );
    yield put(updateNewsItemSuccess(response.data));
  } catch (error) {
    const err = error as AxiosError;
    yield put(ItemFailure(err.message));
  }
}

function* deleteNewsItemSaga(action: PayloadAction<string>) {
  try {
    yield call(axios.delete, `http://localhost:5000/news/${action.payload}`);
    yield put(deleteNewsItemSuccess(action.payload));
  } catch (error) {
    const err = error as AxiosError;
    yield put(ItemFailure(err.message));
  }
}

function* searchNewsSaga(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse<NewsArticle[]> = yield call(
      axios.get,
      "http://localhost:5000/news",
    );

    const filteredArticles = response.data.filter((article: NewsArticle) =>
      article.title.toLowerCase().includes(action.payload.toLowerCase()),
    );

    yield put(searchNewsSuccess(filteredArticles));
  } catch (error) {
    const err = error as AxiosError;
    yield put(ItemFailure(err.message));
  }
}

// Watcher saga: Watches for fetchNewsStart action
export function* watchFetchNews() {
  yield takeLatest(fetchNewsStart.type, fetchNewsSaga);
  yield takeLatest(addNewsItemRequest.type, addNewsItemSaga);
  yield takeLatest(updateNewsItemRequest.type, updateNewsItemSaga);
  yield takeLatest(deleteNewsItemRequest.type, deleteNewsItemSaga);
  yield takeLatest(searchNewsRequest.type, searchNewsSaga);
}
