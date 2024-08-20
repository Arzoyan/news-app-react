import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  fibonacci: number;
}

interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    ItemFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchNewsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchNewsSuccess(state, action) {
      state.loading = false;
      state.articles = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addNewsItemRequest(state, _: PayloadAction<NewsArticle>) {
      state.loading = true;
    },
    addNewsItemSuccess(state, action: PayloadAction<NewsArticle>) {
      state.loading = false;
      state.articles.push(action.payload);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateNewsItemRequest(state, _: PayloadAction<NewsArticle>) {
      state.loading = true;
    },
    updateNewsItemSuccess(state, action: PayloadAction<NewsArticle>) {
      state.loading = false;
      const newState = state.articles.map((article) =>
        article.id === action.payload.id ? action.payload : article,
      );
      state.articles = newState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteNewsItemRequest(state, _: PayloadAction<string>) {
      state.loading = true;
    },
    deleteNewsItemSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      const newState = state.articles;
      state.articles = newState.filter(
        (article) => article.id !== action.payload,
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchNewsRequest(state, _: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    searchNewsSuccess(state, action: PayloadAction<NewsArticle[]>) {
      state.loading = false;
      state.articles = action.payload;
    },
  },
});

export const {
  fetchNewsStart,
  fetchNewsSuccess,
  ItemFailure,
  addNewsItemRequest,
  addNewsItemSuccess,
  updateNewsItemRequest,
  updateNewsItemSuccess,
  deleteNewsItemRequest,
  deleteNewsItemSuccess,
  searchNewsRequest,
  searchNewsSuccess,
} = newsSlice.actions;

export default newsSlice.reducer;
