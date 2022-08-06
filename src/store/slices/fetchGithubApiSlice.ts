import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { ListItemProps } from "../../components/ListItem";

interface fetchGithubApiProps {
  q: string | null;
  language: string | null;
  sort: string | null;
  per_page: number;
  total_page: number;
  page: number;
}

export const fetchGithubApi = createAsyncThunk(
  "githubApi/fetchGithubApiSlice",
  async ({ q, language, sort, per_page, total_page, page }: fetchGithubApiProps) => {
    const facebookUrl = "https://api.github.com/orgs/facebook/repos";
    if ((language === null || language === "") && (q === null || q === "")) {
      const res = await fetch(`${facebookUrl}?sort=${sort || "updated"}&per_page=${per_page}&page=${page}`);
      const result: GithubApi[] = await res.json();
      return { repos: result, totalRepoCount: null };
    } else {
      const res = await fetch(
        `${facebookUrl}?sort=updated&per_page=${per_page * total_page <= 100 ? per_page * total_page : 100}`,
      );
      let result: GithubApi[] = await res.json();

      if (language && language !== "") result = result.filter((data) => data.language === language);
      if (q && q !== "") result = result.filter((data) => data.name.includes(q));

      switch (sort) {
        case "updated":
          result.sort((a, b) => {
            const [sortA, sortB] = [a.updated_at || "", b.updated_at || ""];
            if (sortA > sortB) return -1;
            else if (sortB > sortA) return 1;
            else return 0;
          });
          break;
        case "full_name":
          result.sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 0;
          });
          break;
      }

      const [firstIndex, lastIndex] = [per_page * (page - 1), per_page * page - 1];
      if (lastIndex < result.length)
        return { repos: result.slice(firstIndex, lastIndex + 1), totalRepoCount: result.length };
      else return { repos: result.slice(firstIndex), totalRepoCount: result.length };
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
