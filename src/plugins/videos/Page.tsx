import { Col, Row, Slider } from "antd";
import React, { useState } from "react";
import { useGrid } from "../../device";
import { VideoCard } from "./VideoCard";
import Search from "antd/es/input/Search";

export const VideoPage: React.FC = () => {
  const [colCount, horizontal, vertical] = useGrid();
  const span = 24 / colCount;
  const cols = [];
  for (let i = 0; i < colCount; i++) {
    cols.push(
      <Col key={i.toString()} span={span}>
        <VideoCard />
      </Col>
    );
  }
  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        style={{ width: 200, marginBottom: 10 }}
      />

      <Row gutter={[vertical, horizontal]}>
        {cols}
        {cols}
      </Row>
    </>
  );
};
