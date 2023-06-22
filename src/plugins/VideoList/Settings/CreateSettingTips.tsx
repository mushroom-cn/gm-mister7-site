import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routerActionPath } from '../interface';

export function CreateSettingTips() {
  const { t } = useTranslation();
  return (
    <Result
      title={t('未找到资源配置，现在开始创建配置吧！')}
      extra={
        <Link to={routerActionPath.settings_create}>
          <Button type="primary" key="console">
            {t('创建')}
          </Button>
        </Link>
      }
    />
  );
}
