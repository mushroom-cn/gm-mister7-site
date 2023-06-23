import { FileSyncOutlined, SettingOutlined } from '@ant-design/icons';
import { usePageble, useTitle } from '@common';
import { Error_500 } from '@common/compopnents';
import { EventBusContext } from '@common/global';
import { Button, Empty, Spin, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useContext, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSetState } from 'react-use';
import { VideoCard } from './VideoCard';
import { api, formatMedia } from './api';
import { routerActionPath } from './interface';
import styles from './styles/index.scss';

export const VideoList: React.FC = () => {
  const [{ search }, setState] = useSetState<{
    search: string;
    canRetry: boolean;
  }>({
    search: '',
    canRetry: true,
  });
  const { t } = useTranslation();
  const nav = useNavigate();
  useTitle(t('视频列表'));

  const { data, loading, totalCount, error, loadMore, retry } = usePageble({
    onFetch: async (p) => {
      const { data } = await api().media.list(p);
      return { data: formatMedia(data.data), totalCount: data.totalCount };
    },
  });

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

  function getDataByFilter() {
    const newData = data.filter(({ name, actors, tags }) => {
      return (
        !search ||
        name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        actors.some(
          ({ name: actorName }) =>
            actorName.toLowerCase().indexOf(search.toLowerCase()) > -1
        ) ||
        tags.some(
          ({ name: tagName }) =>
            tagName.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      );
    });
    return { data: newData, totalCount: newData.length };
  }
  const latestData = getDataByFilter();
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
        <Tooltip title={t('设置')}>
          <SettingOutlined
            style={{ marginLeft: 16 }}
            onClick={() => {
              nav(routerActionPath.settings_index);
            }}
          />
        </Tooltip>
        <Tooltip title={t('重新扫描')}>
          <FileSyncOutlined
            style={{ marginLeft: 16 }}
            onClick={() => {
              api().media.reindex();
            }}
          />
        </Tooltip>
      </div>
      {!loading && latestData.totalCount < 1 && search ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>{t(`未找到: ${search}`)}</span>}
        />
      ) : (
        <>
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
              <Scrollbars autoHide hideTracksWhenNotNeeded>
                <div className={styles['video-list-wrapper']}>
                  {Array(50)
                    .fill(1)
                    .map((v, index) => ({ ...latestData.data[0], id: index }))
                    .map((v) => {
                      return (
                        <VideoCard
                          key={v.id}
                          video={v}
                          className="video-card-item"
                        />
                      );
                    })}
                  <div className={styles['load-more']}>
                    {loading ? (
                      <Spin />
                    ) : (
                      data.length < totalCount && (
                        <Button type="link" onClick={loadMore}>
                          {'加载更多...'}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </Scrollbars>
            </div>
          )}
        </>
      )}
    </>
  );
};
