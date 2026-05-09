import FooterStatisticsView from '../view/footer-statistics-view';
import {render} from '../framework/render';

export default class FooterStatisticsPresenter {
  #container = null;
  #footerStatisticsComponent = null;

  #filmsModel = null;

  constructor(container, filmsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
  }

  init() {
    const filmsCount = this.#filmsModel.films.length;

    this.#footerStatisticsComponent = new FooterStatisticsView(filmsCount);
    render(this.#footerStatisticsComponent, this.#container);
  }
}
