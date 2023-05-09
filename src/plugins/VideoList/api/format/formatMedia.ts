import { MediaDto } from "../__generated__/api";
import { IMedia } from "../interface";

function getCacheBasePath() {
  return `//${SERVER_URL}/cache`;
}

export function formatMedia(medias: MediaDto[]): IMedia[] {
  return medias.map((item) => ({
    ...item,
    src: `${getCacheBasePath()}/${item.name}/${item.name.split(".")[0]}.m3u8`,
    coverSrc: `${getCacheBasePath()}/${item.name}/${
      item.name.split(".")[0]
    }.png`,
  }));
}
