import tw from "tailwind-styled-components";

export const ImagePageSection = tw.section`
w-full
min-w-[512px]
min-h-screen
flex
flex-col
justify-center
items-center
`;

export const ImagePage = tw.img`
w-80
`;

export const PageSection = tw.section`
w-full
min-w-[512px]
min-h-screen
`;

export const PageWrapper = tw.div`
p-5
w-full
min-w-[512px]
max-w-[1024px]
mx-auto
`;
