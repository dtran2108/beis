import { message } from 'antd';

export function validateImage(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    return { status: false, message: 'You can only upload JPG/PNG file!' };
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    return { status: false, message: 'Image must smaller than 2MB!' };
  }
  return { status: isJpgOrPng && isLt2M, message: 'Image must smaller than 2MB!' };
}

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const beforeUpload = (file) => {
  const isImage = file.type.includes('image');
  if (!isImage) {
    message.error('You can only upload image!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!');
  }
  return isImage && isLt2M;
};
