import AbstractView from '../framework/view/abstract-view';
import {getDuration, getFullYear} from '../utils/format-date-time';
import {getShortDescription} from '../utils/common';
import classNames from 'classnames';

const createFilmCardTemplate = (film) => {
  const {
    filmInfo: {
      title,
      totalRating,
      poster,
      release: {
        date
      },
      description,
      duration,
      genre
    },
    userDetails: {
      watchlist,
      favorite,
      alreadyWatched
    },
    comments
  } = film;

  const releaseDate = getFullYear(date);
  const filmDuration = getDuration(duration);

  return `
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDate}</span>
          <span class="film-card__duration">${filmDuration}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="${poster}" alt="${title}" class="film-card__poster">
        <p class="film-card__description">${getShortDescription(description)}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button
          class="${classNames('film-card__controls-item film-card__controls-item--add-to-watchlist',
    {'film-card__controls-item--active': watchlist})}"
          type="button">
          Add to watchlist
        </button>
        <button
          class="${classNames('film-card__controls-item film-card__controls-item--mark-as-watched',
    {'film-card__controls-item--active': alreadyWatched})}"
          type="button">
          Mark as watched
        </button>
        <button
          class="${classNames('film-card__controls-item film-card__controls-item--favorite',
    {'film-card__controls-item--active': favorite})}"
          type="button">
          Mark as favorite
        </button>
      </div>
    </article>
`;
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor({film}) {
    super();

    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }
}
