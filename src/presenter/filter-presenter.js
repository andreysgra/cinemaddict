import {filter} from '../utils/filter';
import FiltersView from '../view/filters-view';
import {render} from '../framework/render';

export default class FilterPresenter {
  #container = null;
  #filtersComponent = null;

  #filmsModel = null;

  constructor({container, filmsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
  }

  get filters() {
    const films = this.#filmsModel.films;

    return Object.entries(filter)
      .map(([filterName, filterFilms]) => (
        {
          name: filterName,
          count: filterFilms(films).length
        }
      ));
  }

  init() {
    const filters = this.filters;

    this.#filtersComponent = new FiltersView({filters});
    render(this.#filtersComponent, this.#container);
  }
}
