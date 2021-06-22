export const imgUploadConfig = {
  fileSize: 5,
  type: /\.(jpg|jpeg|bmp|png|gif|tiff)$/i
};

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

export const ACCEPT_IMAGE_UPLOAD = ['image/*'];
