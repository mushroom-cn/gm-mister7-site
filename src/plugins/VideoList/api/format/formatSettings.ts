import { SettingDto } from '../__generated__/api';
import { parse } from 'json5';
import { ISetting } from '../interface';
export function formatSettings<T>(setting: SettingDto[]): ISetting<T>[] {
  return setting.map((v) => ({
    ...v,
    data: parse(v.data),
  }));
}
