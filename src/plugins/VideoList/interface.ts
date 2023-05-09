export type IVideo = {
  id: number;
  coverSrc: string;
  videoSrc: string;
  mediaType: string;
  name: string;
  tags: ITag[];
  description: string;
  actors: string[];
  createTime: string;
};
export type ITag = {
  id: string;
  type: string;
  content: string;
};
