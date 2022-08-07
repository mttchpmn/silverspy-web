import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {PageContainer} from "../components/PageContainer";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import {Typography, Space, DatePicker, Timeline} from "antd";
import {useState} from "react";
import moment, {Moment} from "moment";
import {usePayments} from "../hooks/usePayments";
import {usePaymentSummary} from "../hooks/usePaymentSummary";
import {log} from "util";
import paymentsSummary from "./api/payments-summary";
import {PaymentWithDate} from "../types/payment-types";

const {RangePicker} = DatePicker;
const {Text} = Typography;

const Home: NextPage = () => {
    const [fromDate, setFromDate] = useState<Moment>(moment());
    const [toDate, setToDate] = useState<Moment>(moment().add(14, 'days'));

    const {
        paymentSummaryData,
        refreshData,
        isLoading,
        hasError
    } = usePaymentSummary(fromDate.toISOString(), toDate.toISOString());

    if (hasError)
        return (
            <div>
                <h1>An Error Occurred</h1>
            </div>
        );

    if (isLoading) return <PageContainer title={""}>Loading...</PageContainer>;

    console.log({paymentSummaryData});
    const payments = paymentSummaryData.payments;


    return (
        <PageContainer title={"Dashboard"}>
            <Space size={"large"} direction={"vertical"} style={{width: "100%"}}>
                <Space>
                    <Space>
                        <Text>From</Text>
                        <DatePicker
                            value={fromDate}
                            onChange={(x) => {
                                if (x === null) return;
                                setFromDate(x);
                            }}
                        />
                    </Space>
                    <Space>
                        <Text>To</Text>
                        <DatePicker
                            value={toDate}
                            onChange={(x) => {
                                if (x === null) return;
                                setToDate(x);
                                refreshData();
                            }}
                        />
                    </Space>

                </Space>
                <Timeline>
                    {payments.map((p: PaymentWithDate) => <Timeline.Item key={p.paymentDate} color={p.type === 0 ? "green" : "red"}>{moment(p.paymentDate).format("ddd Do MMM")} - {p.name} ${p.value}</Timeline.Item>)}
                </Timeline>
            </Space>
        </PageContainer>
    );
};

export const getServerSideProps = withPageAuthRequired();

export default Home;
