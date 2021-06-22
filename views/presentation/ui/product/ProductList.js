import React, { PureComponent } from 'react';
import { ProductItem } from '~/views/presentation/ui/product/index';
import { List } from 'antd';

class ProductList extends PureComponent {
  render() {
    const { productList, loading, pagination, xs, md, sm, lg, xl } = this.props;
    const ColValue = `${xs && 'col-' + xs} ${md && 'col-md-' + md} ${sm && 'col-sm-' + sm} ${lg && 'col-lg-' + lg} ${xl && 'col-xl-' + xl}`;
    return (
      <div className="block-padding">
        <List
          itemLayout="horizontal"
          dataSource={productList}
          pagination={pagination}
          loading={loading}
          position="top"
          renderItem={(item, index) => (
            <div key={index} className={`${ColValue} padding-item`}>
              <ProductItem itemData={item} />
            </div>
          )}
        />
      </div>
    );
  }
}

export default ProductList;
