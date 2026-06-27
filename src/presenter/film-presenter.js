import {remove, render} from '../framework/render';
import FilmCardView from '../view/film-card-view';

export default class FilmPresenter {
  #container = null;

  #film = null;

  #onCardClick = () => null;

  #filmCardComponent = null;

  constructor({container, onCardClick}) {
    this.#container = container;
    this.#cardClickHandler = onCardClick;
  }

  destroy() {
    remove(this.#filmCardComponent);
  }

  init(film) {
    this.#film = film;

    this.#filmCardComponent = new FilmCardView({
      film: this.#film,
      onCardClick: this.#cardClickHandler,
      onFavoriteButtonClick: this.#favoriteButtonClickHandler,
      onWatchedButtonClick: this.#watchedButtonClickHandler,
      onWatchlistButtonClick: this.#watchlistButtonClickHandler
    });

    render(this.#filmCardComponent, this.#container);
  }

  #cardClickHandler = () => {
    this.#onCardClick(this.#film);
  };

  #favoriteButtonClickHandler = () => {

  };

  #watchedButtonClickHandler = () => {

  };

  #watchlistButtonClickHandler = () => {

  };
}
