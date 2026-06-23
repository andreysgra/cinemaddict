import {render} from './framework/render';
import UserProfileView from './view/user-profile-view';
import FooterStatisticsView from './view/footer-statistics-view';
import FilmsPresenter from './presenter/films-presenter';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';
import {films} from './mocks/films';
import {comments} from './mocks/comments';
import FilterPresenter from './presenter/filter-presenter';

const bodyElement = document.body;
const siteHeaderElement = bodyElement.querySelector('.header');
const siteMainElement = bodyElement.querySelector('.main');
const siteFooterStatisticsElement = bodyElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel(films);
const commentsModel = new CommentsModel(comments);

const userProfileComponent = new UserProfileView();
const footerStatisticsComponent = new FooterStatisticsView();

const filterPresenter = new FilterPresenter({
  container: siteMainElement,
  filmsModel
});

const filmsPresenter = new FilmsPresenter({
  container: siteMainElement,
  filmsModel,
  commentsModel
});

render(userProfileComponent, siteHeaderElement);
render(footerStatisticsComponent, siteFooterStatisticsElement);

filterPresenter.init();
filmsPresenter.init();
