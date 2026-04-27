import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const getFullYear = (date) => dayjs(date).format('YYYY');

export const getDuration = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');

export const getFullDateMonthAsString = (date) => dayjs(date).format('DD MMMM YYYY');

export const getFullDateWithTime = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');

export const getHumanizeDate = (date) => dayjs.duration(dayjs(date).diff(dayjs())).humanize(true);
