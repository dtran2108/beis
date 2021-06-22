import _ from 'lodash';
import numeral from 'numeral';

const parseCurrency = (value, sign = 'đ', fractionDigits = 0) => {
  if (_.isNumber(value)) {
    let formatedValue = value.toLocaleString(undefined, { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits });
    return [formatedValue, sign].filter((item) => (item || '').trim().length > 0).join('');
  }
  return '';
};

export default parseCurrency;

const parseCurrencyFloat = (number, sign = 'đ') => {
  // '0,0[.]00 $'
  return numeral(Number(number).toFixed(2)).format('0,0[.]00') + ` ${sign}`;
};
export { parseCurrencyFloat };
