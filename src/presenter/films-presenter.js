import SortView from '../view/sort-view';
import {remove, render} from '../framework/render';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import {FILMS_COUNT_PER_STEP, FilterType} from '../const';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmDetailsView from '../view/film-details-view';
import {addEscapeEvent} from '../utils/common';
import FilmsListEmptyView from '../view/films-list-empty-view';
import FilmPresenter from './film-presenter';

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

  constructor({container, filmsModel, commentsModel}) {
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
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #removeFilmDetailsComponent = () => {
    remove(this.#filmDetailsComponent);

    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      container: this.#filmsListContainerComponent.element,
      onCardClick: this.#addFilmDetailsComponent
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

    this.#filmDetailsComponent = new FilmDetailsView({
      film,
      comments,
      onCloseButtonClick: this.#removeFilmDetailsComponent
    });

    render(this.#filmDetailsComponent, this.#container.parentElement);
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
    addEscapeEvent(evt, this.#removeFilmDetailsComponent);
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
