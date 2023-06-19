import { VideoCameraOutlined } from "@ant-design/icons";
import { addEntryRouter } from "../../routers";
import { Setting } from "./Settings";
import { VideoList } from "./VideoList";
import { routerPath } from "./interface";

addEntryRouter([
  {
    path: routerPath.settings,
    label: "设置",
    icon: <VideoCameraOutlined />,
    component: Setting,
    isHideInMenu: true,
  },
  {
    path: routerPath.video,
    isDefault: true,
    label: "视频",
    icon: <VideoCameraOutlined />,
    component: VideoList,
  },
]);
