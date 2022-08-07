import { Descriptions, Typography } from "antd";
import { CategoryTotal } from "../types/payment-types";

const { Title } = Typography;

type CategoriesProps = {
  values: CategoryTotal[];
};

export function Categories({ values }: CategoriesProps) {
  return (
    <div>
      <Title level={3}>Category Totals</Title>
      <Descriptions bordered column={5} size={"small"}>
        {values.map((c) => (
          <Descriptions.Item key={c.category} label={c.category}>
            {c.total}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
  );
}
