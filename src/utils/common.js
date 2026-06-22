import {DESCRIPTION_LENGTH} from '../const';

export const getShortDescription = (description) =>
  description.length >= DESCRIPTION_LENGTH ? `${description.slice(0, DESCRIPTION_LENGTH - 1)}...` : description;
