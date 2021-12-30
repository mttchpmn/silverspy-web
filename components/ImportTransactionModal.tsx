import {Button, message, Modal, Radio, Select, Space, Typography, Upload} from "antd";
import {useState} from "react";

const {Text} = Typography;
const {Option} = Select;

export function ImportTransactionModal(props: { visible: boolean, onOk: () => void }) {
    const [fileContent, setFileContent] = useState<string>("");

    return (
        <Modal title={"Import Transactions"}
               visible={props.visible}
               okText={"Import"}
               onOk={props.onOk}
               onCancel={props.onOk}>

            <Space direction={"vertical"} style={{width: "100%"}}>

                <Space style={{width: "100%", justifyContent: "space-between"}}>
                    <Text>Select your bank</Text>
                    {/* TODO - Extract these into constants file*/}
                    <Select defaultValue={"asb"} style={{width: 120}}>
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
                                setFileContent(e.target!.result as string);
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