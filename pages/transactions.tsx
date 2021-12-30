import {NextPage} from "next";
import LayoutContainer from "../components/LayoutContainer";
import {DatePicker, Row, Col, Statistic, Typography, Table} from "antd";

const {Title, Text} = Typography;
const {RangePicker} = DatePicker;

const TransactionsPage: NextPage = () => {

    const tableData = [
        {
            key: '1',
            date: "2021-12-19",
            type: "DEBIT",
            description: "Groceries",
            amount: 49.90
        },
        {
            key: '2',
            date: "2021-12-19",
            type: "CREDIT",
            description: "Salary",
            amount: 6179.00
        },
        {
            key: '3',
            date: "2021-12-20",
            type: "DEBIT",
            description: "Beer",
            amount: 79.90
        },
        {
            key: '4',
            date: "2021-12-24",
            type: "DEBIT",
            description: "Presents",
            amount: 234.99
        },
        {
            key: '5',
            date: "2021-12-26",
            type: "DEBIT",
            description: "Brunch",
            amount: 72.00
        },
    ];

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date"
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount"
        },
    ]
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

        {/* Transaction Table*/}
            <div>
                <Table dataSource={tableData} columns={columns} />
            </div>
        </LayoutContainer>
    )
}

export default TransactionsPage;
