import { Input, InputRef, Tag, Tooltip, theme } from 'antd';
import { useSetState } from 'react-use';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { ActorSelect } from '../Select/ActorSelect';
type TagEditorProps = {
  tags: { text: string; value: string }[];
  onChange?: (tags: { text: string; value: string }[]) => void;
  allowEdit?: boolean;
};

export function TagEditor({
  tags = [],
  onChange,
  allowEdit = true,
}: TagEditorProps) {
  const [{ inputVisible, newTag }, setState] = useSetState<{
    inputVisible: boolean;
    newTag: string;
  }>({
    inputVisible: false,
    newTag: null,
  });
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  return (
    <>
      {tags?.map(({ text, value }) => {
        return (
          <Tooltip key={value} title={text}>
            <Tag
              closable
              onClose={() => {
                onChange?.(tags.filter((item) => item.value !== value));
              }}
            >
              {text}
            </Tag>
          </Tooltip>
        );
      })}
      {allowEdit &&
        (inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={newTag}
            onChange={(v) => {
              const newTag = v.target.value;
              setState({ newTag });
            }}
            onBlur={() => {
              setState({ inputVisible: false });
              onChange?.([...(tags ?? []), { text: newTag, value: newTag }]);
            }}
          />
        ) : (
          <Tooltip title={t('添加')}>
            <Tag
              onClick={() => setState({ inputVisible: true })}
              style={{
                background: token.colorBgContainer,
                borderStyle: 'dashed',
              }}
            >
              <PlusOutlined /> {t('添加')}
            </Tag>
          </Tooltip>
        ))}
    </>
  );
}
