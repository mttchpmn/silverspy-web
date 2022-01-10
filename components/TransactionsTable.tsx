import {Transaction} from "../types/transaction-types";
import {EditableTable} from "./EditableTable";
import moment from "moment";
import {DeliveredProcedureOutlined, EditOutlined} from "@ant-design/icons";


type TransactionTableProps = {
    transactionData: Transaction[];
    onRowUpdate: (row: any) => Promise<boolean>
}

export const TransactionsTable = ({transactionData, onRowUpdate}: TransactionTableProps) => {
    console.log({transactionData})
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            width: "10%",
            render: (date: string) => moment(date).format("ddd MMM Do")
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            width: "10%",
            render: (x: number) => x > 0 ? "CREDIT" : "DEBIT"
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: "10%",
            editable: true
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            editable: true
            // width: "10%"
        },
        {
            title: "Value",
            dataIndex: "value",
            key: "value",
            width: "20%",
            render: (x: number) => `$${x}`
        },
    ];

    return <div>
        <EditableTable columns={columns} inputData={transactionData} onRowUpdate={onRowUpdate}/>
    </div>
}