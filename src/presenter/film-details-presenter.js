import FilmDetailsView from '../view/film-details-view';

import {render, remove} from '../framework/render';

export default class FilmDetailsPresenter {
  #container = null;

  #onCloseButtonClickHandler = () => null;

  #filmDetailsComponent = null;

  #film = null;
  #comments = null;

  constructor({container, onCloseButtonClick}) {
    this.#container = container;
    this.#closeButtonClickHandler = onCloseButtonClick;
  }

  destroy() {
    remove(this.#filmDetailsComponent);
    document.body.classList.remove('hide-overflow');
  }

  init(film, comments) {
    this.#film = film;
    this.#comments = comments;

    this.#filmDetailsComponent = new FilmDetailsView({
      film: this.#film,
      comments: this.#comments,
      onCloseButtonClick: this.#closeButtonClickHandler,
      onFavoriteButtonClick: this.#favoriteButtonClickHandler,
      onWatchedButtonClick: this.#watchedButtonClickHandler,
      onWatchlistButtonClick: this.#watchlistButtonClickHandler
    });

    render(this.#filmDetailsComponent, this.#container);
    document.body.classList.add('hide-overflow');
  }

  #closeButtonClickHandler = () => {
    this.#onCloseButtonClickHandler();
  };

  #favoriteButtonClickHandler = () => {

  };

  #watchedButtonClickHandler = () => {

  };

  #watchlistButtonClickHandler = () => {

  };
}
