import {
  Button,
  DatePicker,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Space,
  Typography,
  Upload,
} from "antd";
import { useState } from "react";
import axios from "axios";

const { Text } = Typography;
const { Option } = Select;

type AddPaymentModalProps = {
  visible: boolean;
  onOk: () => void;
};

export function AddPaymentModal({ visible, onOk }: AddPaymentModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [referenceDate, setReferenceDate] = useState<string>("");

  const handleSubmit = () => {
    const payload = {
      name,
      type,
      frequency,
      category,
      details,
      value,
      referenceDate,
    };

    console.log({ payload });
    setIsLoading(true);
    axios.post("/api/add-payment", payload).then(({ data }) => {
      console.log({ data });
      setIsLoading(false);
      onOk();
      message.success("Payment added successfully");
    });
  };

  return (
    <Modal
      title={"Add New Payment"}
      visible={visible}
      okText={"Add"}
      onOk={() => handleSubmit()}
      onCancel={onOk}
      confirmLoading={isLoading}
    >
      <Space direction={"vertical"} style={{ width: "100%" }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Text>Name</Text>
          <Input
            value={name}
            placeholder={"New monthly bill"}
            onChange={(x) => setName(x.target.value)}
            style={{ width: 300 }}
          />
        </Space>

        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Text>Category</Text>
          <Input
            value={category}
            placeholder={"FIXED_COSTS"}
            onChange={(x) => setCategory(x.target.value)}
            style={{ width: 300 }}
          />
        </Space>

        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Text>Details</Text>
          <Input
            value={details}
            placeholder={"Bill details"}
            onChange={(x) => setDetails(x.target.value)}
            style={{ width: 300 }}
          />
        </Space>

        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Text>Payment type</Text>
          <Select
            onChange={(x) => setType(x)}
            defaultValue={"OUTGOING"}
            style={{ width: 300 }}
          >
            <Option value={"INCOMING"}>Incoming</Option>
            <Option value={"OUTGOING"}>Outgoing</Option>
          </Select>
        </Space>

        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Text>Payment frequency</Text>
          <Select
            onChange={(x) => setFrequency(x)}
            defaultValue={"MONTHLY"}
            style={{ width: 300 }}
          >
            <Option value={"WEEKLY"}>Weekly</Option>
            <Option value={"FORTNIGHTLY"}>Fortnightly</Option>
            <Option value={"MONTHLY"}>Monthly</Option>
            <Option value={"YEARLY"}>Yearly</Option>
          </Select>
        </Space>

        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Text>Reference Date*</Text>
          <DatePicker
            onChange={(x) => setReferenceDate(x?.toISOString()!)}
            style={{ width: 300 }}
          />
        </Space>

        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Text>Value</Text>
          <Input
            value={value}
            type="number"
            onChange={(x) => setValue(parseFloat(x.target.value))}
            style={{ width: 300 }}
          />
          {/* //TODO - Input validation */}
        </Space>
        <Text>
          * Known date in the past which this payment has occurred on.
        </Text>
      </Space>
    </Modal>
  );
}
