import { MediaDto } from '../__generated__/api';
import { IMedia } from '../interface';

function getCacheBasePath() {
  return `${SERVER_URL}/cache/`;
}

export function formatMedia(medias: MediaDto[]): IMedia[] {
  return medias.map((item) => ({
    ...item,
    src: `${getCacheBasePath()}${item.target}.m3u8`,
    coverSrc: `${getCacheBasePath()}${item.target}.png`,
  }));
}
