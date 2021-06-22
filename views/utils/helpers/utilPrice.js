import _ from 'lodash';

/**
 * THIS IS COMPONENT / FUNCTION
 * @Input: giá gốc, giá giảm
 * @Output:   Giá sau cùng
 * @Description:   Trả về giá sau cùng của một cặp giá trị truyền vào
 * @Author: tan.hoang@vslsoft.com
 * @Date: 2020-12-18 09:33:14
 */
export const getEndPrice = (originalPrice, salePrice) => {
  if (salePrice === 0) return originalPrice;

  return salePrice;
};
