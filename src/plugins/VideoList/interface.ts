import { ISetting, SettingDto } from './api';

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

export const routerPath = {
  video: '/video',
  settings: '/video/settings/:action?',
};
export const routerActionPath = {
  settings_index: '/video/settings',
  settings_edit: '/video/settings/edit',
  settings_create: '/video/settings/create',
};

export const RESOURCE_ID = 'media_setting';

export type ISettingForm = {
  source: string;
  target: string;
  ext: { id: string }[];
};
