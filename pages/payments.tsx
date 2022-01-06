import {NextPage} from "next";
import {PageContainer} from "../components/PageContainer";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import {Button, Space} from "antd";
import {CalendarOutlined, LogoutOutlined, UploadOutlined} from "@ant-design/icons";
import {Stats} from "../components/Stats";
import {Categories} from "../components/Categories";
import {PeriodSelector} from "../components/PeriodSelector";
import {PaymentsTable} from "../components/PaymentsTable";

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
    const categoriesInput = [
        {
            label: "Rent",
            value: "$1700"
        },
        {
            label: "Bill",
            value: "$450"
        },
        {
            label: "Subscriptions",
            value: "$109"
        },
        {
            label: "Insurance",
            value: "$299"
        },
    ]
    return (
        <PageContainer title={"Payments"}>
            <Space size={"large"} direction={"vertical"} style={{width: "100%"}}>
                <Space style={{width: "100%", justifyContent: "space-between"}}>
                    {/*<PeriodSelector onPeriodSelectChange={() => null} />*/}
                    <Button icon={<UploadOutlined/>}>Add new</Button>
                </Space>
                <Stats values={statsInput}/>
                <Categories values={categoriesInput}/>
                <PaymentsTable/>
            </Space>
        </PageContainer>
    )
}

export const getServerSideProps = withPageAuthRequired();

export default PaymentsPage;