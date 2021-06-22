export function removeAccents(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function countWords(s) {
  s = s.replace(/(^\s*)|(\s*$)/gi, '');
  s = s.replace(/[ ]{2,}/gi, ' ');
  s = s.replace(/\n /, '\n');
  return s.split(' ').length;
}

export function getStringWithWord(string, n) {
  let str = '';
  for (let i = 1; i <= n; i++) {
    if (i < n) {
      str += getWord(string, i) + ' ';
    } else {
      str += getWord(string, i);
    }
  }
  return str;
}

export function getWord(string, n) {
  var words = string.split(' ');
  return words[n - 1];
}

export function formatImage(imgstr, width, height = 0) {
  let last = imgstr.lastIndexOf('.');
  return imgstr
    .substring(0, last)
    .concat('_')
    .concat(width + 'x' + height)
    .concat(imgstr.substring(last, imgstr.length));
}

export function getAlias(str) {
  return removeAccents(str || '')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .replace(/\s{1,}/g, '-');
}

export function seperateNumberWithSpace(str) {
  return str.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ' ');
}
