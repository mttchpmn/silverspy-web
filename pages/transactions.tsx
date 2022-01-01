import {NextPage} from "next";
import {PageContainer} from "../components/PageContainer";
import {Button, DatePicker, Descriptions, Space, Statistic, Typography} from "antd";
import {TransactionsTable} from "../components/TransactionsTable";
import {useTransactions} from "../hooks/useTransactions";
import {useState} from "react";
import moment, {Moment} from "moment";
import {CategoryTotal} from "../types/transaction-types";
import {DownloadOutlined, UploadOutlined} from "@ant-design/icons";
import {ImportTransactionModal} from "../components/ImportTransactionModal";

const {Title, Text} = Typography;
const {RangePicker} = DatePicker;

const TransactionsPage: NextPage = () => {
    const [fromDate, setFromDate] = useState<Moment>(moment()); // TODO - Default dates
    const [toDate, setToDate] = useState<Moment>(moment());

    const [importModalVisible, setImportModalVisible] = useState<boolean>(false);

    const {
        transactionData,
        isLoading,
        hasError
    } = useTransactions(fromDate.toISOString(), toDate.toISOString())

    if (hasError) return <div>ERROR</div>
    if (isLoading) return <PageContainer title={""}>Loading...</PageContainer>

    const {transactions, categoryTotals, totalIncoming, totalOutgoing, netPosition} = transactionData;

    console.log({categoryTotals})

    return (
        <PageContainer title={"Transactions"}>
            {/*<Title level={2}>Transactions</Title>*/}

            <Space direction={"vertical"} size={"large"} style={{width: "100%"}}>

                <Space style={{width: "100%", justifyContent: "space-between"}}>
                    {/* Transaction Date selection */}
                    <RangePicker disabled format={"ddd, MMM do"} onChange={(range, x) => {
                        const dates = Array.from(range!.values())

                        setFromDate(dates[0]!);
                        setToDate(dates[1]!);

                        console.log({fromDate, toDate})
                    }}/>

                    {/* Import / Export buttons */}
                    <Space>
                        <Button icon={<UploadOutlined/>} onClick={() => setImportModalVisible(true)}>Import</Button>
                        <ImportTransactionModal visible={importModalVisible} onOk={() => setImportModalVisible(false)}/>
                        <Button disabled icon={<DownloadOutlined/>}>Export</Button>
                    </Space>
                </Space>

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
                                                                                     label={c.name}>${c.total}</Descriptions.Item>)}
                    </Descriptions>
                </div>

                {/* Transactions Table */}
                <div>
                    <Title level={3}>Transactions</Title>
                    <TransactionsTable transactionData={transactions} onRowUpdate={() => Promise.resolve(true)}/>
                </div>

            </Space>
        </PageContainer>
    )
}

export default TransactionsPage;
