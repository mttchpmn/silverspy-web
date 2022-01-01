import {SetStateAction, useState} from "react";
import {Form, Input, InputNumber, message, Table} from "antd";
import {DeliveredProcedureOutlined, EditOutlined} from "@ant-design/icons";
import moment from "moment";
import {Transaction} from "../types/transaction-types";

type EditableCellProps = {
    editing: any;
    dataIndex: string;
    title: string;
    inputType: string;
    record: any;
    index: any;
    children: any;
}

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }: EditableCellProps) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

type EditableTableProps = {
    inputData: Transaction[];
    onRowUpdate: (record: any) => Promise<boolean>
}

const EditableTable = ({inputData, onRowUpdate}: EditableTableProps) => {
        const [form] = Form.useForm();
        const [data, setData] = useState<any>(inputData);
        const [editingKey, setEditingKey] = useState<string>("");

        const isEditing = (record: { key: string; }) => record.key === editingKey;

        const editRow = (record: { key: SetStateAction<string>; }) => {
            form.setFieldsValue({...record});
            setEditingKey(record.key);
        };

        const saveRow = async (record: any) => {
            const values = await form.validateFields();

            let updatedRecord = {...record, ...values};
            const successful = await onRowUpdate(updatedRecord);

            successful
                ? message.success("Transaction updated successfully")
                : message.error("Error updating transaction")

            setEditingKey('');
        };

        const cancel = () => {
            setEditingKey('');
        };

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
                title: "Amount",
                dataIndex: "amount",
                key: "amount",
                width: "20%",
                render: (x: number) => <p>${x}</p>
            },
            {
                title: "Edit",
                dataIndex: "edit",
                key: "edit",
                width: "5%",
                render: (_: any, record: any) => isEditing(record)
                    ? <DeliveredProcedureOutlined onClick={() => saveRow(record)}/>
                    : <EditOutlined onClick={() => editRow(record)}/>
            }
        ];

        const mergedColumns = columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record: any) => ({
                    record,
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        });

        return (
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    size={"small"}
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    expandable={{
                        expandedRowRender: record => <p>Processed Date: {record.processedDate}; Reference: {record.reference}</p>
                    }}
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        );
    }
;


type TransactionTableProps = {
    transactionData: Transaction[];
    onRowUpdate: (row: any) => Promise<boolean>
}

export const TransactionsTable = ({transactionData, onRowUpdate}: TransactionTableProps) => {

    return <div>
        <EditableTable inputData={transactionData} onRowUpdate={onRowUpdate}/>
    </div>
}