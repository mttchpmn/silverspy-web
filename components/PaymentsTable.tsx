import {Column, EditableTable} from "./EditableTable";

interface Payment {
    description: string;
    category: string;
    frequency: string;
    nextPaymentDate: string;
    amount: number;
}

export function PaymentsTable() {
    const columns: Column[] = [
        {
            title: "Description",
            key: "description",
            dataIndex: "description",
        },
        {
            title: "Category",
            key: "category",
            dataIndex: "category",
        },
        {
            title: "Frequency",
            key: "frequency",
            dataIndex: "frequency",
        },
        {
            title: "Next Payment Date",
            key: "nextPaymentDate",
            dataIndex: "nextPaymentDate",
        },
        {
            title: "Amount",
            key: "amount",
            dataIndex: "amount",
        },
    ]
    const onRowUpdate = () => Promise.resolve(true);
    const inputData: Payment[] = [
        {
            description: "Rent",
            category: "bills",
            frequency: "weekly",
            nextPaymentDate: "2022-01-09",
            amount: 280
        },
        {
            description: "Climbing membership",
            category: "leisure",
            frequency: "monthly",
            nextPaymentDate: "2022-02-01",
            amount: 99
        },
        {
            description: "Email service",
            category: "subscriptions",
            frequency: "monthly",
            nextPaymentDate: "2022-02-08",
            amount: 8
        }
    ]

    return <div>
        <EditableTable columns={columns} inputData={inputData} onRowUpdate={onRowUpdate}/>
    </div>
}