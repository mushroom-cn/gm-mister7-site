import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { DATE_FORMAT_FULL } from "@common";
import { ActorDto, IMedia, MediaDto } from "@plugins/VideoList/api";
import { Form, Input, Modal, Tooltip } from "antd";
import dayjs from "dayjs";
import { useCallback } from "react";
import { createPortal } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSetState } from "react-use";
import { ActorSelect, TagSelect } from "../Select";
import { TagEditor } from "../TagEditor";
type EditVideoProps = {
  video: IMedia;
  visible: boolean;
  onOk?: VoidFunction;
  onClose?: VoidFunction;
};
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
export function EditVideo({ video, visible, onOk, onClose }: EditVideoProps) {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<MediaDto>({
    mode: "all",
    defaultValues: video,
  });
  const handleSubmitFunc = useCallback(async () => {
    await handleSubmit(async (v) => {
      throw v;
    })();
    onOk();
  }, [onOk, handleSubmit]);
  return (
    <Modal
      open={visible}
      title={t("修改")}
      onOk={() => {
        handleSubmitFunc();
      }}
      onCancel={() => {
        onClose();
      }}
      okText={"确定"}
      cancelText={t("取消")}
    >
      <Form labelAlign="right">
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
            validate: (v) => {
              if (!v) {
                return t("名称不能为空");
              }
              return;
            },
          }}
          render={({ field, fieldState: { error } }) => {
            return (
              <Form.Item
                {...formItemLayout}
                label={t("名称")}
                required
                validateStatus={error?.message ? "error" : null}
                help={error?.message}
              >
                <Input
                  {...field}
                  maxLength={255}
                  minLength={1}
                  placeholder={t("请输入名称")}
                  title={field.value}
                  status={error?.message ? "error" : undefined}
                />
              </Form.Item>
            );
          }}
        />
        <Controller
          name="actors"
          control={control}
          render={({
            field: { value: actors, onChange },
            fieldState: { error },
          }) => {
            return (
              <Form.Item
                {...formItemLayout}
                label={t("演员")}
                help={error?.message}
                validateStatus={error?.message ? "error" : undefined}
              >
                <TagEditor
                  tags={actors?.map((v) => ({
                    text: v.name,
                    value: `${v.id}`,
                  }))}
                  onChange={undefined}
                />
                <ActorSelect
                  value={null}
                  onChange={(v: ActorDto) => {
                    onChange([...actors, v]);
                  }}
                  placeholder={
                    <Tooltip title={t("选择已有")}>{t("选择已有")}</Tooltip>
                  }
                />
              </Form.Item>
            );
          }}
        />
        <Controller
          name="tags"
          control={control}
          defaultValue={video.tags}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Form.Item {...formItemLayout} label={t("标签")}>
                <TagEditor
                  tags={value.map((v) => ({ text: v.name, value: `${v.id}` }))}
                  onChange={(tag) => {
                    onChange();
                  }}
                />

                <TagSelect
                  value={null}
                  onChange={(v) => {
                    onChange([...value, v]);
                  }}
                  placeholder={
                    <Tooltip title={t("选择已有")}>{t("选择已有")}</Tooltip>
                  }
                />
              </Form.Item>
            );
          }}
        />
        <Form.Item {...formItemLayout} label={t("创建时间")}>
          <Tooltip title={dayjs(video?.createDate).format(DATE_FORMAT_FULL)}>
            {dayjs(video?.createDate).format(DATE_FORMAT_FULL)}
          </Tooltip>
        </Form.Item>
        <Form.Item {...formItemLayout} label={t("更新时间")}>
          <Tooltip title={dayjs(video?.createDate).format(DATE_FORMAT_FULL)}>
            {dayjs(video?.createDate).format(DATE_FORMAT_FULL)}
          </Tooltip>
        </Form.Item>
      </Form>
    </Modal>
  );
}

type EditVideoButtonProps = Omit<EditVideoProps, "visible">;
export function EditVideoButton({
  onClose,
  onOk,
  ...rest
}: EditVideoButtonProps) {
  const { t } = useTranslation();
  const [{ visible }, setState] = useSetState<{
    visible: boolean;
  }>({
    visible: false,
  });

  const onOKFunc = () => {
    setState({ visible: false });
    onOk?.();
  };
  const onCloseFunc = () => {
    setState({ visible: false });
    onClose?.();
  };
  return (
    <>
      <Tooltip key="edit" title={t("编辑")}>
        <EditOutlined
          onClick={(e) => {
            setState({ visible: true });
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      </Tooltip>
      {visible &&
        createPortal(
          <EditVideo
            {...rest}
            visible={visible}
            onClose={onCloseFunc}
            onOk={onOKFunc}
          />,
          document.body
        )}
    </>
  );
}
