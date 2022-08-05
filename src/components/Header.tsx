import { Link, useLocation } from "react-router-dom";
import category from "../config/category";

const Header = () => {
  const pathname = useLocation().pathname;

  return (
    <header className="bg-gray-100 border-b">
      <div className="px-5 pt-4 w-full max-w-[1024px] mx-auto">
        <div className="flex items-center w-fit">
          <Link to="/">
            <img
              src="https://avatars.githubusercontent.com/u/69631?s=200&v=4"
              alt=""
              className="w-12 h-12 border rounded-lg object-cover"
            />
          </Link>
          <Link to="/" className="ml-2">
            <p className="text-3xl font-semibold">Meta</p>
          </Link>
        </div>
        <div className="flex mt-2">
          {category.map((item) => (
            <span
              key={item}
              className={`p-2 pb-4 ${pathname.includes(item) && "border-b-2 border-amber-500 font-semibold"}`}
            >
              <Link to={item} key={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
