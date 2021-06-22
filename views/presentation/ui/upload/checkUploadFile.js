import { message } from 'antd';
import { imgUploadConfig, videoUploadConfig, mediaUploadConfig, docsFilesUploadConfig } from '~/configs';
import strings from '~/localization';

const returnResult = (result, file) =>
  new Promise((resolve, reject) => {
    if (!result) {
      reject(file);
    } else {
      resolve(file);
    }
  });

export const checkFileSize = (file) => {
  const isLt10M = file.size / 1024 / 1024 < imgUploadConfig.fileSize;

  if (!isLt10M) {
    message.error(
      strings.formatString(strings.image_max_size, {
        size: imgUploadConfig.fileSize
      })
    );
  }
  return isLt10M;
};

export const checkFileSize10M = (file) => {
  const isLt10M = file.size / 1024 / 1024 < videoUploadConfig.fileSize;

  if (!isLt10M) {
    message.error(
      strings.formatString(strings.file_max_size, {
        size: videoUploadConfig.fileSize
      })
    );
  }
  return isLt10M;
};

export const checkImageRatio = (file) => {
  const img = new Image();

  img.onload = function () {
    const { width, height } = this;
    const { minHeight, minWidth } = imgUploadConfig;
    if (width <= minWidth || height <= minHeight || width / height !== 1.5) {
      message.warning('Size hình không đúng chuẩn 1.5 x 1.0');
    }
  };

  img.src = window.URL.createObjectURL(file);
};

export const checkListLength = (list, limit) => {
  const isNotGtr = list.length < limit;
  if (!isNotGtr) {
    message.error(strings.formatString(strings.limited_image_upload, { limit: limit }));
  }
  return isNotGtr;
};

export const checkDefaultImageType = (file) => {
  const validFileType = imgUploadConfig.type.test(file.name);
  if (!validFileType) {
    message.error(strings.invalid_image_upload);
  }
  return validFileType;
};

export function checkDefaultImage(file, list, lengthLimit, checkRatio) {
  const validFileType = checkDefaultImageType(file);
  const isLt10M = checkFileSize(file);
  const isLengthValid = checkListLength(list, lengthLimit);
  const result = validFileType && isLt10M && isLengthValid;

  if (result) {
    if (checkRatio) {
      checkImageRatio(file);
    }
  }
  return result;
}

export function checkAvartarImage(file) {
  const validFileType = checkDefaultImageType(file);
  const isLt10M = checkFileSize(file);
  const result = validFileType && isLt10M;
  return returnResult(result, file);
}

export const checkDefaultMediaType = (file) => {
  const validFileType = mediaUploadConfig.type.test(file.name);
  if (!validFileType) {
    message.error(strings.invalid_media_upload);
  }
  return validFileType;
};
export const checkDefaultDocsType = (file) => {
  const validFileType = docsFilesUploadConfig.type.test(file.name);
  if (!validFileType) {
    message.error(strings.invalid_docs_upload);
  }
  return validFileType;
};
export function checkMedia(file) {
  const validFileType = checkDefaultMediaType(file);
  const isLt10M = checkFileSize10M(file);
  const result = validFileType && isLt10M;
  return returnResult(result, file);
}
export function checkDocs(file) {
  const validFileType = checkDefaultDocsType(file);
  const isLt10M = checkFileSize10M(file);
  const result = validFileType && isLt10M;
  return returnResult(result, file);
}
