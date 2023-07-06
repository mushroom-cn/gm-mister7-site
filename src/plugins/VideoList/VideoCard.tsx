import {
  EllipsisOutlined,
  StarOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { EventBusContext } from '@common/global';
import { Card, Dropdown, Tag, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IMedia, api } from './api';
import { DeleteVideoButton, EditVideoButton, PreviewVideo } from './components';
import styles from './styles/index.scss';
import classNames from 'classnames';
type VideoCardProps = {
  video: IMedia;
  className?: string;
};
export function VideoCard({ video, className }: VideoCardProps) {
  const { t } = useTranslation();
  const eventBus = useContext(EventBusContext);
  return (
    <Card
      hoverable
      className={classNames(styles['video-card'], className)}
      cover={<PreviewVideo coverSrc={video.coverSrc} videoSrc={video.src} />}
      actions={[
        <Tooltip key="reload" title={t('重新加载')}>
          <ReloadOutlined
            onClick={() => api().media.rescann({ id: video.id })}
          />
        </Tooltip>,
        <Tooltip key="delete" title={t('删除')}>
          <DeleteVideoButton
            key="delete"
            id={video.id}
            name={video.name}
            onOk={() => eventBus.emit('refresh')}
            src={video.src}
          />
        </Tooltip>,
        <Tooltip key="star" title={t('收藏')}>
          <StarOutlined />
        </Tooltip>,
        <Tooltip key="ellipsis" title={t('更多')}>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'edit',
                  icon: (
                    <EditVideoButton
                      key="edit"
                      video={video}
                      onOk={() => eventBus.emit('refresh')}
                    />
                  ),
                  label: t('编辑'),
                },
              ],
            }}
            trigger={['click']}
          >
            <EllipsisOutlined />
          </Dropdown>
        </Tooltip>,
      ]}
    >
      {(video?.actors?.length && (
        <Meta
          description={video.actors.map((actor) => (
            <Tooltip key={actor.id} title={actor.name}>
              <Tag color="cyan">{actor.name}</Tag>
            </Tooltip>
          ))}
        />
      )) ||
        null}
      <Meta
        title={video.name}
        description={
          video?.tags?.map(({ id, name }) => (
            <Tooltip key={id} title={name}>
              <Tag color="default">{name}</Tag>
            </Tooltip>
          )) || video?.description
        }
      />
    </Card>
  );
}
