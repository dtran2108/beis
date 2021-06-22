import { checkFileSize, checkDefaultImageType } from './checkUploadFile';
import { API_UPLOAD_URL } from '~/configs';

function saveToServer(file) {
  const fd = new FormData();
  fd.append('files', file);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', API_UPLOAD_URL, true);
  // xhr.setRequestHeader("Authorization", getCookie("jwt"));
  xhr.onload = () => {
    if (xhr.status === 200) {
      // const url = JSON.parse(xhr.responseText)[0].pathImage;
      // insertToEditor(url, editor);
    }
  };

  xhr.send(fd);
}

function selectLocalImage() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.click();

  input.onchange = () => {
    const file = input.files[0];
    if (checkFileSize(file) && checkDefaultImageType(file)) {
      saveToServer(file);
    }
  };
}
export default selectLocalImage;
