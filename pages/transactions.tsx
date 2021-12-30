import {NextPage} from "next";
import LayoutContainer from "../components/LayoutContainer";
import {Col, DatePicker, Row, Statistic, Typography} from "antd";
import {TransactionsTable} from "../components/TransactionsTable";
import useSwr from "swr";
import axios from "axios";

const {Title, Text} = Typography;
const {RangePicker} = DatePicker;

const TransactionsPage: NextPage = () => {

    const {data, error} = useSwr("/api/mockTransactions", axios);

    if (!data) return <LayoutContainer>Loading...</LayoutContainer>
    const tableData = data.data.tableData;

    console.log(data.data)

    return (
        <LayoutContainer>
            <Title level={2}>Transactions</Title>

            {/* Transaction Date selection*/}
            <div>
                <Text>Showing transactions from: </Text>
                <RangePicker format={"ddd, MMM do"}/>
            </div>

            {/* Transaction stats */}
            <div>
                <Row>
                    <Col span={8}>
                        <Statistic title={"Total Incoming"} value={6179} prefix={"$"} valueStyle={{color: "green"}}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title={"Total Outgoing"} value={1069} prefix={"$"} valueStyle={{color: "red"}}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title={"Net Position"} value={5110} prefix={"$"} valueStyle={{color: "green"}}/>
                    </Col>
                </Row>
            </div>

            <TransactionsTable dataSource={tableData} />
        </LayoutContainer>
    )
}

export default TransactionsPage;
