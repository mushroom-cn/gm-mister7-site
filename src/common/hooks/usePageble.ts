import { useEffect } from 'react';
import { useAsyncRetry, useSetState } from 'react-use';
import { DEFAULT_PAGE_SIZE } from '../constants';
export type PageQuery = {
  page: number;
  pageSize: number;
};
type UsePagebleProps<T> = {
  defaultPageSize?: number;
  onFetch: ({}: PageQuery) => Promise<{ data: T[]; totalCount: number }>;
};

export function usePageble<T>({
  onFetch,
  defaultPageSize = DEFAULT_PAGE_SIZE,
}: UsePagebleProps<T>) {
  const [state, setState] = useSetState<{
    totalCount: number;
    data: T[];
    page: number;
  }>({
    data: [],
    page: 1,
    totalCount: 0,
  });

  const { data, page } = state;

  const { value, loading, retry, error } = useAsyncRetry(() => {
    return onFetch({
      page: (page - 1) * defaultPageSize,
      pageSize: defaultPageSize,
    });
  }, [page]);

  const updateData = (newData: { data: T[]; totalCount: number }) => {
    if (!newData) {
      return;
    }
    setState({
      data: [...data, ...(newData.data || [])],
      totalCount: newData.totalCount,
    });
  };

  useEffect(() => {
    updateData(value);
  }, [value]);

  const loadMore = () => {
    setState({ page: page + 1 });
  };
  return { ...state, loading, error, loadMore, retry };
}
