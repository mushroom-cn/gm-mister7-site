import { EllipsisOutlined, StarOutlined } from "@ant-design/icons";
import { EventBusContext } from "@common/global";
import { Card, Tag, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { IMedia } from "./api";
import { DeleteVideoButton, EditVideoButton, PreviewVideo } from "./components";
import styles from "./styles/index.scss";
type VideoCardProps = {
  video: IMedia;
};
export function VideoCard({ video }: VideoCardProps) {
  const { t } = useTranslation();
  const eventBus = useContext(EventBusContext);
  return (
    <Card
      hoverable
      className={styles["video-card"]}
      cover={<PreviewVideo coverSrc={video.coverSrc} videoSrc={video.src} />}
      actions={[
        <EditVideoButton
          key="edit"
          video={video}
          onOk={() => eventBus.emit("refresh")}
        />,
        <Tooltip key="star" title={t("收藏")}>
          <StarOutlined />
        </Tooltip>,
        <DeleteVideoButton
          key="delete"
          id={video.id}
          name={video.name}
          onOk={() => eventBus.emit("refresh")}
          src={video.src}
        />,
        <Tooltip key="ellipsis" title={t("更多")}>
          <EllipsisOutlined />
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
