import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DEFAULT_FORM_ITEM_LAYOUT, useTitle } from '@common';
import { Button, Input, Tooltip } from 'antd';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { stringify } from 'json5';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ISetting, api } from '../api';
import { ISettingForm, RESOURCE_ID, routerActionPath } from '../interface';
type SettingsFormProps = {
  setting: ISetting<ISettingForm>;
  isEditing: boolean;
  isCreating: boolean;
  afterSubmit: VoidFunction;
};
export function SettingsForm({
  setting,
  isEditing,
  isCreating,
  afterSubmit,
}: SettingsFormProps) {
  const { t } = useTranslation();
  useTitle(t('编辑'));
  const navigate = useNavigate();
  const { data, ...restSetting } = setting || {};
  const {
    control,
    reset,
    handleSubmit,
    trigger,
    formState: { isValid, isDirty },
  } = useForm<ISetting<ISettingForm>>({
    mode: 'all',
    defaultValues: {
      data: {
        ...data,
        ext: (data?.ext?.length ? data.ext : ['']).map((v) => ({
          id: v,
        })) as any,
      },
      ...restSetting,
      resourceId: RESOURCE_ID,
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'data.ext',
    }
  );
  const edit = isEditing || isCreating;

  const onSubmit = () => {
    trigger(undefined, { shouldFocus: true }).then((isValid) => {
      if (!isValid) {
        return;
      }
      return handleSubmit(async (item) => {
        const setting = {
          ...item,
          data: stringify({
            ...item.data,
            ext: item.data.ext.map(({ id }) => id),
          }),
          name: '',
        };
        if (item.id) {
          await api().settings.update(setting);
        } else {
          await api().settings.create(setting);
        }
        afterSubmit();
      })();
    });
  };

  return (
    <Form {...DEFAULT_FORM_ITEM_LAYOUT}>
      <Controller
        control={control}
        name="data.source"
        rules={{
          validate: (v) => {
            if (!v?.length) {
              return t('不能为空');
            }
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <FormItem
              label={t('扫描文件夹')}
              validateStatus={error?.message ? 'error' : null}
              help={error?.message}
              required
              hasFeedback
            >
              {edit ? <Input {...field} allowClear /> : field.value}
            </FormItem>
          );
        }}
      />
      {/* <Controller
        control={control}
        name="data.target"
        rules={{
          validate: (v) => {
            if (!v?.length) {
              return t('不能为空');
            }
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <FormItem
              label={t('缓存文件夹')}
              validateStatus={error?.message ? 'error' : null}
              help={error?.message}
              required
              hasFeedback
            >
              {edit ? <Input {...field} allowClear /> : field.value}
            </FormItem>
          );
        }}
      /> */}
      {fields.map((v, index) => {
        return (
          <Controller
            key={`data.ext.${index}.id`}
            name={`data.ext.${index}.id`}
            control={control}
            rules={{
              validate: (v) => {
                if (!v?.length) {
                  return t('不能为空');
                }
              },
            }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => {
              return (
                <>
                  <FormItem
                    {...(index === 0 ? null : formItemLayoutWithOutLabel)}
                    label={index === 0 ? t('文件后缀') : ''}
                    required
                    validateStatus={error?.message ? 'error' : null}
                    help={error?.message}
                  >
                    <FormItem noStyle>
                      {edit ? (
                        <Input
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder={t('请输入文件后缀')}
                          allowClear
                          style={{ width: 'calc(100% - 20px)' }}
                        />
                      ) : (
                        value
                      )}
                    </FormItem>
                    {edit && fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(index)}
                      />
                    ) : null}
                  </FormItem>
                </>
              );
            }}
          />
        );
      })}
      {edit && (
        <FormItem {...formItemLayoutWithOutLabel}>
          <FormItem>
            <Button
              type="dashed"
              onClick={() => append({ id: '' }, { shouldFocus: true })}
              icon={<PlusOutlined />}
            >
              {t('添加')}
            </Button>
          </FormItem>
        </FormItem>
      )}
      <FormItem
        wrapperCol={{ ...DEFAULT_FORM_ITEM_LAYOUT.wrapperCol, offset: 8 }}
      >
        {edit ? (
          <>
            <Tooltip title={t('提交')}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onSubmit}
                disabled={!isValid && isDirty}
              >
                {t('提交')}
              </Button>
            </Tooltip>
            <Tooltip title={t('重置')}>
              <Button
                htmlType="button"
                style={{ marginLeft: 16 }}
                disabled={!isDirty}
                onClick={() =>
                  reset(undefined, { keepDirty: false, keepErrors: false })
                }
              >
                {t('重置')}
              </Button>
            </Tooltip>

            <Tooltip title={t('取消')}>
              <Button
                htmlType="button"
                style={{ marginLeft: 16 }}
                onClick={() => {
                  navigate(routerActionPath.settings_index);
                }}
              >
                {t('取消')}
              </Button>
            </Tooltip>
          </>
        ) : (
          <Link to={`${routerActionPath.settings_index}/${setting?.id}`}>
            <Tooltip title={t('编辑')}>
              <Button>{t('编辑')}</Button>
            </Tooltip>
          </Link>
        )}
      </FormItem>
    </Form>
  );
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    span: 16,
    offset: 4,
  },
};
