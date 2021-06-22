import React from 'react';
import QtyChanger from './QtyChanger';
import enhance from './withItemCart';
import { Popconfirm } from 'antd';
import { parseCurrency } from '~/views/utils/helpers';
import { UIButton } from '~/views/presentation/ui/buttons';
import { getNumber, getString, firstImage } from '~/utils/helpers/utilObject';
import { DeleteOutlined } from '@ant-design/icons';
import * as PATH from '~/configs/routesConfig';
import Link from 'next/link';

const ItemCart = (props) => {
  const { name, image, quantity, productId, quantityInStock } = props.data;

  const { changeQuantity, removeItemCart, history } = props;

  return (
    <div className="row shopping-cart-item px-0">
      <div className="col-md-2 col-4">
        <div className="col-xs-3 m-auto img-thumnail-custom">
          <Link onClick={() => history.push(PATH.PRODUCT_DETAIL_PATH.replace(':id', productId))}>
            <img
              alt="no thing"
              className="img-responsive"
              src={image ? firstImage(getString(image)) : 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
            />
          </Link>
        </div>
      </div>
      <div className="row col-md-10 col-8 item-info">
        <div className="col-md-6 col-xs-12 col-12 box-info-product d-flex flex-column align-self-center">
          <Link onClick={() => history.push(PATH.PRODUCT_DETAIL_PATH.replace(':id', productId))}>
            <p className="name">{name}</p>
          </Link>
          <p className="price-cart">{`${parseCurrency(getNumber(props, 'data.unitPrice'))}/${getString(props, 'data.unitName', 'kg')}`}</p>
        </div>
        <div className="col-md-3 col-xs-12 col-12  mb-1 d-flex justify-content-end align-items-center">
          <QtyChanger
            value={quantity}
            maximumValue={quantityInStock}
            getValue={(value) => {
              changeQuantity(props.data, value);
            }}
          />
          <Popconfirm
            placement="topRight"
            title={'Bạn chắc chắn muốn xóa ?'}
            onConfirm={async () => {
              removeItemCart(props.data);
            }}
            okText="Có"
            cancelText="Không">
            <UIButton className="btn-delete ml-4" width="38px">
              <DeleteOutlined />
            </UIButton>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default enhance(ItemCart);
