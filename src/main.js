import FilmsPresenter from './presenter/films-presenter';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';
import {films} from './mocks/films';
import {comments} from './mocks/comments';
import FilterPresenter from './presenter/filter-presenter';
import FooterStatisticsPresenter from './presenter/footer-statistics-presenter';
import UserProfilePresenter from './presenter/user-profile-presenter';

const bodyElement = document.body;
const siteHeaderElement = bodyElement.querySelector('.header');
const siteMainElement = bodyElement.querySelector('.main');
const siteFooterStatisticsElement = bodyElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel(films);
const commentsModel = new CommentsModel(comments);

const filterPresenter = new FilterPresenter({
  container: siteMainElement,
  filmsModel
});

const filmsPresenter = new FilmsPresenter({
  container: siteMainElement,
  filmsModel,
  commentsModel
});

const userProfilePresenter = new UserProfilePresenter({
  container: siteHeaderElement,
  filmsModel
});

const footerStatisticPresenter = new FooterStatisticsPresenter({
  container: siteFooterStatisticsElement,
  filmsModel
});

filterPresenter.init();
filmsPresenter.init();
userProfilePresenter.init();
footerStatisticPresenter.init();
