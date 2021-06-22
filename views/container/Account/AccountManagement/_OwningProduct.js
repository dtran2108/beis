import React from 'react';
import { seperateNumberWithSpace } from '~/views/utils/helpers/string';
import { Button } from 'antd';
import AccountCardStyled from '~/views/container/components/AccountCardStyled';

export default function AccountManagement() {
  return (
    <AccountCardStyled
      title="Thông tin sản phẩm đang sỡ hữu"
      bordered={false}
      extra={
        <Button className="m-0 p-0" type="link">
          Chi tiết
        </Button>
      }>
      {[0].map((e, i) => (
        <div key={i} className="mb-3">
          <b>CBP Premium</b>
          <p className="my-1">Tên SP: Riviera Plus - Lifetime Gold (2021 - 2023)</p>
          <p>
            Số Seri: <b>{seperateNumberWithSpace(6666898921000001)}</b>
          </p>
          <div style={{ background: 'url("/assets/images/card@2x.png")', backgroundSize: '320px 200px', width: 320, height: 200 }}>
            <p
              style={{
                position: 'relative',
                top: '174px',
                color: 'white',
                fontFamily: 'Teko',
                margin: 0,
                left: '18px',
                fontSize: '16px'
              }}>
              {seperateNumberWithSpace(6666898921000001)}
            </p>
            <p
              style={{
                position: 'relative',
                top: '150px',
                color: 'white',
                fontFamily: 'Montserrat',
                margin: 0,
                left: '215px',
                fontSize: '8px'
              }}>
              Valid from: <b>01/2021</b>
            </p>
          </div>
        </div>
      ))}
    </AccountCardStyled>
  );
}
