import { TagDto, api } from '@plugins/VideoList/api';
import { useCallback } from 'react';
import { useSetState } from 'react-use';
import { v4 as uuidv4 } from 'uuid';
import { BaseSelect } from './BaseSelect';
type TagSelectProps = {
  value: string;
  onChange: (v: TagDto) => void;
  placeholder?: React.ReactNode;
};

const no_data = uuidv4();
export function TagSelect({ value, onChange, placeholder }: TagSelectProps) {
  const [{ loading, data: actors, open }, setState] = useSetState<{
    loading: boolean;
    data: TagDto[];
    error: any;
    open: boolean;
  }>({
    loading: false,
    data: [],
    error: null,
    open: false,
  });

  const onFetch = useCallback(async () => {
    try {
      setState({ loading: true });
      const { data } = await api().actors.list({ page: 0, pageSize: 100 });
      setState({ data: data.data });
    } catch (error) {
      setState({ error });
    } finally {
      setState({ loading: false });
    }
  }, []);

  return (
    <BaseSelect
      items={actors.map((item) => ({
        key: item.id,
        label: item.name,
        title: item.name,
        onClick: () => {
          onChange?.(item);
        },
      }))}
      onOpenChange={(v) => {
        setState({ open: v });
        v && onFetch();
      }}
      value={value}
      loading={loading}
      open={open}
      placeholder={placeholder}
    />
  );
}
