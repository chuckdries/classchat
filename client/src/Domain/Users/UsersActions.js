import axios from 'axios';
import urljoin from 'url-join';
import {API_URL} from '../../config';

export const setUserData = (data) => {
  return {
    type: 'SET_USER_DATA',
    data,
  };
};

export const logout = () => {
  axios(urljoin(API_URL, 'logout'), {
    method: 'get',
    withCredentials: true
  });
  return {
    type: 'LOG_OUT'
  };
};