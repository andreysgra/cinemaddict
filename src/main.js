import {render} from './framework/render';
import FiltersView from './view/filters-view';
import FilmsPresenter from './presenter/films-presenter';
import FilmsModel from './model/films-model';
import {films} from './mocks/films';
import {comments} from './mocks/comments';
import CommentsModel from './model/comments-model';
import {generateFilters} from './mocks/filter';
import FooterStatisticsPresenter from './presenter/footer-statistics-presenter';
import UserProfilePresenter from './presenter/user-profile-presenter';

const bodyElement = document.body;
const siteHeaderElement = bodyElement.querySelector('.header');
const siteMainElement = bodyElement.querySelector('.main');
const siteFooterStatisticsElement = bodyElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel(films);
const commentsModel = new CommentsModel(comments);

const filters = generateFilters(filmsModel.films);

const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel);
const userProfilePresenter = new UserProfilePresenter(siteHeaderElement, filmsModel);
const footerStatisticPresenter = new FooterStatisticsPresenter(siteFooterStatisticsElement, filmsModel);

render(new FiltersView(filters), siteMainElement);

filmsPresenter.init();
userProfilePresenter.init();
footerStatisticPresenter.init();
