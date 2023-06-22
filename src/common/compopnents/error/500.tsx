import { Button, Result, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSetState } from 'react-use';
import { interval, take } from 'rxjs';
const { Paragraph, Text } = Typography;
type ResourceNotFoundProps = {
  title: React.ReactNode;
  content?: React.ReactNode;
  retry: VoidFunction;
};
const WAIT = 5;
export function Error_500({ title, retry, content }: ResourceNotFoundProps) {
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
      status="500"
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
    >
      <Text
        strong
        style={{
          fontSize: 16,
        }}
      >
        {content}
      </Text>
    </Result>
  );
}
