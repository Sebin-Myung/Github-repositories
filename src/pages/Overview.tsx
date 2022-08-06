import { useEffect } from "react";
import { ImagePage, ImagePageSection } from "../components/baseComponents";

const Overview = () => {
  useEffect(() => {
    document.title = "Overview - Meta";
  }, []);

  return (
    <ImagePageSection>
      <ImagePage src="/renewal.svg" alt="" />
    </ImagePageSection>
  );
};

export default Overview;
