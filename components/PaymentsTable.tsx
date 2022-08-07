import { Column, EditableTable } from "./EditableTable";

interface Payment {
  description: string;
  category: string;
  frequency: string;
  nextPaymentDate: string;
  amount: number;
}

type PaymentsTableProps = {
  payments: Payment[];
};

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const columns: Column[] = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Type",
      key: "paymentType",
      dataIndex: "paymentType",
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
    },
    {
      title: "Value",
      key: "value",
      dataIndex: "value",
    },
  ];
  const onRowUpdate = () => Promise.resolve(true);

  return (
    <div>
      <EditableTable
        columns={columns}
        inputData={payments}
        onRowUpdate={onRowUpdate}
      />
    </div>
  );
}
