import { message } from 'antd';
import * as _ from 'lodash';
import { errormessage } from '~/configs/intlMessage';

export function displayerror(error, formatMessage) {
  let msgObject =
    typeof errormessage[error.message] !== 'undefined'
      ? errormessage[error.message]
      : { id: 'Server Error', defaultMessage: 'Lỗi hệ thống' };
  message.warn(formatMessage(msgObject));
}

function showerrmessage(err) {
  if (Object.getOwnPropertyNames(err).message !== '') {
    switch (err.message) {
      case 'price This Field require a number':
        err.message = 'Your Price field requires a number';
        break;
      default:
    }
    message.warn(err.message);
    return;
  }
  let tmperr = {};
  try {
    tmperr = JSON.parse(err);
  } catch (error) {
    message.warn(error);
  }

  if (tmperr.data === null) {
    message.error(tmperr.message);
  } else if (tmperr.data.length) {
    _.each(tmperr.data, function (item) {
      message.error(item);
    });
  } else {
    message.error(tmperr.message);
  }
}

export default showerrmessage;
