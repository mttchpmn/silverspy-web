import { Transaction } from "../types/transaction-types";
import moment from "moment";
import {
  DeliveredProcedureOutlined,
  EditOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Descriptions,
  Drawer,
  Input,
  message,
  Space,
  Table,
} from "antd";
import { ReactElement, useState } from "react";

type TransactionTableProps = {
  transactionData: Transaction[];
  onRowUpdate: (row: Transaction) => Promise<boolean>;
  refreshData: () => void;
};

export const TransactionsTable = ({
  transactionData,
  onRowUpdate,
  refreshData,
}: TransactionTableProps) => {
  console.log({ transactionData });

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeTransaction, setActiveTransaction] = useState<Transaction>();
  const [category, setCategory] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "10%",
      render: (date: string) => moment(date).format("ddd MMM Do"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "5%",
      render: (x: number) =>
        x === 1 ? (
          <UpCircleOutlined style={{ color: "green" }} />
        ) : (
          <DownCircleOutlined style={{ color: "red" }} />
        ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "10%",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      // render: (val, record) => (val ? val : <em>{record.description}</em>),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (val: any) => <em style={{ color: "#909090" }}>{val}</em>,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "10%",
      render: (x: number) => `$${x}`,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      width: "5%",
      render: (_: any, record: any): ReactElement => (
        <EditOutlined
          onClick={() => {
            setActiveTransaction(record);
            setCategory(activeTransaction?.category ?? "");
            setDetails(activeTransaction?.details ?? "");
            setIsDrawerOpen(true);
          }}
        />
      ),
    },
  ];

  const updateTransaction = async () => {
    const newTransaction = {
      ...activeTransaction,
      category,
      details,
    };

    const result = await onRowUpdate(newTransaction as Transaction);

    setCategory("");
    setDetails("");
    setIsDrawerOpen(false);
    message.success("Transaction updated successfully");
    refreshData();
  };

  return (
    <div>
      {/* Edit Transaction Drawer */}
      <Drawer
        title={"Edit Transaction"}
        placement={"right"}
        onClose={() => setIsDrawerOpen(false)}
        visible={isDrawerOpen}
      >
        <Space direction={"vertical"}>
          {/* TODO - Prefill inputs with values from active transaction */}
          <Descriptions bordered column={1} size={"small"}>
            <Descriptions.Item label={"Date"}>
              {moment(activeTransaction?.transactionDate).format("ddd MMM Do")}
            </Descriptions.Item>
            <Descriptions.Item label={"Type"}>
              {activeTransaction?.type === 1 ? "CREDIT" : "DEBIT"}
            </Descriptions.Item>
            <Descriptions.Item label={"Description"}>
              {activeTransaction?.description}
            </Descriptions.Item>
            <Descriptions.Item label={"Value"}>
              ${activeTransaction?.value}
            </Descriptions.Item>
          </Descriptions>
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Transaction category"
          />
          <Input
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Transaction details"
          />

          {/* Update / Cancel buttons */}
          <Space>
            <Button type={"primary"} onClick={updateTransaction}>
              Update
            </Button>
            <Button onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
          </Space>
        </Space>
      </Drawer>

      {/* Transaction Table */}
      <Table
        bordered
        size={"small"}
        columns={columns}
        dataSource={transactionData}
      />
    </div>
  );
};
