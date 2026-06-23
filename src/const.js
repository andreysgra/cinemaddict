export const FILMS_COUNT_PER_STEP = 5;

export const DESCRIPTION_LENGTH = 140;

export const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export const NoFilmsMessage = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now'
};
