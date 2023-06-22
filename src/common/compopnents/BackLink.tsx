import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
type BackLinkProps = {
  to: string;
};
export function BackLink({ to }: BackLinkProps) {
  const { t } = useTranslation();
  return (
    <Tooltip title={t('返回')}>
      <Link to={to}>
        <ArrowLeftOutlined />
      </Link>
    </Tooltip>
  );
}
