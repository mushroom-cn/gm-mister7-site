import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSetState } from 'react-use';
import { interval, take, timer } from 'rxjs';
type ResourceNotFoundProps = {
  title: React.ReactNode;
  retry: VoidFunction;
};
const WAIT = 5;
export function ResourceNotFound({ title, retry }: ResourceNotFoundProps) {
  const [{ canRetry, time }, setState] = useSetState<{
    canRetry: boolean;
    time: number;
  }>({
    canRetry: true,
    time: 5,
  });
  const { t } = useTranslation();
  return (
    <Result
      status="404"
      title={title}
      style={{ height: '100%' }}
      extra={
        <Button
          type="primary"
          disabled={!canRetry}
          onClick={() => {
            if (!retry) {
              return;
            }
            retry();
            setState({ canRetry: false });
            interval(1 * 1000)
              .pipe(take(WAIT))
              .subscribe((v) => {
                setState({ time: WAIT - v - 1 });
                if (v === WAIT - 1) {
                  setState({ canRetry: true });
                }
              });
          }}
        >
          {canRetry ? t(`请重试`) : t(`${time}秒后请重试`)}
        </Button>
      }
    ></Result>
  );
}
