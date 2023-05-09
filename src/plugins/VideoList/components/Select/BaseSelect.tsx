import { DownOutlined, LoadingOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Dropdown, Tooltip } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
type BaseSelectProps<T> = {
  value: string;
  items: ItemType[];
  loading: boolean;
  onOpenChange: (v: boolean) => void;
  placeholder?: React.ReactNode;
  open: boolean;
};

const no_data = uuidv4();
export function BaseSelect<T>({
  value,
  onOpenChange,
  loading,
  placeholder,
  items,
  open,
}: BaseSelectProps<T>) {
  const { t } = useTranslation();
  return (
    <Dropdown
      menu={{
        items: items.length
          ? items
          : [
              {
                label: t("暂无数据"),
                key: no_data,
                title: t("暂无数据"),
                disabled: true,
              },
            ],
      }}
      trigger={["click"]}
      onOpenChange={onOpenChange}
      open={open}
    >
      <Button
        type="dashed"
        onClick={(e) => e.preventDefault()}
        style={{ transform: "scale(.8)" }}
      >
        {(loading ? (
          <LoadingOutlined />
        ) : (
          value && <Tooltip title={value}>{value}</Tooltip>
        )) ||
          placeholder ||
          t("请选择")}
        <span style={{ marginLeft: 10 }}>
          {open ? <UpOutlined /> : <DownOutlined />}
        </span>
      </Button>
    </Dropdown>
  );
}
