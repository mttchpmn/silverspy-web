import {Table} from "antd";

// @ts-ignore
export const TransactionsTable = ({ dataSource }) =>  {
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

    return <div>
        <Table dataSource={dataSource} columns={columns}/>
    </div>;
}