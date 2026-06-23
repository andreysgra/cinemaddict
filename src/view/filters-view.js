import AbstractView from '../framework/view/abstract-view';
import {capitalizeFirstLetter} from '../utils/common';
import {FilterType} from '../const';
import classNames from 'classnames';

const createFilterTemplate = ({name, count}, currentFilter) => {
  const filterName = name !== FilterType.ALL
    ? `${capitalizeFirstLetter(name)}`
    : `${capitalizeFirstLetter(name)} movies`;

  const filterCount = name !== FilterType.ALL
    ? `<span class="main-navigation__item-count">${count}</span>`
    : '';

  return `
    <a
      href="#${name}"
      class="${classNames('main-navigation__item', {'main-navigation__item--active': currentFilter})}">
      ${filterName} ${filterCount}
    </a>
  `;
};

const createFiltersTemplate = (filters) => `
  <nav class="main-navigation">
    ${filters
    .map((filter, currentFilter) => createFilterTemplate(filter, currentFilter === 0))
    .join('')}
  </nav>
`;

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();

    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
