import {NextPage} from "next";
import LayoutContainer from "../components/LayoutContainer";
import {Col, DatePicker, Row, Statistic, Typography} from "antd";
import {TransactionsTable} from "../components/TransactionsTable";
import useSwr from "swr";
import axios from "axios";
import {useTransactions} from "../hooks/useTransactions";
import {useState} from "react";
import moment, {Moment} from "moment";

const {Title, Text} = Typography;
const {RangePicker} = DatePicker;

const TransactionsPage: NextPage = () => {
    const [fromDate, setFromDate] = useState<Moment>(moment()); // TODO - Default dates
    const [toDate, setToDate] = useState<Moment>(moment());

    const {
        transactionData,
        isLoading,
        hasError
    } = useTransactions(fromDate.toISOString(), toDate.toISOString())

    if (hasError) return <div>ERROR</div>
    if (isLoading) return <LayoutContainer>Loading...</LayoutContainer>

    const {transactions, totalIncoming, totalOutgoing, netPosition} = transactionData;

    return (
        <LayoutContainer>
            <Title level={2}>Transactions</Title>

            {/* Transaction Date selection*/}
            {/*<div>*/}
            {/*    <Text>Showing transactions from: </Text>*/}
            {/*    <RangePicker format={"ddd, MMM do"} onChange={(range, x) => {*/}
            {/*        const dates = Array.from(range!.values())*/}

            {/*        setFromDate(dates[0]!);*/}
            {/*        setToDate(dates[1]!);*/}

            {/*        console.log({fromDate, toDate})*/}
            {/*    }}/>*/}
            {/*</div>*/}

            {/* Transaction stats */}
            <div>
                <Row>
                    <Col span={8}>
                        <Statistic title={"Total Incoming"} value={totalIncoming} prefix={"$"}
                                   valueStyle={{color: "green"}}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title={"Total Outgoing"} value={totalOutgoing} prefix={"$"}
                                   valueStyle={{color: "red"}}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title={"Net Position"} value={netPosition} prefix={"$"}
                                   valueStyle={{color: "green"}}/>
                    </Col>
                </Row>
            </div>

            <TransactionsTable dataSource={transactions}/>
        </LayoutContainer>
    )
}

export default TransactionsPage;
