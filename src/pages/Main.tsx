import { ImagePage, ImagePageSection } from "../components/baseComponents";

const Main = () => {
  return (
    <ImagePageSection>
      <ImagePage src="/github.svg" alt="" />
      <h3 className="text-4xl font-bold">Meta Github</h3>
    </ImagePageSection>
  );
};

export default Main;
