import AbstractView from '../framework/view/abstract-view';

const createFooterStatisticsTemplate = () => `
  <p>130 291 movies inside</p>
`;

export default class FooterStatisticsView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createFooterStatisticsTemplate();
  }
}
