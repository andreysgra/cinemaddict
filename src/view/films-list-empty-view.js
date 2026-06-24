import AbstractView from '../framework/view/abstract-view';
import {NoFilmsMessage} from '../const';

const createFilmsListEmptyTemplate = (filterType) => `
  <section class="films-list">
    <h2 class="films-list__title">${NoFilmsMessage[filterType]}</h2>
  </section>
`;

export default class FilmsListEmptyView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();

    this.#filterType = filterType;
  }

  get template() {
    return createFilmsListEmptyTemplate(this.#filterType);
  }
}
