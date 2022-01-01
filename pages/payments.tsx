import {NextPage} from "next";
import {PageContainer} from "../components/PageContainer";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";

const PaymentsPage: NextPage = () =>
{
    return (
        <PageContainer title={"Payments"}>Payments page</PageContainer>
    )
}

export const getServerSideProps = withPageAuthRequired();

export default PaymentsPage;