import {remove, render, replace} from '../framework/render';
import FilmCardView from '../view/film-card-view';

export default class FilmPresenter {
  #container = null;

  #film = null;

  #onCardClick = () => null;
  #handleDataChange = () => null;

  #filmCardComponent = null;

  constructor({container, onCardClick, onDataChange}) {
    this.#container = container;
    this.#cardClickHandler = onCardClick;
    this.#handleDataChange = onDataChange;
  }

  destroy() {
    remove(this.#filmCardComponent);
  }

  init(film) {
    this.#film = film;

    const currentFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView({
      film: this.#film,
      onCardClick: this.#cardClickHandler,
      onFavoriteButtonClick: this.#favoriteButtonClickHandler,
      onWatchedButtonClick: this.#watchedButtonClickHandler,
      onWatchlistButtonClick: this.#watchlistButtonClickHandler
    });

    if (currentFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#container);
    } else {
      replace(this.#filmCardComponent, currentFilmCardComponent);
      remove(currentFilmCardComponent);
    }
  }

  #cardClickHandler = () => {
    this.#onCardClick(this.#film);
  };

  #favoriteButtonClickHandler = () => {
    this.#handleDataChange({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite
      }
    });
  };

  #watchedButtonClickHandler = () => {
    this.#handleDataChange({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched
      }
    });
  };

  #watchlistButtonClickHandler = () => {
    this.#handleDataChange({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist
      }
    });
  };
}
