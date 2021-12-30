import {NextPage} from "next";
import LayoutContainer from "../components/LayoutContainer";
import {Col, DatePicker, Descriptions, Row, Space, Statistic, Typography} from "antd";
import {TransactionsTable} from "../components/TransactionsTable";
import useSwr from "swr";
import axios from "axios";
import {useTransactions} from "../hooks/useTransactions";
import {useState} from "react";
import moment, {Moment} from "moment";
import {CategoryTotal} from "../types/transaction-types";

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

    const {transactions, categoryTotals, totalIncoming, totalOutgoing, netPosition} = transactionData;

    console.log({categoryTotals})

    return (
        <LayoutContainer>
            <Title level={2}>Transactions</Title>

            <Space direction={"vertical"} size={"large"} style={{width: "100%"}}>

            {/* Transaction Date selection*/}
            <div>
                <RangePicker disabled format={"ddd, MMM do"} onChange={(range, x) => {
                    const dates = Array.from(range!.values())

                    setFromDate(dates[0]!);
                    setToDate(dates[1]!);

                    console.log({fromDate, toDate})
                }}/>
            </div>

                {/* Transaction stats */}
                <div>
                    <Space size={"large"} style={{width: "100%", justifyContent: "center"}}>
                        <Statistic title={"Total Incoming"} value={totalIncoming} prefix={"$"}
                                   valueStyle={{color: "green"}}/>
                        <Statistic title={"Total Outgoing"} value={totalOutgoing} prefix={"$"}
                                   valueStyle={{color: "red"}}/>
                        <Statistic title={"Net Position"} value={netPosition} prefix={"$"}
                                   valueStyle={{color: "green"}}/>
                    </Space>
                </div>

                {/*<div>*/}
                {/*    <Row>*/}
                {/*        <Col span={8}>*/}
                {/*            <Statistic title={"Total Incoming"} value={totalIncoming} prefix={"$"}*/}
                {/*                       valueStyle={{color: "green"}}/>*/}
                {/*        </Col>*/}
                {/*        <Col span={8}>*/}
                {/*            <Statistic title={"Total Outgoing"} value={totalOutgoing} prefix={"$"}*/}
                {/*                       valueStyle={{color: "red"}}/>*/}
                {/*        </Col>*/}
                {/*        <Col span={8}>*/}
                {/*            <Statistic title={"Net Position"} value={netPosition} prefix={"$"}*/}
                {/*                       valueStyle={{color: "green"}}/>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</div>*/}

                {/* Transaction Categories */}
                <div>
                    <Title level={3}>Categories</Title>
                    <Descriptions bordered size={"small"}>
                        {categoryTotals.map((c: CategoryTotal) => <Descriptions.Item key={c.name}
                                                                                     label={c.name}>{c.total}</Descriptions.Item>)}
                    </Descriptions>
                </div>

                {/* Transactions Table */}
                <div>
                    <Title level={3}>Transactions</Title>
                    <TransactionsTable dataSource={transactions}/>
                </div>

            </Space>
        </LayoutContainer>
    )
}

export default TransactionsPage;
