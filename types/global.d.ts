declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}

declare module "*.scss" {
  type Content = Record<string, string>;
  export default Content;
}

type IHistoryProps = {
  history?: History;
};
