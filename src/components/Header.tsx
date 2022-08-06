import { Link, useLocation } from "react-router-dom";
import category from "../config/category";
import { PageWrapper } from "./baseComponents";

export const firstCharUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Header = () => {
  const pathname = useLocation().pathname;

  return (
    <header className="min-w-[512px] bg-gray-100 border-b">
      <PageWrapper className="pt-4 pb-0">
        <div className="flex items-center w-fit">
          <Link to="/">
            <img
              src="https://avatars.githubusercontent.com/u/69631?s=200&v=4"
              alt=""
              className="w-12 h-12 border rounded-lg object-cover"
            />
          </Link>
          <Link to="/" className="ml-2">
            <h1 className="text-3xl font-semibold">Meta</h1>
          </Link>
        </div>
        <div className="flex mt-2">
          {category.map((item) => (
            <span
              key={item}
              className={`p-2 pb-4 ${
                pathname.split("/").includes(item) && "border-b-2 border-amber-500 font-semibold"
              }`}
            >
              <Link to={item} key={item}>
                <h2>{firstCharUpperCase(item)}</h2>
              </Link>
            </span>
          ))}
        </div>
      </PageWrapper>
    </header>
  );
};

export default Header;
