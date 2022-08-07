import { NextPage } from "next";
import { PageContainer } from "../components/PageContainer";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

const Profile = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log({ user, error, isLoading });

  return user ? (
    <div>
      {/*<img src={user.picture} alt={user.name}/>*/}
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  ) : null;
};
const SettingsPage: NextPage = () => {
  return (
    <PageContainer title={"Settings"}>
      <h2>Coming soon!</h2>
      {/* <Profile /> */}
    </PageContainer>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default SettingsPage;
