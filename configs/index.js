import React from 'react';
import { message } from 'antd';

// EXTERNAL LINK
export const GOOGLE_DIRECTION_URL = process.env.GOOGLE_DIRECTION_URL || 'https://www.google.com/maps/dir/?api=1';
// go to https://developers.google.com/maps/documentation/urls/get-started#directions-action into get parameters

/**
 * CONSUMER CONFIGS
 */
export const API_URL = process.env.API_URL;
export const IMAGE_URL = process.env.IMAGE_URL;

export const IMAGE_UPLOAD_URL = IMAGE_URL + '/api/v1/files/';
export const utcTimeString = 'DD/MM/YYYY';
export const javaTimeString = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

export const IMG_URL = `${API_URL}/api/v1/files/`;
export const IMG_DEFAULT = '/static/images/img_default.png';

export const API_UPLOAD_URL = IMAGE_URL;

export const LIMIT_BANNER = 5;

export const sizes = {
  xl: '1200px',
  lg: '992px',
  md: '768px',
  sm: '576px'
};

export const API_CODE = {
  SUCCESS: 'SUCCESS',
  AUTHENTICATION_INVALID: 'AUTHENTICATION_INVALID',
  USER_BLOCKED: 'USER_BLOCKED',
  DUPLICATED_AREA_REGION: 'DATA_INTEGRITY_EXCEPTION'
};

export const TYPE_AROUND = {
  PROMOTION: 'PROMOTION',
  STORE: 'STORE'
};

export const ORDER_STATUS = {
  CONFIRMING: 'CONFIRMING',
  FULFILLED: 'FULFILLED',
  PROCESSING: 'PROCESSING',
  DELIVERING: 'DELIVERING',
  DELIVERED: 'DELIVERED',
  REFUND: 'REFUND',
  RETURNED: 'RETURNED',
  CANCELED: 'CANCELED',
  UNPAID: 'UNPAID'
};

export const GENDER_TYPE = {
  MALE: 0,
  FEMALE: 1
};

export const genderMessage = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  OTHER: 'Khác'
};

export const TIME_MESSAGE_POPUP = 3;

export const imgUploadConfig = {
  minWidth: 750,
  minHeight: 500,
  fileSize: 5,
  type: /\.(jpg|jpeg|bmp|png|gif|tiff)$/i
};

/**
 * media
 */
export const mediaUploadConfig = {
  type: /\.(png|jpg|jpeg|bmp|mp4|gif|tiff)$/i
};
export const docsFilesUploadConfig = {
  type: /\.(xlsb|xls|xlsm|xlsx|doc|docx|pdf|txt|odt|rtf|tex|wks|wpd|ods|odp|pps|ppt|pptx|gz|zip|rar|iso)$/i
};
export const videoUploadConfig = {
  fileSize: 10,
  type: /\.(mp4)$/i
};
export const docsUploadConfig = {
  type: /\.(doc|docx)$/i
};
export const pdfUploadConfig = {
  type: /\.(pdf)$/i
};
export const excelUploadConfig = {
  type: /\.(xlsb|xls|xlsm|xlsx|xlr)$/i
};
export const txtUploadConfig = {
  type: /\.(txt)$/i
};
export const rarUploadConfig = {
  type: /\.(zip|rar|iso|gz)$/i
};
export const otherUploadConfig = {
  type: /\.(odt|rtf|tex|wks|wpd|ods|odp|pps|ppt|pptx|)$/i
};

export const imageExtension = '.png, .jpg, .jpeg, .bmp';
export const mediaExtension = '.png,.jpg,.jpeg,.bmp,.mp4,.gif,.tiff';
export const filesExtension =
  '.doc,.docx,,.pdf,.xls,.xlsb,.xlsm,.xlsx,.txt,.odt,.rtf,.tex,.wks,.wpd,.ods,.odp,.pps,.ppt,.pptx,.gz,.zip,.rar,.iso';

export const GENDER = {
  female: 'Nữ',
  male: 'Nam',
  other: 'Khác'
};

export const DATE_FORMAT = 'DD/MM/YYYY';

export const JWT_CONSUMER = 'jwtConsumer';

// https://michalsnik.github.io/aos/
export const AOS_DATA = {
  // FADE
  fadeUp: 'fade-up',
  fadeDown: 'fade-down',
  fadeRight: 'fade-right',
  fadeLeft: 'fade-left',
  fadeUpRight: 'fade-up-right',
  fadeUpLeft: 'fade-up-left',
  fadeDownRight: 'fade-down-right',
  fadeDownLeft: 'fade-down-left',

  // FLIP
  flipUp: 'flip-up',
  flipDown: 'flip-down',
  flipLeft: 'flip-left',
  flipRight: 'flip-right',

  // ZOOM
  zoomIn: 'zoom-in',
  zoomInUp: 'zoom-in-up',
  zoomInDown: 'zoom-in-down',
  zoomInLeft: 'zoom-in-left',
  zoomInRight: 'zoom-in-right',
  zoomOut: 'zoom-out',
  zoomOutUp: 'zoom-out-up',
  zoomOutDown: 'zoom-out-down',
  zoomOutLeft: 'zoom-out-left',
  zoomOutRight: 'zoom-out-right'
};
