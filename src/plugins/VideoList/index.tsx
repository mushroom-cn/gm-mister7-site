import { addEntryRouter } from "../../routers";
import { VideoList } from "./VideoList";
import { VideoCameraOutlined } from "@ant-design/icons";

const routerPath = {
  video: "/video",
};

addEntryRouter([
  {
    path: routerPath.video,
    isDefault: true,
    label: "视频",
    icon: <VideoCameraOutlined />,
    component: VideoList,
    children: [],
  },
]);
