import { useEffect } from "react";
import { ImagePage, ImagePageSection } from "../components/baseComponents";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "Error";
  }, []);

  return (
    <ImagePageSection>
      <ImagePage src="/404.svg" alt="" />
    </ImagePageSection>
  );
};

export default ErrorPage;
