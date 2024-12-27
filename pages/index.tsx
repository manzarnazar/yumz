import React from "react";
import SEO from "components/seo";
import WelcomeContainer from "containers/welcome/welcome";
import WelcomeHero from "components/welcomeHero/welcomeHero";
import WhyChooseUs from "components/whyChooseUs/whyChooseUs";
import { QueryClient, dehydrate, useQuery } from "react-query";
import useLocale from "hooks/useLocale";
import blogService from "services/blog";
import WelcomeBlog from "components/welcomeBlog/welcomeBlog";
import FaqContainer from "containers/faq/faq";
import faqService from "services/faq";
import { GetServerSideProps } from "next";
import getLanguage from "utils/getLanguage";
import { getCookie } from "utils/session";
import pageService from "services/page";
import { useRouter } from "next/router";

type Props = {
  isAuthenticated: boolean;
};

export default function Welcome({ isAuthenticated }: Props) {
  const { locale } = useLocale();

  const { data } = useQuery(["landingPage", locale], () =>
    pageService.getLandingPage()
  );

  const { data: stats } = useQuery(["stats", locale], () =>
    pageService.getStatistics()
  );

  const { data: blog } = useQuery(["lastBlog", locale], () =>
    blogService.getLastBlog()
  );

  const { data: faqs } = useQuery(["faqs", locale], () => faqService.getAll());

  return (
    <>
      <SEO />
      <WelcomeContainer>
        <WelcomeHero data={data?.data?.data} stats={stats?.data} />
        <WhyChooseUs data={data?.data?.data} />
        <WelcomeBlog data={blog?.data} />
        <FaqContainer data={faqs?.data} />
      </WelcomeContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const locale = getLanguage(getCookie("locale", ctx));
  const authToken = getCookie("access_token", ctx); // Check cookie on SSR
  const isAuthenticated = authToken ? true : false; // Determine authentication status based on the token

  // If authenticated, redirect to /home
  if (isAuthenticated) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery(["landingPage", locale], () =>
    pageService.getLandingPage()
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      isAuthenticated,
    },
    revalidate: 3600,
  };
};
