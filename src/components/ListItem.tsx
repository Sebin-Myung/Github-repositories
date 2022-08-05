import tw from "tailwind-styled-components";
import languageColor from "../config/languageColor";
import { firstCharUpperCase } from "./Header";
import { AiOutlineStar } from "react-icons/ai";

export interface ListItemProps {
  name: string;
  visibility: string;
  description: string | null;
  topics: string[];
  language: keyof typeof languageColor | null;
  stargazers_count: number;
  updated_at: string | null;
}

const ListItem = ({ data }: { data: ListItemProps }) => {
  const getUpdatedAt = (time: string) => {
    const currentTime = Date.now();
    const updatedTime = Date.parse(time);
    const updatedDateTime = new Date(Date.parse(time));
    const interval = currentTime - updatedTime;
    const timeUnit = {
      second: 1000,
      minute: 60000,
      hour: 3600000,
      day: 24 * 3600000,
      month: 30 * 24 * 3600000,
      year: 365 * 30 * 24 * 3600000,
    };

    let result = "";
    if (interval < timeUnit.second * 2) {
      result = "1 second ago";
    } else if (interval < timeUnit.minute) {
      result = Math.floor(interval / timeUnit.second) + " seconds ago";
    } else if (interval < timeUnit.minute * 2) {
      result = "1 minute ago";
    } else if (interval < timeUnit.hour) {
      result = Math.floor(interval / timeUnit.minute) + " minutes ago";
    } else if (interval < timeUnit.hour * 2) {
      result = "1 hour ago";
    } else if (interval < timeUnit.day) {
      result = Math.floor(interval / timeUnit.hour) + " hours ago";
    } else if (interval < timeUnit.day * 2) {
      result = "yesterday";
    } else if (interval < timeUnit.month) {
      result = Math.floor(interval / timeUnit.day) + " days ago";
    } else if (interval < timeUnit.year) {
      result = `on ${updatedDateTime.getDate()} ${updatedDateTime.toLocaleString("en-US", { month: "short" })}`;
    } else {
      result = `on ${updatedDateTime.getDate()} ${updatedDateTime.toLocaleString("en-US", {
        month: "short",
      })} ${updatedDateTime.getFullYear()}`;
    }
    return "Updated " + result;
  };

  return (
    <li className="p-4 text-gray-600 text-sm">
      <div className="flex items-center">
        <h3 className="text-blue-500 text-lg font-bold cursor-pointer hover:underline">{data.name}</h3>
        <Tag className="ml-2">{firstCharUpperCase(data.visibility)}</Tag>
      </div>
      <p>{data.description}</p>
      <div className="flex items-center gap-1 my-2">
        {data.topics.map((topic) => (
          <Tag key={topic} className="text-blue-500 bg-sky-100">
            {topic}
          </Tag>
        ))}
      </div>
      <div className="flex items-center gap-4">
        {data?.language && (
          <div className="flex items-center">
            <span
              className="w-3 h-3 rounded-full border"
              style={{ backgroundColor: `${languageColor[data.language]}` }}
            ></span>
            <span className="ml-1">{data.language}</span>
          </div>
        )}
        {data.stargazers_count > 0 && (
          <div className="flex items-center">
            <AiOutlineStar />
            <span>{data.stargazers_count.toLocaleString()}</span>
          </div>
        )}
        {data?.updated_at && <span>{getUpdatedAt(data.updated_at)}</span>}
      </div>
    </li>
  );
};

const Tag = tw.span`
text-xs
font-semibold
px-2
border
rounded-full
`;

export default ListItem;
