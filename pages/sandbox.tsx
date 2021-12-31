import {NextPage} from "next";
import {Button, Typography} from "antd";
import LayoutContainer from "../components/PageContainer";

const {Title, Text} = Typography

const Sandbox: NextPage = () => {
    return (
        <div>
            <LayoutContainer>
                <Title level={2}>Transactions</Title>
                <Text>
                    Fooo bar baz
                </Text>
            </LayoutContainer>
        </div>
    );
}

export default Sandbox
