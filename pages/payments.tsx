import {NextPage} from "next";
import {PageContainer} from "../components/PageContainer";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import {Button, Space} from "antd";
import {CalendarOutlined, LogoutOutlined, UploadOutlined} from "@ant-design/icons";
import {Stats} from "../components/Stats";

function Categories() {
    return null;
}

function PaymentsTable() {
    return null;
}

const PaymentsPage: NextPage = () => {
    const statsInput = [
        {
            label: "Total payments",
            value: "49",
            icon: <LogoutOutlined/>,
            color: "#505050"
        },
        {
            label: "Monthly Cost",
            value: "$670",
            icon: <CalendarOutlined/>,
            color: "#505050"
        },
        {
            label: "Yearly Cost",
            value: "$14789",
            icon: <CalendarOutlined/>,
            color: "#505050"
        }
    ]
    return (
        <PageContainer title={"Payments"}>
            <Space direction={"vertical"} style={{width: "100%"}}>
                <Space style={{width: "100%", justifyContent: "flex-end"}}>
                    <Button icon={<UploadOutlined/>}>Add new</Button>
                </Space>
                <Stats values={statsInput}/>
                <Categories/>
                <PaymentsTable/>
            </Space>
        </PageContainer>
    )
}

export const getServerSideProps = withPageAuthRequired();

export default PaymentsPage;