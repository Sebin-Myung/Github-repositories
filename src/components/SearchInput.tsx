import { useRef } from "react";
import { useNavigate } from "react-router-dom";

interface SearchInputProps {
  placeholder: string;
  url: string;
  urlParams: URLSearchParams;
}

const SearchInput = ({ placeholder, url, urlParams }: SearchInputProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  let debounce: ReturnType<typeof setTimeout>;
  const onChange = () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      urlParams.set("q", searchInputRef.current?.value || "");
      urlParams.delete("page");
      navigate(url + "?" + urlParams);
    }, 500);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border rounded-md px-3 py-1 text-sm"
      onChange={onChange}
      ref={searchInputRef}
    />
  );
};

export default SearchInput;
