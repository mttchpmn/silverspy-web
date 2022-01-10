import {Button, message, Modal, Radio, Select, Space, Typography, Upload} from "antd";
import {useState} from "react";
import axios from "axios";

const {Text} = Typography;
const {Option} = Select;

export function ImportTransactionModal(props: { visible: boolean, onOk: () => void }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [bankType, setBankType]= useState<string>("");
    const [csvData, setCsvData] = useState<string>("");

    const handleSubmit = () => {
        setIsLoading(true);
        axios.post("/api/import-transactions",
            {
                bankType: bankType.toUpperCase(),
                csvData
            })
            .then(({data}) => {
                console.log({data});
                setIsLoading(false);
                props.onOk();
                message.success("Transactions imported successfully")
            })
    }

    return (
        <Modal title={"Import Transactions"}
               visible={props.visible}
               okText={"Import"}
               onOk={() => handleSubmit()}
               onCancel={props.onOk}
               confirmLoading={isLoading}
        >

            <Space direction={"vertical"} style={{width: "100%"}}>

                <Space style={{width: "100%", justifyContent: "space-between"}}>
                    <Text>Select your bank</Text>
                    {/* TODO - Extract these into constants file*/}
                    <Select onSelect={x => setBankType("asb")} defaultValue={"asb"} style={{width: 120}}>
                        <Option value={"asb"}>ASB</Option>
                        <Option disabled value={"anz"}>ANZ</Option>
                        <Option disabled value={"bnz"}>BNZ</Option>
                        <Option disabled value={"kiwibank"}>Kiwibank</Option>
                        <Option disabled value={"westpac"}>Westpac</Option>
                    </Select>
                </Space>

                <Space style={{width: "100%", justifyContent: "space-between"}}>
                    <Text>Select .CSV file</Text>
                    <Upload
                        accept={".csv"}
                        beforeUpload={(file: any) => {
                            const reader = new FileReader();
                            reader.onload = e => {
                                setCsvData(e.target!.result as string);
                            }

                            reader.readAsText(file);

                            return false;
                        }}
                    >
                        <Button>Select File</Button>
                    </Upload>
                </Space>
            </Space>
        </Modal>
    );
}