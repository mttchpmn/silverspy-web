import {Space, Statistic} from "antd";
import {FallOutlined, RiseOutlined, StockOutlined} from "@ant-design/icons";

type Stat = {
    label: string;
    value: string;
    icon: any;
    color: string;
}

type StatsProps = {
    values: Stat[]
}

export function Stats({values}: StatsProps) {
    return (
        <Space size={"small"} style={{width: "100%", justifyContent: "space-evenly"}}>
            <Space size={150} style={{padding: "2rem", backgroundColor: "#fff"}}>
                {
                    values.map((val) => <Statistic key={val.label} title={val.label} value={val.value} prefix={val.icon} valueStyle={{color: val.color}} />)
                }
            </Space>
        </Space>
    )
}