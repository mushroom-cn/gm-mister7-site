import { useTitle } from '@common';
import { BackLink, Error_500 } from '@common/compopnents';
import { isNumber } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsyncRetry } from 'react-use';
import { api, formatSettings } from '../api';
import {
  ISettingForm,
  RESOURCE_ID,
  routerActionPath,
  routerPath,
} from '../interface';
import { CreateSettingTips } from './CreateSettingTips';
import { SettingsForm } from './SettingsForm';
import { Spin } from 'antd';

export function Setting() {
  const { t } = useTranslation();
  useTitle(t('设置'));
  const { value, loading, error, retry } = useAsyncRetry(async () => {
    const { data } = await api().settings.query({ id: RESOURCE_ID });
    return formatSettings<ISettingForm>(data.data);
  });
  const navigate = useNavigate();
  let { action } = useParams();
  const setting = value?.[0];
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <Spin tip="Loading" size="large" />
      </div>
    );
  }
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <div>
        {action === 'edit' ? (
          <BackLink to={routerActionPath.settings_index} />
        ) : (
          <BackLink to={routerPath.video} />
        )}
      </div>
      {error ? (
        <Error_500
          title={t('服务器开小差')}
          retry={retry}
          content={error.message}
        />
      ) : (
        <>
          {action || setting
            ? !loading && (
                <Scrollbars autoHide autoHeightMax={'100%'}>
                  <SettingsForm
                    setting={setting}
                    isEditing={action && isNumber(+action)}
                    isCreating={action === 'create'}
                    afterSubmit={() => {
                      navigate(routerActionPath.settings_index);
                      retry();
                    }}
                  />
                </Scrollbars>
              )
            : !loading && <CreateSettingTips />}
        </>
      )}
    </div>
  );
}
