import {Descriptions, Typography} from "antd";

const {Title} = Typography;

type Category = {
    label: string;
    value: string;
}

type CategoriesProps = {
    values: Category[]
}

export function Categories({values}: CategoriesProps) {
    return (
        <div>
            <Title level={3}>Category Totals</Title>
            <Descriptions bordered column={5} size={"small"}>
                {values.map((c) => <Descriptions.Item key={c.label} label={c.label}>{c.value}</Descriptions.Item>)}
            </Descriptions>
        </div>
    )
}