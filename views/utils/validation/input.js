/*eslint-disable */
import React from 'react';
import * as yup from 'yup';
// import strings from '~/localization';
/** Regex Validation **/
export const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
export const phoneRegex2 = /^(09|03|07|08|05)+([0-9]{8})$/;
export const emailRegex = /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i;
const isEmailOrPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$|^[A-Z0-9._%-]+[+\w-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i;

const usernameRequired = 'Vui lòng nhập tên đăng nhập';
const nameRequired = 'Vui lòng nhập Họ tên';
const phoneInvalid = 'Số điện thoại không hợp lệ';
const genderRequired = 'Vui lòng chọn giới tính';
const dateRequired = 'Vui lòng chọn ngày sinh';
const emailInvalid = 'Email không hợp lệ';
const emailRequired = 'Vui lòng nhập email';
const passwordRequired = 'Vui lòng nhập mật khẩu';
const passwordMatch = 'Mật khẩu phải khớp với nhau';
const passwordLimit = 'Mật khẩu từ 6 ký tự trở lên';
const passwordValid = 'Mật khẩu phải có các ký tự chữ và số';
const codeInvalid = 'Mã xác nhận không hợp lệ';
const lastNameRequired = 'Last name is required';
const firstNameRequired = 'First name is required';
const fieldIsRequired = 'Vui lòng điền thông tin';
// const identityCardInvalid = <FormattedMessage id="CODE_INVALID" defaultMessage="CMND không hợp lệ" />;

const passwordSchema = yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự');

// export const emailNRValidate = yup
//   .string()
//   .trim()
//   .matches(emailRegex, strings.invalid_email)
//   .max(50, strings.formatString(strings.max_length, { max: 50 }));

// export const phoneNRValidate = yup.string().trim().matches(phoneRegex, strings.invalid_phone).nullable();

// export const numberValidate = yup
//   .number()
//   .min(0, strings.more_than_zero)
//   .typeError(strings.must_be_number)
//   .nullable()
//   .max(9223372036854775807, strings.number_to_large);
// export const numberValidateMinMax = (message, min = 0, max = 9223372036854775807) =>
//   yup
//     .number()
//     .required(message || strings.required)
//     .min(min, strings.formatString(strings.more_than_number, { number: min }))
//     .typeError(strings.must_be_number)
//     .nullable()
//     .max(max, strings.formatString(strings.number_to_larger, { number: max }));
// export const numberRequired = (message, max = 9223372036854775807) =>
//   yup
//     .number()
//     .required(message || strings.required)
//     .min(0, strings.more_than_zero)
//     .typeError(strings.must_be_number)
//     .nullable()
//     .max(max, strings.number_to_large);
// export const numberRequiredField = yup.number().required(strings.required);
export const passwordValidate = passwordSchema.required('Vui lòng nhập mật khẩu').max(60, 'Mật khẩu tối đa 60 ký tự');
export const passwordConfirmationValidate = passwordValidate.oneOf([yup.ref('password'), null], 'Xác thực khẩu không khớp');

// export const stringRequiredField = (message, maxLength = 255) =>
//   yup
//     .string()
//     .trim()
//     .required(message || strings.required)
//     .max(maxLength, strings.formatString(strings.max_length, { max: maxLength }));
// export const stringNRFieldValidate = (maxLength = 255) =>
//   yup
//     .string()
//     .max(maxLength, strings.formatString(strings.max_length, { max: maxLength }))
//     .nullable();

// export const minZeroValue = yup.number().required('Vui lòng nhập giá trị').min(0, 'Giá trị không hợp lệ');
// export const requiredValidField = yup.string().required('Vui lòng điền thông tin');
// export const identityCardValidate = yup
//   .string()
//   .min(9, identityCardInvalid)
//   .matches(/^([0-9]{9,10})/i, 'Vui lòng nhập giá trị bằng số')
//   .required('Vui lòng nhập thông tin');
// export const minOneValue = yup.number().required('Vui lòng nhập giá trị').min(1, 'Giá trị không hợp lệ');
// export const emailNotRequiredValidate = yup.string().trim().matches(emailRegex, emailInvalid);
export const requiredValidField = yup.string().required('Vui lòng điền thông tin');
export const usernameValidate = yup.string().trim().required(usernameRequired);
export const nameValidate = yup.string().trim().required(nameRequired).max(64, 'Độ dài tối da 64 ký tự');
export const addressValidate = yup.string().trim().required('Vui lòng nhập địa chỉ').max(64, 'Độ dài tối da 64 ký tự');
export const dateValidate = yup.string().required(dateRequired).nullable();
export const codeValidate = yup.string().min(6, codeInvalid).required(codeInvalid);
export const firstNameValidate = yup.string().trim().required(firstNameRequired);
export const lastNameValidate = yup.string().trim().required(lastNameRequired);
export const minZeroNRValue = yup.number().min(0, 'Giá trị không hợp lệ');
export const phoneOrEmailValidate = yup
  .string()
  .trim()
  .required('Vui lòng điền thông tin')
  .matches(isEmailOrPhone, 'Tên tài khoản là email hoặc số điện thoại')
  .max(50, 'Độ dài tối da 50 ký tự');
export const emailValidate = yup
  .string()
  .trim()
  .matches(emailRegex, emailInvalid)
  .required(emailRequired)
  .max(50, 'Email dài tối đa 50 ký tự');
export const genderValidate = yup.string().required(genderRequired);
export const phoneValidate = yup
  .string()
  .trim()
  .matches(phoneRegex, phoneInvalid)
  .required(phoneInvalid)
  .max(10, 'Số điện thoại dài tối đa 10 ký tự');
export const phoneValidate2 = yup
  .string()
  .trim()
  .matches(phoneRegex2, phoneInvalid)
  .required(phoneInvalid)
  .max(10, 'Số điện thoại dài tối đa 10 ký tự');

export const checkTypeLogin = (input) => {
  if (input.match(phoneRegex)) {
    return 'phone';
  } else if (input.match(emailRegex)) {
    return 'email';
  }
  return false;
};
