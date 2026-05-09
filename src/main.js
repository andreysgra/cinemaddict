import FilmsPresenter from './presenter/films-presenter';
import FilmsModel from './model/films-model';
import {films} from './mocks/films';
import {comments} from './mocks/comments';
import CommentsModel from './model/comments-model';
import FooterStatisticsPresenter from './presenter/footer-statistics-presenter';
import UserProfilePresenter from './presenter/user-profile-presenter';
import FilterPresenter from './presenter/filter-presenter';

const bodyElement = document.body;
const siteHeaderElement = bodyElement.querySelector('.header');
const siteMainElement = bodyElement.querySelector('.main');
const siteFooterStatisticsElement = bodyElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel(films);
const commentsModel = new CommentsModel(comments);

const filterPresenter = new FilterPresenter(siteMainElement, filmsModel);
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel);
const userProfilePresenter = new UserProfilePresenter(siteHeaderElement, filmsModel);
const footerStatisticPresenter = new FooterStatisticsPresenter(siteFooterStatisticsElement, filmsModel);

filterPresenter.init();
filmsPresenter.init();
userProfilePresenter.init();
footerStatisticPresenter.init();
