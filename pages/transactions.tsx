import {NextPage} from "next";
import {PageContainer} from "../components/PageContainer";
import {Button, DatePicker, Descriptions, Radio, Space, Statistic, Typography} from "antd";
import {TransactionsTable} from "../components/TransactionsTable";
import {useTransactions} from "../hooks/useTransactions";
import {useState} from "react";
import moment, {Moment} from "moment";
import {CategoryTotal} from "../types/transaction-types";
import {
    DownloadOutlined,
    FallOutlined,
    FundOutlined,
    RiseOutlined,
    StockOutlined,
    UploadOutlined
} from "@ant-design/icons";
import {ImportTransactionModal} from "../components/ImportTransactionModal";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import axios from "axios";

const {Title, Text} = Typography;
const {RangePicker} = DatePicker;

const TransactionsPage: NextPage = () => {
    const [fromDate, setFromDate] = useState<Moment>(moment()); // TODO - Default dates
    const [toDate, setToDate] = useState<Moment>(moment());
    const [dateValue, setDateValue] = useState<string>("Period")

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

    const dateSelectionOptions = [
        {
            label: "Month",
            value: "month"
        },
        {
            label: "Week",
            value: "week"
        },
        {
            label: "Day",
            value: "day"
        },
        {
            label: "Period",
            value: "period",
            disabled: true
        },
        {
            label: "Custom",
            value: "custom",
            disabled: true
        },
    ];

    return (
        <PageContainer title={"Transactions"}>
            {/*<Title level={2}>Transactions</Title>*/}

            <Space direction={"vertical"} size={"large"} style={{width: "100%"}}>

                <Space style={{width: "100%", justifyContent: "space-between"}}>
                    {/* Transaction Date selection */}
                    <Space>
                        <Radio.Group defaultValue={"month"} onChange={e => setDateValue(e.target.value)}
                                     options={dateSelectionOptions} optionType={"button"} buttonStyle={"solid"}/>
                        {dateValue == "custom" &&
                            <RangePicker disabled format={"ddd, MMM do"} onChange={(range, x) => {
                                const dates = Array.from(range!.values())

                                setFromDate(dates[0]!);
                                setToDate(dates[1]!);

                                console.log({fromDate, toDate})
                            }}/>
                        }
                    </Space>

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
                        <Space size={150} style={{padding: "2rem", backgroundColor: "#fff"}}>

                            <Statistic title={"Total Incoming"} value={"$" + totalIncoming} prefix={<RiseOutlined/>}
                                       valueStyle={{color: "green"}}/>
                            <Statistic title={"Total Outgoing"} value={"$" + totalOutgoing} prefix={<FallOutlined/>}
                                       valueStyle={{color: "red"}}/>
                            <Statistic title={"Net Position"} value={"$" + netPosition} prefix={<StockOutlined/>}
                                       valueStyle={{color: "green"}}/>
                        </Space>
                    </Space>
                </div>

                {/* Transaction Categories */}
                <div>
                    <Title level={3}>Category Totals</Title>
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

export const getServerSideProps = withPageAuthRequired();

export default TransactionsPage;
