import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { PageContainer } from "../components/PageContainer";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Home: NextPage = () => {
  return (
    <PageContainer title={"Dashboard"}>
      <h2>Coming soon!</h2>
    </PageContainer>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Home;
