import { useTitle } from '@common';
import { useTranslation } from 'react-i18next';

export function Setting() {
  const { t } = useTranslation();
  useTitle(t('设置'));
  return <strong>{'setting'}</strong>;
}
