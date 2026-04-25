import {render} from './framework/render';
import UserProfileView from './view/user-profile-view';
import FiltersView from './view/filters-view';
import FooterStatisticsView from './view/footer-statistics-view';
import FilmsPresenter from './presenter/films-presenter';
import FilmsModel from './model/films-model';
import {films} from './mocks/films';

const bodyElement = document.body;
const siteHeaderElement = bodyElement.querySelector('.header');
const siteMainElement = bodyElement.querySelector('.main');
const siteFooterStatisticsElement = bodyElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel(films);

const userProfileComponent = new UserProfileView();
const filtersComponent = new FiltersView();
const footerStatisticsComponent = new FooterStatisticsView();

const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel);

render(userProfileComponent, siteHeaderElement);
render(filtersComponent, siteMainElement);
render(footerStatisticsComponent, siteFooterStatisticsElement);

filmsPresenter.init();
