import SortView from '../view/sort-view';
import {remove, render} from '../framework/render';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import {FILMS_COUNT_PER_STEP} from '../const';
import FilmCardView from '../view/film-card-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmDetailsView from '../view/film-details-view';
import {addEscapeEvent} from '../utils/common';

export default class FilmsPresenter {
  #container = null;

  #filmsModel = null;
  #commentsModel = null;

  #films = [];
  #comments = [];

  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmDetailsComponent = null;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];

    render(this.#sortComponent, this.#container);
    render(this.#filmsComponent, this.#container);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    for (let i = 0; i < FILMS_COUNT_PER_STEP; i++) {
      this.#renderFilm(this.#films[i]);
    }

    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
  }

  #addFilmDetailsComponent = (film) => {
    this.#renderFilmDetails(film);

    document.body.classList.add('hide-overflow');

    this.#filmDetailsComponent.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#removeFilmDetailsComponent);

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #removeFilmDetailsComponent = () => {
    remove(this.#filmDetailsComponent);

    document.body.classList.remove('hide-overflow');

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #renderFilm(film) {
    const filmCardComponent = new FilmCardView(film);

    const showFilmDetailsComponent = (evt) => {
      evt.preventDefault();

      this.#addFilmDetailsComponent(film);
    };

    render(filmCardComponent, this.#filmsListContainerComponent.element);

    filmCardComponent.element.querySelector('.film-card__link')
      .addEventListener('click', showFilmDetailsComponent);
  }

  #renderFilmDetails(film) {
    this.#comments = [...this.#commentsModel.getComments(film)];
    this.#filmDetailsComponent = new FilmDetailsView(film, this.#comments);

    render(this.#filmDetailsComponent, this.#container.parentElement);
  }

  #onEscKeyDown = (evt) => addEscapeEvent(evt, this.#removeFilmDetailsComponent);
}
