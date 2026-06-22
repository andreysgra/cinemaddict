import SortView from '../view/sort-view';
import {render} from '../framework/render';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import {FILMS_COUNT_PER_STEP} from '../const';
import FilmCardView from '../view/film-card-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmDetailsView from '../view/film-details-view';

export default class FilmsPresenter {
  #container = null;
  #filmsModel = null;
  #films = [];
  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmDetailsComponent = new FilmDetailsView();

  constructor(container, filmsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];
  }

  init() {
    render(this.#sortComponent, this.#container);
    render(this.#filmsComponent, this.#container);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    for (let i = 0; i < FILMS_COUNT_PER_STEP; i++) {
      render(new FilmCardView(), this.#filmsListContainerComponent.element);
    }

    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
    render(this.#filmDetailsComponent, this.#container.parentElement);
    this.#filmDetailsComponent.element.style.display = 'none';
  }
}
