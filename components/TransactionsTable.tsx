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
            title: "Category",
            dataIndex: "category",
            key: "category"
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (x: number) => <p>${x}</p>
        },
    ]

    return <div>
        <Table size={"middle"} dataSource={dataSource} columns={columns}/>
    </div>;
}