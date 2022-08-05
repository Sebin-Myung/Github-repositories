import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import { LanguageFilter, RadioFilter, SortFilter } from "../config/radioFilter";
import { PageSection, PageWrapper } from "./Main";

const language: { [name: string]: LanguageFilter } = {
  "C++": "C++",
  JavaScript: "JavaScript",
  TypeScript: "TypeScript",
  Java: "Java",
};

const sort: { [name: string]: SortFilter } = { "Last updated": "updated", Name: "full_name" };

const Repositories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);

  const onRadioClick = (params: keyof RadioFilter, val: string) => {
    urlParams.set(params, val);
    navigate("/repositories?" + urlParams);
  };

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
      </PageWrapper>
    </PageSection>
  );
};

export default Repositories;
