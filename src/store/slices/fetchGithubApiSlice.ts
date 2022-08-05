import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { ListItemProps } from "../../components/ListItem";

interface fetchGithubApiProps {
  language: string | null;
  sort: string | null;
  page: number;
}

export const fetchGithubApi = createAsyncThunk(
  "githubApi/fetchGithubApiSlice",
  async ({ language, sort, page }: fetchGithubApiProps) => {
    const facebookUrl = "https://api.github.com/orgs/facebook";
    const PER_PAGE = 10;
    const res = await fetch(`${facebookUrl}/repos?sort=${sort}&per_page=${PER_PAGE}&page=${page}`);
    const result: GithubApi[] = await res.json();

    if (language) {
      const filterLanguage = result.filter((data) => data.language === language);
      return filterLanguage;
    }
    return result;
  },
);

export interface GithubApi extends ListItemProps {
  id: number;
}

interface GithubApiState {
  repos: GithubApi[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: GithubApiState = {
  repos: [],
  loading: "idle",
};

export const githubApiSlice: Slice = createSlice({
  name: "githubApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGithubApi.pending.type, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchGithubApi.fulfilled.type, (state, action: PayloadAction<GithubApi[]>) => {
        state.repos = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchGithubApi.rejected.type, (state) => {
        state.loading = "failed";
      });
  },
});

export default githubApiSlice.reducer;
