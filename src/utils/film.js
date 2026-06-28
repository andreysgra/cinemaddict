import dayjs from 'dayjs';

export const sortCommentsByDate = (commentA, commentB) => dayjs(commentA.date).diff(dayjs(commentB.date));

export const sortFilmsByDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date)
  .diff(dayjs(filmA.filmInfo.release.date));

export const sortFilmsByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
