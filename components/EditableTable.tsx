import {Form, Input, InputNumber, message, Table} from "antd";
import {ReactElement, SetStateAction, useState} from "react";
import moment from "moment";
import {DeliveredProcedureOutlined, EditOutlined} from "@ant-design/icons";
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

export interface Column {
    title: string;
    dataIndex: string;
    key: string;
    width?: string;
    editable?: boolean;
    render?: (value: any, record: any) => string | ReactElement
}

interface EditableTableProps<T> {
    columns: Column[],
    inputData: T[];
    onRowUpdate: (record: any) => Promise<boolean>
}

export const EditableTable = <T extends unknown>({columns, inputData, onRowUpdate}: EditableTableProps<T>) => {
        const [form] = Form.useForm();
        const [data, setData] = useState<any>(inputData);
        const [editingKey, setEditingKey] = useState<string>("");

        const editColumn: Column = {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
            width: "5%",
            render: (_: any, record: any): ReactElement => isEditing(record)
                ? <DeliveredProcedureOutlined onClick={() => saveRow(record)}/>
                : <EditOutlined onClick={() => editRow(record)}/>
        }
        const newColumns = [...columns, editColumn];

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


        const mergedColumns = newColumns.map((col) => {
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
                    pagination={{
                        onChange: cancel,
                        defaultPageSize: 100,
                        hideOnSinglePage: true
                    }}
                />
            </Form>
        );
    }
;