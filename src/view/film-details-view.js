import AbstractView from '../framework/view/abstract-view';
import {getDuration, getFullDateMonthAsString, getFullDateWithTime, getHumanizeDate} from '../utils/format-date-time';
import {sortCommentsByDate} from '../utils/film';
import classNames from 'classnames';
import {EMOTIONS} from '../const';

const createGenresTemplate = (genres) => genres
  .map((genre) => `<span class="film-details__genre">${genre}</span>`)
  .join('');

const createCommentTemplate = (data) => {
  const {comment, emotion, author, date} = data;
  const commentDate = getFullDateWithTime(date);
  const commentDateHumanize = getHumanizeDate(date);

  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day" title="${commentDate}">${commentDateHumanize}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `;
};

const createFilmCommentsTemplate = (comments) => {
  const commentsList = [...comments]
    .sort(sortCommentsByDate)
    .map((comment) => createCommentTemplate(comment))
    .join('');

  return `
    <ul class="film-details__comments-list">
      ${commentsList}
    </ul>
  `;
};

const createEmotionTemplate = (emotion) =>
  `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
      id="emoji-${emotion}" value="${emotion}">
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji-${emotion}">
    </label>
 `;

const createEmotionList = (emotions) =>
  emotions
    .map((emotion) => createEmotionTemplate(emotion))
    .join('');

const createFilmDetailsTemplate = (film, comments) => {
  const {
    filmInfo: {
      title,
      alternativeTitle,
      totalRating,
      poster,
      ageRating,
      director,
      writers,
      actors,
      release: {
        date,
        releaseCountry
      },
      duration,
      genre,
      description
    },
    userDetails: {
      watchlist,
      favorite,
      alreadyWatched
    }
  } = film;

  const writersList = writers.join(', ');
  const actorsList = actors.join(', ');
  const releaseDate = getFullDateMonthAsString(date);
  const filmDuration = getDuration(duration);
  const genreTitle = genre.length > 1 ? 'Genres' : 'Genre';
  const genresList = createGenresTemplate(genre);

  return `
    <section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
        <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="${title}">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writersList}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actorsList}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Duration</td>
              <td class="film-details__cell">${filmDuration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genreTitle}</td>
              <td class="film-details__cell">${genresList}</td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

        <section class="film-details__controls">
          <button
              type="button"
              class="${classNames('film-details__control-button film-details__control-button--watchlist', {'film-details__control-button--active': watchlist})}"
              id="watchlist"
              name="watchlist">
              Add to watchlist
            </button>
            <button
              type="button"
              class="${classNames('film-details__control-button film-details__control-button--watched', {'film-details__control-button--active': alreadyWatched})}"
              id="watched"
              name="watched">
              Already watched
            </button>
            <button
              type="button"
              class="${classNames('film-details__control-button film-details__control-button--favorite', {'film-details__control-button--active': favorite})}"
              id="favorite"
              name="favorite">
              Add to favorites
            </button>
        </section>
      </div>

      <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">
          Comments <span class="film-details__comments-count">${comments.length}</span>
        </h3>

        ${createFilmCommentsTemplate(comments)}

        <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${createEmotionList(EMOTIONS)}
          </div>
        </form>
      </section>
    </div>
    </div>
   </section>`;
};

export default class FilmDetailsView extends AbstractView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();

    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmDetailsTemplate(this.#film, this.#comments);
  }
}
