import { SettingOutlined } from '@ant-design/icons';
import { useTitle } from '@common';
import { Error_500 } from '@common/compopnents';
import { EventBusContext } from '@common/global';
import { Col, Row, Skeleton, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAsyncRetry, useSetState } from 'react-use';
import { useGrid } from '../../device';
import { VideoCard } from './VideoCard';
import { api, formatMedia } from './api';
import styles from './styles/index.scss';
const GRID_SIZE = 24;

export const VideoList: React.FC = () => {
  const [colCount, horizontal, vertical] = useGrid();
  const [{ search, canRetry }, setState] = useSetState<{
    search: string;
    canRetry: boolean;
  }>({
    search: '',
    canRetry: true,
  });
  const { t } = useTranslation();
  useTitle(t('视频列表'));
  const {
    value = [],
    loading,
    retry,
    error,
  } = useAsyncRetry(async () => {
    const { data } = await api().media.list({ page: 0, pageSize: 100 });
    return formatMedia(data.data);
  }, []);
  const span = GRID_SIZE / colCount;
  const eventBus = useContext(EventBusContext);

  useEffect(() => {
    const refresh = () => {
      retry();
    };
    eventBus.on('refresh', refresh);
    return () => {
      eventBus.off('refresh', refresh);
    };
  }, [retry, eventBus]);

  const cols = value.map((video) => (
    <Col key={video.id} span={span}>
      <VideoCard video={video} />
    </Col>
  ));
  if (loading) {
    return <Skeleton active />;
  }
  //   if (!cols.length) {
  //     return <ResourceNotFound title={"资源未找到"} retry={retry} />;
  //   }
  return (
    <>
      <div className={styles['video-list-toolbox']}>
        <Search
          placeholder={t('请输入关键字...')}
          allowClear
          value={search}
          onSearch={(value) => {
            setState({ search: value });
          }}
          onChange={({ target: { value } }) => {
            setState({ search: value });
          }}
        />
        <Link to={'/video/settings'}>
          <Tooltip title={t('设置')}>
            <SettingOutlined style={{ marginLeft: 16 }} />
          </Tooltip>
        </Link>
      </div>
      {error ? (
        <Error_500
          title={t('服务器开小差')}
          retry={retry}
          content={error.message}
        />
      ) : (
        <div
          style={{
            maxHeight: 'calc(100% - 32px)',
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Row gutter={[vertical, horizontal]}>{cols}</Row>
        </div>
      )}
    </>
  );
};
