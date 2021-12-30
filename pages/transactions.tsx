import {NextPage} from "next";
import LayoutContainer from "../components/LayoutContainer";
import {Typography} from "antd";

const {Title, Text} = Typography;

const TransactionsPage: NextPage = () =>
{
    return (
        <LayoutContainer>
           <Title level={2}>Transactions</Title>
            <Text>Here be transactions</Text>
        </LayoutContainer>
    )
}

export default TransactionsPage;
