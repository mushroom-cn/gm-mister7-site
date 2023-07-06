import { DeleteOutlined } from '@ant-design/icons';
import { Form, Modal, Spin, Tooltip } from 'antd';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useSetState } from 'react-use';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IDeleteVideoForm } from './interface';
import { api } from '@plugins/VideoList/api';
type DeleteVideoProps = {
  id: number;
  name: string;
  src: string;
  visible: boolean;
  onOk?: VoidFunction;
  onClose?: VoidFunction;
};
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
export function DeleteVideo({
  id,
  name,
  visible,
  onClose,
  onOk,
}: DeleteVideoProps) {
  const [{ loading }, setState] = useSetState<{
    loading: boolean;
  }>({
    loading: false,
  });
  const { control, handleSubmit, trigger } = useForm<
    IDeleteVideoForm,
    undefined,
    IDeleteVideoForm
  >({
    mode: 'onChange',
  });
  const { t } = useTranslation();
  const onOkFunc = useCallback(async () => {
    try {
      setState({ loading: true });
      const isValid = await trigger(undefined, { shouldFocus: true });
      if (!isValid) {
        return;
      }
      await handleSubmit(async ({ id }) => {
        await api().media.delete({ ids: [id], force: true });
      })();
      onOk();
    } catch {
    } finally {
      setState({ loading: false });
    }
  }, [handleSubmit, onOk, setState, trigger]);

  return (
    <Modal
      title={t('删除')}
      onOk={onOkFunc}
      onCancel={onClose}
      open={visible}
      okText={<>{loading ? <Spin size="small" /> : t('确定')}</>}
      cancelText={t('取消')}
    >
      <Form labelAlign="right">
        <Controller
          name="id"
          control={control}
          defaultValue={id}
          rules={{
            required: true,
            validate: (v) => {
              if (!v) {
                return t('ID不可为空');
              }
            },
          }}
          render={({ field: { value: id }, fieldState: { error } }) => {
            return (
              <Form.Item
                {...formItemLayout}
                label="ID"
                required
                status={error?.message ? 'error' : null}
              >
                <Tooltip title={id}>{id}</Tooltip>
              </Form.Item>
            );
          }}
        />
        <Form.Item {...formItemLayout} label="名称">
          <Tooltip title={name}>{name}</Tooltip>
        </Form.Item>
      </Form>
    </Modal>
  );
}

type DeleteVideoButtonProps = Omit<DeleteVideoProps, 'visible'>;
export function DeleteVideoButton({
  onClose,
  onOk,
  ...rest
}: DeleteVideoButtonProps) {
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
      <Tooltip key="delete" title={t('删除')}>
        <DeleteOutlined
          key="delete"
          onClick={(e) => {
            setState({ visible: true });
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      </Tooltip>
      {visible &&
        createPortal(
          <DeleteVideo
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
