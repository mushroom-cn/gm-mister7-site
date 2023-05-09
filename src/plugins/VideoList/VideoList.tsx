import { Button, Col, Result, Row, Skeleton } from "antd";
import Search from "antd/es/input/Search";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAsyncRetry, useSetState } from "react-use";
import { useGrid } from "../../device";
import { VideoCard } from "./VideoCard";
import styles from "./styles/index.scss";
import { api, formatMedia } from "./api";
import { timer } from "rxjs";
import { EventBusContext } from "@common/global";
import { ResourceNotFound } from "@common/compopnents";
const GRID_SIZE = 24;

export const VideoList: React.FC = () => {
  const [colCount, horizontal, vertical] = useGrid();
  const [{ search, canRetry }, setState] = useSetState<{
    search: string;
    canRetry: boolean;
  }>({
    search: "",
    canRetry: true,
  });
  const { t } = useTranslation();
  const {
    value = [],
    loading,
    retry,
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
    eventBus.on("refresh", refresh);
    return () => {
      eventBus.off("refresh", refresh);
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
  if (!cols.length) {
    return <ResourceNotFound title={"资源未找到"} retry={retry} />;
  }
  return (
    <>
      <Search
        placeholder={t("请输入关键字...")}
        allowClear
        className={styles["video-seach-box"]}
        value={search}
        onSearch={(value) => {
          setState({ search: value });
        }}
        onChange={({ target: { value } }) => {
          setState({ search: value });
        }}
      />
      <Row gutter={[vertical, horizontal]}>{cols}</Row>
    </>
  );
};
