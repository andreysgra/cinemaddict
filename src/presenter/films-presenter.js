import SortView from '../view/sort-view';
import {remove, render} from '../framework/render';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import {FILMS_COUNT_PER_STEP, FilterType} from '../const';
import FilmCardView from '../view/film-card-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmDetailsView from '../view/film-details-view';
import {addEscapeEvent} from '../utils/common';
import FilmsListEmptyView from '../view/films-list-empty-view';

export default class FilmsPresenter {
  #container = null;

  #filmsModel = null;
  #commentsModel = null;

  #films = [];

  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = null;
  #filmDetailsComponent = null;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];

    this.#renderFilmsBoard();
  }

  #addFilmDetailsComponent = (film) => {
    this.#renderFilmDetails(film);

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #removeFilmDetailsComponent = () => {
    remove(this.#filmDetailsComponent);

    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #renderFilm(film) {
    const filmCardComponent = new FilmCardView({film, onCardClick: () =>
      this.#addFilmDetailsComponent(film)});

    render(filmCardComponent, this.#filmsListContainerComponent.element);
  }

  #renderFilmDetails(film) {
    const comments = [...this.#commentsModel.getComments(film)];

    this.#filmDetailsComponent = new FilmDetailsView({film, comments,
      onCloseButtonClick: this.#removeFilmDetailsComponent});

    render(this.#filmDetailsComponent, this.#container.parentElement);
  }

  #renderFilmsBoard = () => {
    render(this.#sortComponent, this.#container);
    render(this.#filmsComponent, this.#container);

    if (this.#films.length === 0) {
      render(new FilmsListEmptyView(FilterType.ALL), this.#filmsComponent.element);

      return;
    }

    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#films
      .slice(0, Math.min(this.#films.length, FILMS_COUNT_PER_STEP))
      .forEach((film) => this.#renderFilm(film));

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView({onClick: this.#onShowMoreButtonClick});
      render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
    }
  };

  #onEscKeyDown = (evt) => addEscapeEvent(evt, this.#removeFilmDetailsComponent);

  #onShowMoreButtonClick = () => {
    this.#films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };
}
