export default class CommentsModel {
  #comments = [];

  constructor(comments) {
    this.#comments = comments;
  }

  getComments(film) {
    return film.comments.map((id) => this.#comments.find((comment) => comment.id === id));
  }
}
