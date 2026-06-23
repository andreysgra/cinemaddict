import {getUserRating} from '../utils/user';
import UserProfileView from '../view/user-profile-view';
import {render} from '../framework/render';

export default class UserProfilePresenter {
  #container = null;

  #filmsModel = null;

  #userProfileViewComponent = null;

  constructor({container, filmsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
  }

  init() {
    const userRating = getUserRating(this.#filmsModel.films);

    this.#userProfileViewComponent = new UserProfileView({userRating});
    render(this.#userProfileViewComponent, this.#container);
  }
}
