import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { ListItemProps } from "../../components/ListItem";

interface fetchGithubApiProps {
  language: string | null;
  sort: string | null;
  per_page: number;
  total_page: number;
  page: number;
}

export const fetchGithubApi = createAsyncThunk(
  "githubApi/fetchGithubApiSlice",
  async ({ language, sort, per_page, total_page, page }: fetchGithubApiProps) => {
    const facebookUrl = "https://api.github.com/orgs/facebook/repos";
    if (language === null || language === "") {
      const res = await fetch(`${facebookUrl}?sort=${sort}&per_page=${per_page}&page=${page}`);
      const result: GithubApi[] = await res.json();
      return { repos: result, totalRepoCount: null };
    } else {
      const res = await fetch(`${facebookUrl}?per_page=${per_page * total_page <= 100 ? per_page * total_page : 100}`);
      const result: GithubApi[] = await res.json();
      const filterLanguage = result.filter((data) => data.language === language);
      switch (sort) {
        case "updated":
          filterLanguage.sort((a, b) => {
            const [sortA, sortB] = [a.updated_at || "", b.updated_at || ""];
            if (sortA > sortB) return -1;
            else if (sortB > sortA) return 1;
            else return 0;
          });
          break;
        case "full_name":
          filterLanguage.sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 0;
          });
          break;
      }
      const [firstIndex, lastIndex] = [per_page * (page - 1), per_page * page - 1];
      if (lastIndex < filterLanguage.length)
        return { repos: filterLanguage.slice(firstIndex, lastIndex + 1), totalRepoCount: filterLanguage.length };
      else return { repos: filterLanguage.slice(firstIndex), totalRepoCount: filterLanguage.length };
    }
  },
);

export interface GithubApi extends ListItemProps {
  id: number;
}

interface GithubApiState {
  repos: GithubApi[];
  totalRepoCount: number | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: GithubApiState = {
  repos: [],
  totalRepoCount: null,
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
      .addCase(
        fetchGithubApi.fulfilled.type,
        (state, action: PayloadAction<{ repos: GithubApi[]; totalRepoCount: number | null }>) => {
          state.repos = action.payload.repos;
          state.totalRepoCount = action.payload.totalRepoCount;
          state.loading = "succeeded";
        },
      )
      .addCase(fetchGithubApi.rejected.type, (state) => {
        state.loading = "failed";
      });
  },
});

export default githubApiSlice.reducer;
