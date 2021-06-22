import { message } from 'antd';
import _ from 'lodash';
import { TIME_MESSAGE_POPUP } from '~/configs/index';
import { getString } from '../views/utils/helpers/utilObject';

const getServerError = (res) => {
  let serverErrorMessage = getString(res, 'message');
  if (serverErrorMessage) {
    return serverErrorMessage;
  }
  return res;
};
export default getServerError;

export function getMessage(msg) {
  let mess = msg;
  if (_.isString(msg)) {
    mess = msg;
  } else if (_.isObject(msg)) {
    mess = getString(msg, 'message');
  }
  return mess;
}

export function showToastError(msg, t, timePopUp = TIME_MESSAGE_POPUP, onClose) {
  message.error(t(`message:${getMessage(msg).replaceAll('.', '_').replaceAll(' ', '_')}`), timePopUp, onClose);
}

export function showToastSuccess(msg, t, timePopUp = TIME_MESSAGE_POPUP, onClose) {
  message.success(t(`message:${getMessage(msg).replaceAll('.', '_').replaceAll(' ', '_')}`), timePopUp, onClose);
}

export function showToastWarning(msg, t, timePopUp = TIME_MESSAGE_POPUP, onClose) {
  message.warning(t(`message:${getMessage(msg).replaceAll('.', '_').replaceAll(' ', '_')}`), timePopUp, onClose);
}
