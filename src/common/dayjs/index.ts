import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn'; // import locale
import { LocaleLang } from '@common/constants';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isLeapYear);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale(LocaleLang.Zh); // use locale

export const DATE_FORMAT_FULL = 'YYYY-MM-DD HH:mm:ss';
