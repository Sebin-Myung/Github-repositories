export type LanguageFilter = "C++" | "JavaScript" | "TypeScript" | "Java";
export type SortFilter = "updated" | "full_name";

export interface RadioFilter {
  language: LanguageFilter;
  sort: SortFilter;
}
