import { useEffect, useState } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { PageSection, PageWrapper } from "../components/baseComponents";
import Dropdown from "../components/Dropdown";
import ListWrapper from "../components/ListWrapper";
import { LanguageFilter, RadioFilter, SortFilter } from "../config/radioFilter";
import { useAppDispatch, useAppSelector } from "../store/config";
import { fetchGithubApi } from "../store/slices/fetchGithubApiSlice";

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
  const PAGE_GROUP = 5;
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

  const onPageButtonClick = (page: number) => {
    setPage(() => page);
    urlParams.set("page", page.toString());
    navigate("/repositories?" + urlParams);
  };

  useEffect(() => {
    dispatch(
      fetchGithubApi({
        language: urlParams.get("language"),
        sort: urlParams.get("sort"),
        per_page: PER_PAGE,
        page: urlParams.get("page") || "1",
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
        {loading === "succeeded" && (
          <>
            <ListWrapper datas={repos} />
            <div className="flex justify-center items-center gap-1 m-4">
              <PaginationButton
                className={`${page === 1 ? "text-gray-500 cursor-default hover:border-0" : ""}`}
                onClick={page === 1 || (() => onPageButtonClick(page - 1))}
              >
                <VscChevronLeft />
                <p className="ml-2">Previous</p>
              </PaginationButton>
              {Array.from(
                { length: PAGE_GROUP },
                (_, i) => i + 1 + PAGE_GROUP * Math.floor((page - 1) / PAGE_GROUP),
              ).map(
                (p) =>
                  p <= TOTAL_PAGE && (
                    <PaginationButton
                      key={p}
                      className={`w-9 ${p === page ? "bg-blue-600 text-white hover:border-0" : ""}`}
                      onClick={() => onPageButtonClick(p)}
                    >
                      {p}
                    </PaginationButton>
                  ),
              )}
              <PaginationButton
                className={`${page === TOTAL_PAGE ? "text-gray-500 cursor-default hover:border-0" : ""}`}
                onClick={page === TOTAL_PAGE || (() => onPageButtonClick(page + 1))}
              >
                <p className="mr-2">Next</p>
                <VscChevronRight />
              </PaginationButton>
            </div>
          </>
        )}
      </PageWrapper>
    </PageSection>
  );
};

const PaginationButton = tw.span`
h-9
py-[5px]
px-2.5
flex 
justify-center
items-center
cursor-pointer
rounded-lg
hover:border
`;

export default Repositories;
