import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import ListWrapper from "../components/ListWrapper";
import { LanguageFilter, RadioFilter, SortFilter } from "../config/radioFilter";
import { useAppDispatch, useAppSelector } from "../store/config";
import { fetchGithubApi } from "../store/slices/fetchGithubApiSlice";
import { PageSection, PageWrapper } from "./Main";

const language: { [name: string]: LanguageFilter } = {
  "C++": "C++",
  JavaScript: "JavaScript",
  TypeScript: "TypeScript",
  Java: "Java",
};

const sort: { [name: string]: SortFilter } = { "Last updated": "updated", Name: "full_name" };

const Repositories = () => {
  const PER_PAGE = 10;
  const TOTAL_PAGE = 4;
  const [page, setPage] = useState<number>(1);
  const { repos, loading } = useAppSelector((state) => state.githubApi);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);

  const onRadioClick = (params: keyof RadioFilter, val: string) => {
    urlParams.set(params, val);
    navigate("/repositories?" + urlParams);
  };

  useEffect(() => {
    dispatch(
      fetchGithubApi({
        language: urlParams.get("language"),
        sort: urlParams.get("sort"),
        per_page: PER_PAGE,
        page: page,
      }),
    );
  }, [location.search]);

  return (
    <PageSection>
      <PageWrapper>
        <fieldset className="flex gap-4">
          <input type="text" placeholder="Find a repository..." className="border rounded-md px-3 py-1 text-sm" />
          <Dropdown
            checkedValue={urlParams.get("language")}
            name={"language"}
            title={"language"}
            options={language}
            onRadioClick={(val: LanguageFilter) => {
              onRadioClick("language", val);
            }}
          />
          <Dropdown
            checkedValue={urlParams.get("sort")}
            name={"sort"}
            title={"order"}
            options={sort}
            onRadioClick={(val: SortFilter) => {
              onRadioClick("sort", val);
            }}
          />
        </fieldset>
        {loading === "succeeded" && <ListWrapper datas={repos} />}
      </PageWrapper>
    </PageSection>
  );
};

export default Repositories;
