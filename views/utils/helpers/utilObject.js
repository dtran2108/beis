import { isArray, isUndefined, isNil, isString, isObject, isBoolean, first, isEmpty, isNumber } from 'lodash';
import { IMG_URL } from '~/configs';

const getString = (obj, propertyPath = undefined, defaultValue = undefined) => {
  try {
    // propertyPath phải là string hoặc undefined
    if (!isUndefined(propertyPath) && !isString(propertyPath)) {
      return undefined;
    }
    if (!isNil(propertyPath)) {
      if (isNil(obj)) {
        return defaultValue;
      }
      if (isObject(obj)) {
        var properties = propertyPath.split('.');
        // tìm property value từ property path
        let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
        return isString(result) ? result : defaultValue;
      }
    } else if (isString(obj)) {
      return obj;
    }
    // eslint-disable-next-line no-empty
  } catch (err) {}
  return defaultValue;
};

const getNumber = (obj, propertyPath = undefined, defaultValue = undefined, fixed = true) => {
  try {
    // propertyPath phải là string hoặc undefined

    const fixedFloatNumber = (value) => {
      if (fixed) return parseFloat(Number(value).toFixed(2));
      else return parseFloat(Number(value));
    };
    if (!isUndefined(propertyPath) && !isString(propertyPath)) {
      return undefined;
    }
    if (!isNil(propertyPath)) {
      if (isNil(obj)) {
        return defaultValue;
      }
      if (isObject(obj)) {
        var properties = propertyPath.split('.');
        // tìm property value từ property path
        let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
        return isNumber(result) ? fixedFloatNumber(result) : defaultValue;
      }
    } else if (isNumber(obj)) {
      return fixedFloatNumber(obj);
    }
  } catch (err) {
    throw new Error(`Error: getNumber!`, err);
  }
  return defaultValue;
};

const getBool = (obj, propertyPath = undefined, defaultValue = undefined) => {
  try {
    // propertyPath phải là string hoặc undefined
    if (!isUndefined(propertyPath) && !isString(propertyPath)) {
      return undefined;
    }
    if (!isNil(propertyPath)) {
      if (isNil(obj)) {
        return defaultValue;
      }
      if (isObject(obj)) {
        var properties = propertyPath.split('.');
        // tìm property value từ property path
        let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
        return isBoolean(result) ? result : defaultValue;
      }
    } else if (isBoolean(obj)) {
      return obj;
    }
  } catch (err) {
    throw new Error(`Error: getBool!`, err);
  }
  return defaultValue;
};

const getArray = (obj, propertyPath = undefined, defaultValue = undefined) => {
  try {
    // propertyPath phải là string hoặc undefined
    if (!isUndefined(propertyPath) && !isString(propertyPath)) {
      return undefined;
    }
    if (!isNil(propertyPath)) {
      if (isNil(obj)) {
        return defaultValue;
      }
      if (isObject(obj)) {
        var properties = propertyPath.split('.');
        // tìm property value từ property path
        let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
        return isArray(result) ? result : defaultValue;
      }
    } else if (isArray(obj)) {
      return obj;
    }
  } catch (err) {
    throw new Error(`Error: getArray!`, err);
  }
  return defaultValue;
};

const getObject = (obj, propertyPath = undefined, defaultValue = {}) => {
  try {
    // propertyPath phải là string hoặc undefined
    if (!isUndefined(propertyPath) && !isString(propertyPath)) {
      return undefined;
    }
    if (!isNil(propertyPath)) {
      if (isNil(obj)) {
        return defaultValue;
      }
      if (isObject(obj)) {
        var properties = propertyPath.split('.');
        // tìm property value từ property path
        let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
        return isObject(result) ? result : defaultValue;
      }
    } else if (isObject(obj)) {
      return obj;
    }
  } catch (err) {
    throw new Error(`Error: getObject!`, err);
  }
  return defaultValue;
};

const getArrayWithoutEmptyItem = (array) => {
  const isEmptyObject = (item) => {
    let keys = Object.keys(item).filter((key) => key !== 'key' && (typeof item[key] === 'number' || typeof item[key] === 'string'));
    let counter = 0;
    keys.forEach((key) => {
      if (!isNullOrEmpty(item[key])) {
        counter++;
      }
    });
    return counter === 0;
  };
  return getArray(array, undefined, []).filter((item) => !isEmptyObject(item));
};

const removeEmptyArrayItem = (object) => {
  let keys = Object.keys(object).filter((key) => getArray(object, key, []).length > 0);
  let modifyObject = {};
  keys.forEach((key) => {
    modifyObject[key] = getArrayWithoutEmptyItem(object[key]);
  });
  return {
    ...object,
    ...modifyObject
  };
};

export const checkEmptyObject = (obj, keys) => {
  let emptyFields = (keys || []).filter((key) => isNullOrEmpty((obj || {})[key]));

  return emptyFields.length > 0;
};

const isNullOrEmpty = (value) => {
  return isNil(value) || (!isNil(value) && isString(value) && (value || '').trim().length === 0);
};

const getMatchedValueWithRegex = (val, reg) => {
  let results = (val || '').match(reg) || [];
  return first(results) || '';
};

const mapArrayObjectToAPI = (process, changeName = []) => {
  if (!process) return {};
  if (!process.length) {
    if (isEmpty(process)) return {};
    let key = Object.keys(process);
    let modifyObject = key.reduce((prev, curr) => {
      let currChange = curr;
      changeName.map((name) => {
        if (curr === name.currName) name.changeName === '' ? (currChange = false) : (currChange = name.changeName);
      });
      if (!currChange) return prev;
      prev[currChange] = process[curr];
      return prev;
    }, {});
    return modifyObject;
  } else
    return getArray(process, undefined, []).map((val) => {
      if (!val) return [];
      let key = Object.keys(val);
      let modifyObject = key.reduce((prev, curr) => {
        let currChange = curr;
        getArray(changeName, undefined, []).map((name) => {
          if (curr === getString(name, 'currName', ''))
            name.changeName === '' ? (currChange = false) : (currChange = getString(name, 'changeName', ''));
        });
        if (!currChange) return prev;
        prev[currChange] = val[curr];
        return prev;
      }, {});
      return modifyObject;
    });
};

const removeSignThenLowerCaseString = (value) => {
  return (getString(value) || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .toLocaleLowerCase()
    .trim();
};

export const firstImage = (strImages = '', width) => {
  strImages = strImages !== null ? strImages : '';
  let imgUrls = first(strImages.split('|'));
  return `${IMG_URL}${isNumber(width) ? `${width}/` : ''}${imgUrls}`;
};

/**
 *
 * @param {*} addressItem
 */
export const formatAddress = (addressItem) => {
  return [
    getString(addressItem, 'address1'),
    getString(addressItem, 'wardsName'),
    getString(addressItem, 'districtName'),
    getString(addressItem, 'provinceName')
  ]
    .filter((item) => !isNullOrEmpty(item))
    .join(', ');
};
export const formatActiveOrDefaultAddress = (addresses) => {
  let result = (getArray(addresses) || []).find((item) => item.isDefault === true);
  if (isNil(result)) {
    result = first(getArray(addresses) || []);
  }
  return formatAddress(result);
};

export const getActiveOrDefaultPhone = (phones) => {
  let result = getString(
    (phones || []).find((item) => item.isDefault === true),
    'phoneNumber'
  );
  if (isNil(result)) {
    return getString(first(getArray(phones) || []), 'phoneNumber');
  }
  return result;
};

export {
  getString,
  getNumber,
  getObject,
  getArray,
  getBool,
  removeSignThenLowerCaseString,
  getMatchedValueWithRegex,
  isNullOrEmpty,
  getArrayWithoutEmptyItem,
  removeEmptyArrayItem,
  mapArrayObjectToAPI
};
