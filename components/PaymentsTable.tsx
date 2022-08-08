import {
    Button,
    DatePicker,
    Typography,
    Drawer,
    Input,
    InputNumber,
    Space,
    Table,
    message,
    Popconfirm,
    Select,
} from "antd";
import moment from "moment/moment";
import {ReactElement, useState} from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Payment} from "../types/payment-types";
import axios from "axios";

const {Text} = Typography;
const {Option} = Select;

type PaymentsTableProps = {
    payments: Payment[];
    onPaymentUpdate: (x: Payment) => Promise<void>;
    refreshData: () => void;
};

export function PaymentsTable({payments, onPaymentUpdate, refreshData}: PaymentsTableProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [name, setName] = useState("");
    const [referenceDate, setReferenceDate] = useState("");
    const [type, setType] = useState("");
    const [frequency, setFrequency] = useState("");
    const [category, setCategory] = useState("");
    const [details, setDetails] = useState("");
    const [value, setValue] = useState(0);

    const deletePayment = async (id: number) => {
        await axios.post('/api/delete-payment', {paymentId: id});
        refreshData();
    }

    const columns = [
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Reference Date",
            dataIndex: "referenceDate",
            key: "referenceDate",
            render: (date: string) => moment(date).format("ddd MMM Do yyyy"),
        },
        {
            title: "Type",
            key: "type",
            dataIndex: "type",
        },
        {
            title: "Frequency",
            key: "frequency",
            dataIndex: "frequency",
        },
        {
            title: "Category",
            key: "category",
            dataIndex: "category",
        },
        {
            title: "Details",
            key: "details",
            dataIndex: "details",
            editable: true
        },
        {
            title: "Value",
            key: "value",
            dataIndex: "value",
            render: (val: string) => "$" + val,
        },
        {
            title: "",
            dataIndex: "edit",
            key: "edit",
            width: "5%",
            render: (_: any, record: Payment): ReactElement => (
                <Space style={{width: "100%", justifyContent: "space-between"}}>

                    <EditOutlined
                        onClick={() => {
                            console.log({record})
                            setSelectedPayment(record);
                            setName(record.name);
                            setReferenceDate(record.referenceDate);
                            setType(record.type);
                            setFrequency(record.frequency);
                            setCategory(record.category);
                            setDetails(record.details);
                            setValue(record.value);

                            setIsDrawerOpen(true);
                        }}
                    />
                    <Popconfirm title={"Delete?"} placement={"left"} onConfirm={() => deletePayment(record.id)}>
                        <DeleteOutlined href={"#"}/>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const updatePayment = async () => {
        const payment: Payment = {
            ...selectedPayment,
            name,
            referenceDate,
            type,
            frequency,
            category,
            details,
            value
        }

        await onPaymentUpdate(payment);
        setIsDrawerOpen(false);
        message.success("Payment updated successfully")
        refreshData();
    }

    return (
        <div>
            {/* Edit Payment Drawer */}
            <Drawer
                title={"Edit Payment"}
                placement={"right"}
                onClose={() => setIsDrawerOpen(false)}
                visible={isDrawerOpen}
            >
                <Space direction={"vertical"} style={{width: "100%", height: "100%", justifyContent: "space-between"}}>
                    <Space direction={"vertical"} style={{width: "100%"}}>

                        {/* Inputs */}
                        <Space style={{width: "100%", justifyContent: "space-between"}}>
                            <Text>Name</Text>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: 200 }}
                            />
                        </Space>
                        <Space style={{width: "100%", justifyContent: "space-between"}}>
                            <Text>Reference Date</Text>
                            <DatePicker
                                defaultValue={moment(referenceDate)}
                                onChange={(x, y) => setReferenceDate(x!.toISOString())}
                                style={{ width: 200 }}
                            />
                        </Space>
                        <Space style={{width: "100%", justifyContent: "space-between"}}>
                            <Text>Type</Text>
                            <Select
                                onChange={(x) => setType(x)}
                                defaultValue={"OUTGOING"}
                                style={{ width: 200 }}
                            >
                                <Option value={"INCOMING"}>Incoming</Option>
                                <Option value={"OUTGOING"}>Outgoing</Option>
                            </Select>
                        </Space>
                        <Space style={{width: "100%", justifyContent: "space-between"}}>
                            <Text>Frequency</Text>
                            <Select
                                onChange={(x) => setFrequency(x)}
                                defaultValue={"MONTHLY"}
                                style={{width: 200}}
                            >
                                <Option value={"WEEKLY"}>Weekly</Option>
                                <Option value={"FORTNIGHTLY"}>Fortnightly</Option>
                                <Option value={"MONTHLY"}>Monthly</Option>
                                <Option value={"YEARLY"}>Yearly</Option>
                            </Select>
                        </Space>
                        <Space style={{width: "100%", justifyContent: "space-between"}}>
                            <Text>Category</Text>
                            <Input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ width: 200 }}
                            />
                        </Space>
                        <Space style={{width: "100%", justifyContent: "space-between"}}>
                            <Text>Details</Text>
                            <Input
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                style={{ width: 200 }}
                            />
                        </Space>
                        <Space style={{width: "100%", justifyContent: "space-between"}}>
                            <Text>Value</Text>
                            <InputNumber
                                value={value}
                                onChange={(e) => setValue(e)}
                                style={{ width: 200 }}
                            />
                        </Space>
                    </Space>

                    {/* Update / Cancel buttons */}
                    <Space>
                        <Button type={"primary"} onClick={updatePayment}>
                            Update
                        </Button>
                        <Button onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
                    </Space>
                </Space>
            </Drawer>

            {/* Payments table */}
            <Table
                bordered
                size={"small"}
                columns={columns}
                dataSource={payments}
                pagination={{
                    hideOnSinglePage: true,
                    defaultPageSize: 100
                }
                }
            />
        </div>
    );
}
