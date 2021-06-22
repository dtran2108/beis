import React from 'react';
import { ERRORS } from '~/configs/errors';

export const parseError = (error) => {
  let res = [error.message];
  if (error.message === 'error.validation') {
    for (const err of error.fieldErrors) {
      res.push(`${err.field}: ${err.message}`);
    }
    return res.slice(1);
  }
  return res;
};

export const getErrorDescription = (errorList, type = '') => {
  return errorList.map((error) => {
    if (type == 'password' && error == 'user.login.invalid') return <p className="mb-1">Sai mật khẩu hiện tại</p>;
    else if (Object.keys(ERRORS).includes(error)) return <p className="mb-1">{ERRORS[error]}</p>;
    else return <p className="mb-1">{error}</p>;
  });
};
