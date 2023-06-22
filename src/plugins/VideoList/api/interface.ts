import { MediaDto, SettingDto } from './__generated__/api';

export type IMedia = MediaDto & { src: string; coverSrc: string };

export type ISetting<T> = Omit<SettingDto, 'data'> & { data: T };
