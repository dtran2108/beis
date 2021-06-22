import { API_URL } from '~/configs';
import authHeader from './authHeader';

export const downloadFile = ({ url, method = 'get', body = {}, filename = 'filename' }) => {
  fetch(API_URL + url, {
    method: method,
    headers: {
      Accept: 'application/pdf',
      'Content-Type': 'application/pdf',
      ...authHeader()
    },
    body: method !== 'get' ? body : undefined
  })
    .then((response) => response.blob())
    .then((blob) => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
    });
};
