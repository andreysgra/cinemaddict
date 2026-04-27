export default class FilmsModel {
  #films = [];

  constructor(films) {
    this.#films = films;
  }

  get films() {
    return this.#films;
  }
}
