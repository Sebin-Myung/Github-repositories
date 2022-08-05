import tw from "tailwind-styled-components";

const Main = () => {
  return (
    <ImagePageSection>
      <ImagePage src="/github.svg" alt="" />
      <h1 className="text-4xl font-bold">Meta Github</h1>
    </ImagePageSection>
  );
};

export const ImagePageSection = tw.section`
w-full
min-h-screen
flex
flex-col
justify-center
items-center
`;

export const ImagePage = tw.img`
w-1/4
`;

export const PageSection = tw.section`
w-full
min-h-screen
`;

export const PageWrapper = tw.div`
p-5
w-full
max-w-[1024px]
mx-auto
`;

export default Main;
