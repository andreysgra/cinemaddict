import dayjs from 'dayjs';

export const sortCommentsByDate = (commentA, commentB) => dayjs(commentA.date).diff(dayjs(commentB.date));
