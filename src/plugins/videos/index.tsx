import { addEntryRouter } from "../../routers";
import { VideoPage } from "./Page";
import { VideoCameraOutlined } from "@ant-design/icons";

const routerPath = {
  video: "/video",
};

addEntryRouter([
  {
    path: routerPath.video,
    label: "视频",
    icon: <VideoCameraOutlined />,
    component: VideoPage,
    children: [],
  },
]);
