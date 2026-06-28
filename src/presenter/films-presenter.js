import SortView from '../view/sort-view';
import {remove, render, RenderPosition, replace} from '../framework/render';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import {FILMS_COUNT_PER_STEP, FilterType, SortType} from '../const';
import ShowMoreButtonView from '../view/show-more-button-view';
import {addEscapeEvent, updateItem} from '../utils/common';
import FilmsListEmptyView from '../view/films-list-empty-view';
import FilmPresenter from './film-presenter';
import FilmDetailsPresenter from './film-details-presenter';
import {sortFilmsByDate, sortFilmsByRating} from '../utils/film';

export default class FilmsPresenter {
  #container = null;

  #filmPresenters = new Map();
  #filmDetailsPresenter = null;

  #filmsModel = null;
  #commentsModel = null;

  #films = [];
  #sourcedFilms = [];
  #selectedFilm = null;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #currentSortType = SortType.DEFAULT;

  #sortComponent = null;
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
    this.#sourcedFilms = [...this.#filmsModel.films];

    this.#renderFilmsBoard();
  }

  #addFilmDetails = (film) => {
    if (this.#selectedFilm && this.#selectedFilm.id === film.id) {
      return;
    }

    this.#selectedFilm = film;
    this.#renderFilmDetails(film);
  };

  #clearFilmsMain() {
    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;

    remove(this.#showMoreButtonComponent);
  }

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#filmPresenters.get(updatedFilm.id).init(updatedFilm);

    if (this.#filmDetailsPresenter && this.#selectedFilm.id === updatedFilm.id) {
      this.#selectedFilm = updatedFilm;
      this.#renderFilmDetails(updatedFilm);
    }
  };

  #removeFilmDetails = () => {
    this.#filmDetailsPresenter.destroy();
    this.#filmDetailsPresenter = null;
    this.#selectedFilm = null;
  };

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      container: this.#filmsListContainerComponent.element,
      onCardClick: this.#addFilmDetails,
      onDataChange: this.#handleFilmChange
    });

    filmPresenter.init(film);
    this.#filmPresenters.set(film.id, filmPresenter);
  }

  #renderFilmCards(from, to) {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  }

  #renderFilmDetails(film) {
    const comments = [...this.#commentsModel.getComments(film)];

    if (this.#filmDetailsPresenter === null) {
      this.#filmDetailsPresenter = new FilmDetailsPresenter({
        container: this.#container.parentElement,
        onCloseButtonClick: this.#removeFilmDetails,
        onDataChange: this.#handleFilmChange,
        onEscKeyDown: this.#escKeyDownHandler
      });
    }

    this.#filmDetailsPresenter.init(film, comments);
  }

  #renderFilms() {
    render(this.#filmsComponent, this.#container);
  }

  #renderFilmsBoard = () => {
    this.#renderFilms();

    if (this.#films.length === 0) {
      this.#renderFilmsListEmpty();

      return;
    }

    this.#renderSort();
    this.#renderFilmsList();
    this.#renderFilmsListContainer();
    this.#renderFilmsMain();
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

  #renderFilmsMain() {
    this.#renderFilmCards(0, Math.min(this.#films.length, FILMS_COUNT_PER_STEP));

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#showMoreButtonClickHandler
    });

    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
  }

  #renderSort() {
    if (!this.#sortComponent) {
      this.#sortComponent = new SortView({
        sortType: this.#currentSortType,
        onSortTypeChange: this.#sortTypeChangeHandler
      });

      render(this.#sortComponent, this.#container, RenderPosition.BEFOREBEGIN);
    } else {
      const updatedSortComponent = new SortView({
        sortType: this.#currentSortType,
        onSortTypeChange: this.#sortTypeChangeHandler
      });

      replace(updatedSortComponent, this.#sortComponent);
      this.#sortComponent = updatedSortComponent;
    }
  }

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortFilmsByDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortFilmsByRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
  };

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

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmsMain();
    this.#renderSort();
    this.#renderFilmsMain();
  };
}
