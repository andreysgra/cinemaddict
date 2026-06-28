import FilmDetailsView from '../view/film-details-view';
import {render, remove, replace} from '../framework/render';

export default class FilmDetailsPresenter {
  #container = null;

  #closeButtonClickHandler = () => null;
  #escKeyDownHandler = () => null;
  #handleDataChange = () => null;

  #filmDetailsComponent = null;

  #film = null;
  #comments = null;

  constructor({container, onCloseButtonClick, onDataChange, onEscKeyDown}) {
    this.#container = container;
    this.#closeButtonClickHandler = onCloseButtonClick;
    this.#handleDataChange = onDataChange;
    this.#escKeyDownHandler = onEscKeyDown;
  }

  destroy() {
    remove(this.#filmDetailsComponent);

    document.removeEventListener('keydown', this.#escKeyDownHandler);
    document.body.classList.remove('hide-overflow');
  }

  init(film, comments) {
    this.#film = film;
    this.#comments = comments;

    const currentFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView({
      film: this.#film,
      comments: this.#comments,
      onCloseButtonClick: this.#closeButtonClickHandler,
      onFavoriteButtonClick: this.#favoriteButtonClickHandler,
      onWatchedButtonClick: this.#watchedButtonClickHandler,
      onWatchlistButtonClick: this.#watchlistButtonClickHandler
    });

    if (currentFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#container);

      document.addEventListener('keydown', this.#escKeyDownHandler);
      document.body.classList.add('hide-overflow');
    } else {
      replace(this.#filmDetailsComponent, currentFilmDetailsComponent);
      remove(currentFilmDetailsComponent);
    }
  }

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
