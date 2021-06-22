import React, { memo, useState, useEffect } from 'react';
import { Input } from 'antd';
import { showToastError } from '~/configs/serverErrors';

const QtyChanger = (props) => {
  const { value, getValue, maximumValue } = props;
  const [qty, setQty] = useState(value);

  useEffect(() => {
    if (value !== qty) {
      setQty(value);
    }
  }, [value]);

  const updateQty = (value) => {
    if (maximumValue != undefined && value > maximumValue) {
      if (maximumValue == 0) {
        showToastError(`Sản phẩm đã hết hàng`);
      } else {
        showToastError(`Số lượng sản phẩm chỉ còn: ${maximumValue}`);
      }
    } else {
      setQty(value);
      getValue(value);
      props.onChange && props.onChange();
    }
  };

  return (
    <div className="qty-cart-product-box m-auto">
      <button
        className="qty-cart-product-decrease qty-cart-product-amount border-0"
        disabled={qty < 2 || props.disableQty}
        onClick={() => {
          getValue(qty - 1);
          setQty(qty - 1);
        }}>
        -
      </button>
      <Input
        disabled={props.disableQty}
        min={0}
        value={qty}
        onChange={(e) => {
          try {
            let strValue = e.target.value;
            let value = parseInt(strValue) || 0;
            if (qty > maximumValue) updateQty(maximumValue);
            else updateQty(value > 0 ? value : 1);
          } catch (error) {
            updateQty(1);
          }
        }}
      />
      <button
        className="qty-cart-product-increase qty-cart-product-amount border-0"
        onClick={() => {
          if (qty > maximumValue) {
            getValue(maximumValue);
            setQty(maximumValue);
          } else {
            getValue(qty + 1);
            setQty(qty + 1);
          }
        }}
        disabled={maximumValue != undefined ? qty > maximumValue || props.disableQty : false}>
        +
      </button>
    </div>
  );
};

export default memo(QtyChanger);
