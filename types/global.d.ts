declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}
declare module "*.svg" {
  const content: string;
  export default content;
}
type IHistoryProps = {
  history?: History;
};

const SERVER_URL = "";
