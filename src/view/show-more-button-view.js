import AbstractView from '../framework/view/abstract-view';

const createShowMoreButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class ShowMoreButtonView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createShowMoreButtonTemplate();
  }
}
