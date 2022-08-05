import { useEffect, useState } from "react";
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

const initialFilter: RadioFilter = {
  language: "",
  sort: "",
};

const Repositories = () => {
  const localCheckedFilter = localStorage.getItem("checkedFilter");
  const [checkedFilter, setCheckedFilter] = useState<RadioFilter>(
    localCheckedFilter ? JSON.parse(localCheckedFilter) : initialFilter,
  );

  const onRadioClick = (name: keyof RadioFilter, value: string) => {
    setCheckedFilter(() => {
      return { ...checkedFilter, [name]: value };
    });
  };

  useEffect(() => {
    localStorage.setItem("checkedFilter", JSON.stringify(checkedFilter));
  }, [checkedFilter]);

  useEffect(() => {
    return () => {
      localStorage.setItem(
        `checkedFilter`,
        JSON.stringify({
          language: "",
          sort: "",
        }),
      );
    };
  }, []);

  return (
    <PageSection>
      <PageWrapper>
        <fieldset className="flex gap-4">
          <input type="text" placeholder="Find a repository..." className="border rounded-md px-3 py-1 text-sm" />
          <Dropdown
            checkedValue={checkedFilter.language}
            name={"language"}
            title={"language"}
            options={language}
            onRadioClick={(val: LanguageFilter) => onRadioClick("language", val)}
          />
          <Dropdown
            checkedValue={checkedFilter.sort}
            name={"sort"}
            title={"order"}
            options={sort}
            onRadioClick={(val: SortFilter) => onRadioClick("sort", val)}
          />
        </fieldset>
      </PageWrapper>
    </PageSection>
  );
};

export default Repositories;
