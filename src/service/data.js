import {
  API_URL
} from './constants';

export const getState = () => {
  return fetch(API_URL)
    .then(data => data.json())
}