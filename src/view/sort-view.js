import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';
import classNames from 'classnames';

const createSortItemTemplate = (currentSortType, sortType) => `
    <li>
      <a href="#"
        class="${classNames('sort__button', {'sort__button--active': currentSortType === sortType})}"
        data-sort-type="${sortType}">
        Sort by ${sortType}
      </a>
    </li>
`;

const createSortTemplate = (currentSortType) => `
    <ul class="sort">
      ${Object.values(SortType).map((sortType) => createSortItemTemplate(currentSortType, sortType)).join('')}
    </ul>
  `;

export default class SortView extends AbstractView {
  #sortType = null;

  #handleSortTypeChange = () => null;

  constructor({sortType, onSortTypeChange}) {
    super();

    this.#sortType = sortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#sortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.closest('.sort__button')) {
      evt.preventDefault();

      this.#handleSortTypeChange(evt.target.dataset.sortType);
    }
  };
}
