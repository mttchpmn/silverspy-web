import { Transaction } from "../types/transaction-types";
import moment from "moment";
import {
  DeliveredProcedureOutlined,
  EditOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import { ReactElement } from "react";

type TransactionTableProps = {
  transactionData: Transaction[];
  onRowUpdate: (row: any) => Promise<boolean>;
};

export const TransactionsTable = ({
  transactionData,
  onRowUpdate,
}: TransactionTableProps) => {
  console.log({ transactionData });
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
      render: (val, record) => (val ? val : <em>{record.description}</em>),
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
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
        <EditOutlined onClick={() => console.log("EDIT")} />
      ),
    },
  ];

  return (
    <div>
      <Table
        bordered
        size={"small"}
        columns={columns}
        dataSource={transactionData}
      />
    </div>
  );
};
