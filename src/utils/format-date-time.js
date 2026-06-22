import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getFullYear = (date) => dayjs(date).format('YYYY');

export const getDuration = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');
