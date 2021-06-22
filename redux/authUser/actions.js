import * as types from './types';
import _ from 'lodash';
import apiAction, { defaultAction } from '../utils/createAction';

export const login = (data) => apiAction('post')(types.LOGIN, process.env.API_URL + `/api/v1/consumer/account/authenticate`, data);
export const setRemember = () => defaultAction(types.SET_REMBERME);
export const unsetRemember = () => defaultAction(types.UNSET_REMBERME);
export const setLoginInfo = (data) => defaultAction(types.SET_LOGIN_INFO, data);
export const unsetLoginInfo = () => defaultAction(types.UNSET_LOGIN_INFO);

export const putActiveAccount = (encode) =>
  apiAction('put')(types.ACTIVE_ACCOUNT, process.env.API_URL + `/api/v1/active-account/${encode}`, {});

export const initResetPass = (email) =>
  apiAction('post')(types.INIT_RESET_PASS, process.env.API_URL + `/api/v1/consumer/account/reset-password/init/${email}`);

export const confirmOTPResetPass = (data) =>
  apiAction('post')(types.CONFIRM_OTP_RESET_PASS, process.env.API_URL + '/api/v1/consumer/account/reset-password/validate-otp', data);

export const finishResetPass = (data) =>
  apiAction('post')(types.FINISH_RESET_PASS, process.env.API_URL + '/api/v1/consumer/account/reset-password/finish', data);

export const getUser = () => apiAction('get')(types.GET_USER, process.env.API_URL + '/api/v1/consumer/profile', {}, true);

export const updateUser = (body) => apiAction('put')(types.UPDATE_USER, process.env.API_URL + '/api/v1/consumer/profile', body, true);

export const changePassword = (body) =>
  apiAction('post')(types.CHANGE_PASSWORD, process.env.API_URL + '/api/v1/consumer/account/change-password', body, true);

export const register = (data) => apiAction('post')(types.REGISTER, `/consumer/account/register`, data);

export const registerProfile = (data) => ({
  type: types.REGISTER_PROFILE,
  meta: {
    body: data,
    method: 'post',
    async: true,
    withToken: true,
    path: '/consumer/update'
  }
});

export const verifyCode = (data) => apiAction('post')(types.VERIFY_CODE, `/consumer/account/activate`, data);

export const resendCode = (data) => apiAction('post')(types.RESEND_CODE, `/consumer/account/register/resend-otp`, data);

export const forgotPassword = (userName) =>
  apiAction('post')(types.FORGOT_PASSWORD, `/consumer/account/reset-password/init/${userName}`, {});

export const verifyCodeResetPassword = (data) =>
  apiAction('post')(types.VERIFY_CODE_RESET_PASSWORD, `/consumer/account/reset-password/otp/validate`, data);

export const resendCodeReset = (data) => apiAction('post')(types.RESEND_CODE, `/consumer/account/reset-password/resend-otp`, data);

export const resetFinish = (data) => apiAction('post')(types.RESET_PASSWORD_FINISH, `/consumer/account/reset-password/finish`, data);

export const getProfile = (ctx) => apiAction('get')(types.GET_PROFILE, 'consumer/account/profile', {}, true, true, ctx);

export const updateProfile = (body, ctx) => apiAction('put')(types.UPDATE_PROFILE, 'consumer/account/profile', body, true, true, ctx);

export const updatePassword = (body, ctx) =>
  apiAction('post')(types.UPDATE_PASSWORD, '/consumer/account/change-password', body, true, true, ctx);

export const logout = () => ({ type: types.LOGOUT });

export const toggleLoginForm = () => ({ type: types.TOGGLE_LOGIN_FORM });

//****************************
//        user info
//************************** */

export const getRewardPoint = (ctx) => apiAction('get')(types.GET_REWARD_POINT, 'reward-points/total', {}, true, true, ctx);

export const getQRCode = (ctx) => apiAction('get')(types.GET_QR_CODE, 'consumer/account/my-qr-code', {}, true, true, ctx);

export const setTypeLogin = (type) => ({ type: types.SET_TYPE_LOGIN, payload: type });

export const setDistance = (distance) => ({ type: types.SET_DISTANCE_RADIUS, payload: distance });

export const setUsername = (username) => ({ type: types.SET_USERNAME, payload: username });

//notification
export const setNewNotification = (status) => defaultAction(types.NEW_NOTIFICATION, status);

export const setAuthen = () => ({ type: types.SET_AUTHEN });

export const setTokenLogin = (token) => ({ type: types.SET_TOKEN_LOGIN, payload: token });

export const setBreadcrumb = (bread) => ({ type: types.SET_BREADCRUMB, payload: bread });

export const getProvinces = () => apiAction('get')('GET_PROVINCES', `provinces`, {});
