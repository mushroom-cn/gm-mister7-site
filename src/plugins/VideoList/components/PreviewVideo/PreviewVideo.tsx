import { Spin } from 'antd';
import { useSetState } from 'react-use';
import { VideoJS } from './VideoJs';
import styles from './styles/index.scss';
import classNames from 'classnames';

type PreviewVideoProps = {
  width?: number;
  height?: number;
  coverSrc: string;
  videoSrc: string;
};
export enum PreviewMode {
  Img,
  Gallery,
  Video,
}
export function PreviewVideo({
  width = 300,
  height = 150,
  coverSrc,
  videoSrc,
}: PreviewVideoProps) {
  const [{ loading, mode }, setState] = useSetState<{
    loading: boolean;
    mode: PreviewMode;
  }>({
    loading: true,
    mode: PreviewMode.Img,
  });
  return (
    <div className={styles['video-preview-img']}>
      {mode === PreviewMode.Img ? (
        <div
          className={classNames(styles['cover-img'])}
          style={{ backgroundImage: `url(${coverSrc})` }}
          onClick={() => {
            setState({ mode: PreviewMode.Video });
          }}
        />
      ) : (
        <VideoJS
          options={{
            src: videoSrc,
            fluid: true,
            preload: 'auto',
            autoplay: true,
            controls: true,
            width,
            height,
            type: 'application/x-mpegURL',
          }}
          onReady={() => {
            setState({
              loading: false,
            });
          }}
        />
      )}
      {loading && <Spin />}
    </div>
  );
}
