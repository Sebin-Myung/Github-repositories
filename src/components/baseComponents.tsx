import tw from "tailwind-styled-components";

export const HeaderWrapper = tw.header`
min-w-[320px]
bg-gray-100
border-b
`;

export const ImagePageSection = tw.section`
w-full
min-w-[320px]
min-h-screen
flex
flex-col
justify-center
items-center
`;

export const ImagePage = tw.img`
w-1/4
min-w-[200px]
`;

export const PageSection = tw.section`
w-full
min-w-[320px]
min-h-screen
`;

export const PageWrapper = tw.div`
p-2.5
xs:p-5
w-full
min-w-[320px]
max-w-[1024px]
mx-auto
`;
