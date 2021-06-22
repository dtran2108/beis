// import { string } from 'bfj/src/events';

// --------------------------
// VALIDATE CONSTANT
// --------------------------
export const MAX_LENGTH = 255;

/** Regex Validation **/
// eslint-disable-next-line no-useless-escape
const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
// const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i;
const regPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:“;’<>?,.\/]).{6,64}$/gm;
const regPassword2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,64}$/gm; // have A-Z
// const regEmailOrPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$|^[A-Z0-9._%-]+[+\w-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i;

export const commonValidate = () => [
  {
    required: true,
    message: 'Vui lòng nhập thông tin'
  }
];

export const minValidate = (min = 1) => [
  {
    min,
    message: `Tối thiểu ${min} ký tự`
  }
];

export const maxValidate = (max = MAX_LENGTH) => [
  {
    max,
    message: `Tối đa ${max} ký tự`
  }
];

export const passwordValidate = (min = 6) => [
  {
    min: min,
    message: `Tối thiểu ${min} ký tự`
  },
  {
    pattern: regPassword,
    message: 'Mật khẩu cần gồm: Chữ cái, ký tự đặc biệt, chữ số'
  }
];

export const numberValidate = (number, min = 1) => [
  {
    min: min,
    message: `Tối thiểu ${min} ký tự`
  },
  {
    type: 'number',
    message: 'Phải là số'
  }
];

export const phoneValidate = () => [{ pattern: regPhone, message: 'Số điện thoại sai định dạng' }];

export const typeValidate = (type = 'string') => {
  let message;
  switch (type) {
    case 'number':
      message = 'Phải là số';
      break;
    case 'boolean':
      message = 'Phải là Đúng hoặc sai';
      break;
    case 'email':
      message = 'Email sai định dạng';
      break;
    case 'url':
      message = 'Url sai định dạng';
      break;
    default:
      message = 'Phải là chuỗi';
      break;
  }
  return [
    {
      type,
      message
    }
  ];
};
