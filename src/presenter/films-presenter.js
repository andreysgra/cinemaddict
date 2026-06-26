import SortView from '../view/sort-view';
import {remove, render} from '../framework/render';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import {FILMS_COUNT_PER_STEP, FilterType} from '../const';
import ShowMoreButtonView from '../view/show-more-button-view';
import {addEscapeEvent} from '../utils/common';
import FilmsListEmptyView from '../view/films-list-empty-view';
import FilmPresenter from './film-presenter';
import FilmDetailsPresenter from './film-details-presenter';

export default class FilmsPresenter {
  #container = null;

  #filmDetailsPresenter = null;

  #filmsModel = null;
  #commentsModel = null;

  #films = [];

  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = null;

  constructor({container, filmsModel, commentsModel}) {
    this.#container = container;

    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];

    this.#renderFilmsBoard();
  }

  #addFilmDetails = (film) => {
    this.#renderFilmDetails(film);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #removeFilmDetails = () => {
    this.#filmDetailsPresenter.destroy();
    this.#filmDetailsPresenter = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      container: this.#filmsListContainerComponent.element,
      onCardClick: this.#addFilmDetails
    });

    filmPresenter.init(film);
  }

  #renderFilmCards(from, to) {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  }

  #renderFilmDetails(film) {
    const comments = [...this.#commentsModel.getComments(film)];

    this.#filmDetailsPresenter = new FilmDetailsPresenter({
      container: this.#container.parentElement,
      onCloseButtonClick: this.#removeFilmDetails
    });

    this.#filmDetailsPresenter.init(film, comments);
  }

  #renderFilms() {
    render(this.#filmsComponent, this.#container);
  }

  #renderFilmsBoard = () => {
    this.#renderSort();
    this.#renderFilms();

    if (this.#films.length === 0) {
      this.#renderFilmsListEmpty();

      return;
    }

    this.#renderFilmsList();
    this.#renderFilmsListContainer();
    this.#renderFilmCards(0, Math.min(this.#films.length, FILMS_COUNT_PER_STEP));

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderFilmsList() {
    render(this.#filmsListComponent, this.#filmsComponent.element);
  }

  #renderFilmsListContainer() {
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
  }

  #renderFilmsListEmpty() {
    render(new FilmsListEmptyView({filterType: FilterType.ALL}), this.#filmsComponent.element);
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#showMoreButtonClickHandler
    });

    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
  }

  #renderSort() {
    render(this.#sortComponent, this.#container);
  }

  #escKeyDownHandler = (evt) => {
    addEscapeEvent(evt, this.#removeFilmDetails);
  };

  #showMoreButtonClickHandler = () => {
    this.#films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };
}
