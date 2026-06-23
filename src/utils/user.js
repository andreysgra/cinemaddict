import {userRating, userRank} from '../const';

export const getUserRating = (films) => {
  const filmCount = films.reduce((count, film) => count + Number(film.userDetails.alreadyWatched), 0);

  if (filmCount >= userRating.NOVICE.MIN && filmCount <= userRating.NOVICE.MAX) {
    return userRank.NOVICE;
  }

  if (filmCount >= userRating.FAN.MIN && filmCount <= userRating.FAN.MAX) {
    return userRank.FAN;
  }

  if (filmCount > userRating.FAN.MAX) {
    return userRank.MOVIE_BUFF;
  }

  return userRank.NONE;
};
