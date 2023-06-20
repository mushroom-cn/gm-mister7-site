import { useRef, useEffect } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';
import 'videojs-contrib-hls';
import { useLocalStorage } from 'react-use';

type PreviewVideoProps = {
  options: any;
  onReady: (p: Player) => void;
};
const volumeCacheKey = 'Volume';

export const VideoJS = ({ options, onReady }: PreviewVideoProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const { type, ...optRest } = options;
  const [volume, setVolume] = useLocalStorage(volumeCacheKey, 0);
  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current?.appendChild(videoElement);
      const player = videojs(
        videoElement,
        {
          ...optRest,
          withCredentials: true,
          ...{
            html5: {
              hls: {},
            },
          },
        },
        () => {
          onReady && onReady(player);
        }
      );
      playerRef.current = player;
    } else {
      const player = playerRef.current;
      player.width(optRest.width);
      player.height(optRest.height);
      player.volume(+volume);
      player.src({
        src: optRest.src,
        type,
      });
      (player as Player & { hlsQualitySelector: any }).hlsQualitySelector?.({
        displayCurrentQuality: true,
      });
      player.on('volumechange', (v: any) => {
        setVolume(player.volume());
      });
    }
  }, [options, videoRef]);
  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};
