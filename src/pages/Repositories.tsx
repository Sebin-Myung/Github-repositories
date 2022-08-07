import { useEffect, useState } from "react";
import { VscChevronLeft, VscChevronRight, VscClose } from "react-icons/vsc";
import { BsFillXSquareFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { PageSection, PageWrapper } from "../components/baseComponents";
import Dropdown from "../components/Dropdown";
import ListWrapper from "../components/ListWrapper";
import SearchInput from "../components/SearchInput";
import { LanguageFilter, RadioFilter, SortFilter } from "../config/radioFilter";
import { useAppDispatch, useAppSelector } from "../store/config";
import { fetchGithubApi } from "../store/slices/fetchGithubApiSlice";
import { Tag } from "../components/ListItem";

const language: { [name: string]: LanguageFilter | "" } = {
  All: "",
  "C++": "C++",
  JavaScript: "JavaScript",
  TypeScript: "TypeScript",
  Java: "Java",
};

const sort: { [name: string]: SortFilter } = { "Last updated": "updated", Name: "full_name" };

const Repositories = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const { repos, totalRepoCount, loading } = useAppSelector((state) => state.githubApi);
  const dispatch = useAppDispatch();

  const PER_PAGE = 10;
  const TOTAL_PAGE = totalRepoCount ? Math.ceil(totalRepoCount / PER_PAGE) : 4;
  const PAGE_GROUP = 5;

  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);

  const getObjectKey = (object: { [name: string]: string }, value: string) => {
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      if (object[keys[i]] === value) return keys[i];
    }
    return "";
  };

  const getFilterResult = (q: string | null, langFilter: string | null, sortFilter: string | null): JSX.Element => {
    return (
      <p>
        <BoldSpan>{totalRepoCount}</BoldSpan> results for <BoldSpan>all</BoldSpan> repositories{" "}
        {q && q !== "" && (
          <>
            matching <BoldSpan>{q}</BoldSpan>
          </>
        )}
        {langFilter && langFilter !== "" && (
          <>
            {" "}
            written in <BoldSpan>{getObjectKey(language, langFilter || "")}</BoldSpan>
          </>
        )}{" "}
        sotred by <BoldSpan>{getObjectKey(sort, sortFilter || "updated")}</BoldSpan>
      </p>
    );
  };

  const clearFilter = () => {
    urlParams.delete("q");
    urlParams.delete("language");
    urlParams.delete("sort");
    navigate("/repositories?" + urlParams);
  };

  const deleteSelectedTopic = (index: number) => {
    const result = [...selectedTopics];
    result.splice(index, 1);
    setSelectedTopics(result);
  };

  const onRadioClick = (params: keyof RadioFilter, val: string) => {
    setPage(() => 1);
    urlParams.delete("page");
    urlParams.set(params, val);
    navigate("/repositories?" + urlParams);
  };

  const onPageButtonClick = (page: number) => {
    setPage(() => page);
    window.scrollTo(0, 0);
    urlParams.set("page", page.toString());
    navigate("/repositories?" + urlParams);
  };

  useEffect(() => {
    document.title = "Repositories - Meta";
  }, []);

  useEffect(() => {
    dispatch(
      fetchGithubApi({
        q: urlParams.get("q"),
        language: urlParams.get("language"),
        sort: urlParams.get("sort"),
        topics: selectedTopics,
        per_page: PER_PAGE,
        total_page: 4,
        page: parseInt(urlParams.get("page") || "1"),
      }),
    );
  }, [location.search, selectedTopics]);

  return (
    <PageSection>
      <PageWrapper>
        <fieldset className="flex gap-4">
          <SearchInput placeholder="Find a repository..." url="/repositories" urlParams={urlParams} />
          <Dropdown
            checkedValue={urlParams.get("language") || ""}
            name={"language"}
            title={"language"}
            options={language}
            onRadioClick={(val: LanguageFilter) => {
              onRadioClick("language", val);
            }}
          />
          <Dropdown
            checkedValue={urlParams.get("sort") || "updated"}
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
            {totalRepoCount !== null && (
              <div className="flex justify-between items-center flex-wrap gap-2 my-2 text-sm">
                {getFilterResult(urlParams.get("q"), urlParams.get("language"), urlParams.get("sort"))}
                <div className="flex items-center gap-2 text-gray-500 cursor-pointer" onClick={clearFilter}>
                  <BsFillXSquareFill />
                  <p>Clear Filter</p>
                </div>
              </div>
            )}
            {selectedTopics.length > 0 && (
              <div className="flex gap-1 flex-wrap mt-2">
                {selectedTopics.map((topic, index) => (
                  <Tag
                    key={`selected_${topic}`}
                    className="flex items-center gap-1"
                    onClick={() => deleteSelectedTopic(index)}
                  >
                    {topic}
                    <VscClose />
                  </Tag>
                ))}
              </div>
            )}
            {totalRepoCount === 0 ? (
              <div className="flex justify-center items-center min-h-[50vh] text-2xl font-bold">
                This organization doesn’t have any repositories that match.
              </div>
            ) : (
              <>
                <ListWrapper
                  datas={repos}
                  topicClickFunction={(topic: string) => setSelectedTopics([...selectedTopics, topic])}
                />
                {TOTAL_PAGE < 2 || (
                  <div className="flex justify-center items-center gap-1 m-4">
                    <PaginationButton
                      className={`${page === 1 ? "text-gray-500 cursor-default hover:border-0" : ""}`}
                      onClick={() => page === 1 || onPageButtonClick(page - 1)}
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
                      onClick={() => page === TOTAL_PAGE || onPageButtonClick(page + 1)}
                    >
                      <p className="mr-2">Next</p>
                      <VscChevronRight />
                    </PaginationButton>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </PageWrapper>
    </PageSection>
  );
};

const BoldSpan = tw.span`
font-bold
`;

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
