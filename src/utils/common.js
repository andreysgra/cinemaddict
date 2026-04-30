import {DESCRIPTION_LENGTH} from '../const';

export const getShortDescription = (description) =>
  description.length >= DESCRIPTION_LENGTH ? `${description.slice(0, DESCRIPTION_LENGTH - 1)}...` : description;

export const addEscapeEvent = (evt, action) => {
  const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

  if (isEscKey) {
    action(evt);
  }
};
