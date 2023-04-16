import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

export function VideoCard() {
  return (
    <Card
      hoverable
      style={{ width: 240, margin: "0 auto" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
      actions={[
        <EditOutlined key="edit" title="edit" />,
        <StarOutlined key="star" />,
        <DeleteOutlined key="delete" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
}
