import {NextPage} from "next";
import {PageContainer} from "../components/PageContainer";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import {Button, Space} from "antd";
import {
    GoldOutlined,
    DownloadOutlined,
    UploadOutlined,
    DollarCircleOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import {Stats} from "../components/Stats";
import {Categories} from "../components/Categories";
import {PeriodSelector} from "../components/PeriodSelector";
import {PaymentsTable} from "../components/PaymentsTable";
import {usePayments} from "../hooks/usePayments";
import {AddPaymentModal} from "../components/AddPaymentModal";
import {useState} from "react";
import axios from "axios";

const PaymentsPage: NextPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {paymentData, refreshData, isLoading, hasError} = usePayments();

    if (hasError)
        return (
            <div>
                <h1>An Error Occurred</h1>
            </div>
        );

    if (isLoading) return <PageContainer title={""}>Loading...</PageContainer>;

    const {
        payments,
        monthlyIncoming,
        monthlyOutgoing,
        monthlyNet,
        categoryTotals,
    } = paymentData;

    console.log({
        payments,
        monthlyIncoming,
        monthlyOutgoing,
        monthlyNet,
        categoryTotals,
    });

    const statsInput = [
        {
            label: "Total Monthly Payments",
            value: monthlyNet.count,
            icon: <GoldOutlined/>,
            color: "#505050",
        },
        {
            label: "Net Monthly Incoming",
            value: "$" + monthlyIncoming?.total,
            icon: <DownloadOutlined/>,
            color: "#505050",
        },
        {
            label: "Net Monthly Outgoing",
            value: "$" + monthlyOutgoing?.total,
            icon: <UploadOutlined/>,
            color: "#505050",
        },
        {
            label: "Net Monthly Position",
            value: "$" + monthlyNet?.total, // TODO - Fix
            icon: <DollarCircleOutlined/>,
            color: "#505050",
        },
    ];

    return (
        <PageContainer title={"Payments"}>
            <Space size={"large"} direction={"vertical"} style={{width: "100%"}}>
                <AddPaymentModal
                    visible={isModalVisible}
                    onOk={() => setIsModalVisible(false)}
                    refreshData={refreshData}
                />
                <Space style={{width: "100%", justifyContent: "flex-end"}}>
                    <Button
                        icon={<PlusCircleOutlined/>}
                        onClick={() => setIsModalVisible(true)}
                    >
                        Add new
                    </Button>
                </Space>

                <Stats values={statsInput}/>
                <Categories values={categoryTotals}/>

                <PaymentsTable payments={payments} refreshData={refreshData}
                               onPaymentUpdate={(payload) => axios.post('/api/update-payment', payload)}/>
            </Space>
        </PageContainer>
    );
};

export const getServerSideProps = withPageAuthRequired();

export default PaymentsPage;
