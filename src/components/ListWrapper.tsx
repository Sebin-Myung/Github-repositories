import languageColor from "../config/languageColor";
import { GithubApi } from "../store/slices/fetchGithubApiSlice";
import ListItem from "./ListItem";

const ListWrapper = ({ datas }: { datas: GithubApi[] }) => {
  return (
    <ul className="list-wrapper mt-5 border rounded-lg">
      {datas?.map((data) => (
        <ListItem
          key={data.id}
          data={{
            name: data.name,
            visibility: data.visibility,
            description: data.description,
            topics: data.topics,
            language: data.language as keyof typeof languageColor | null,
            stargazers_count: data.stargazers_count,
            updated_at: data.updated_at,
          }}
        />
      ))}
    </ul>
  );
};

export default ListWrapper;
