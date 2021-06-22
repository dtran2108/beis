import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';
// import ImageGallery from 'react-image-gallery';
import _ from 'lodash';
// process.browser && import("magnific-popup");

class ProductZoom extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      smallImg: (props.listImg || []).length > 0 && props.listImg[0].large,
      largeImg: props.listImg.length > 0 && props.listImg[0].original
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listImg != this.props.listImg) {
      let firstObject = (this.props.listImg || []).find(_, (idx) => idx === 0);
      if (firstObject) {
        this.setState({
          smallImg: firstObject.small,
          largeImg: firstObject.large
        });
      }

      // $(document).ready(function() {
      //   $('.gallery-init').magnificPopup({
      //     items: (listImg || []).map((item) =>({
      //       src: item.small
      //     })),
      //     index: 5,
      //     type: 'image',
      //     gallery: {
      //       enabled:true,
      //       tCounter: '%curr%/%total%'
      //     }
      //   })
      // })
    }
  }

  handleChangeImg = (item) => {
    this.setState({
      smallImg: item.large,
      largeImg: item.original
    });
  };

  componentDidMount() {
    // if(listImg.length >= 5){
    //   $(document).ready(function() {
    //     $('.gallery-init').magnificPopup({
    //       items: listImg.map((item) =>({
    //         src: item.small
    //       })),
    //       index: 5,
    //       type: 'image',
    //       gallery: {
    //         enabled:true,
    //         tCounter: '%curr%/%total%'
    //       }
    //     })
    //   });
    // }
  }

  render() {
    const { listImg, widthZoomImage, heightZoomImage } = this.props;

    const { smallImg, largeImg } = this.state;

    return (
      <div className="detail-img-list flex-column">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: 'Wristwatch by Ted Baker London',
              isFluidWidth: true,
              src: smallImg
            },
            largeImage: {
              src: largeImg,
              width: widthZoomImage,
              height: heightZoomImage
            },
            enlargedImageClassName: 'img-none-maxWidth',
            enlargedImageContainerClassName: 'img-zoom'
          }}
        />
        {/* <div className="zoom-product-gui p-1 pr-2 pl-2 d-none d-sm-block">
						<i className="fa fa-search mr-3" />
						<FormattedMessage id="PRODUCT_DETAIL_CONTENT_ZOOM" defaultMessage="Rê chuột vào hình để phóng to" />
				</div> */}
        <div className="d-flex overflow-hidden product-thumb-list justify-content-center">
          {listImg &&
            listImg.map((item, index) => (
              <Fragment key={index}>
                {index <= 4 && (
                  <div className="thumb-item" key={index} role="presentation" onClick={() => this.handleChangeImg(item)}>
                    <img src={item.thumb} alt="no thing" />
                  </div>
                )}
                {index === 5 && (
                  <span className="thumb-item text gallery-init" key={index}>
                    <span className="flx">
                      <img
                        alt="Product"
                        src={item.thumb}
                        // onError={(e) => { e.target.onerror = null; e.target.src= IMG_DEFAULT }}
                      />

                      <span className="text">
                        Xem
                        <br />
                        thêm
                        <br />
                        {listImg.length - 5} hình
                      </span>
                    </span>
                  </span>
                )}
              </Fragment>
            ))}
        </div>
      </div>
    );
  }
}

ProductZoom.defaultProps = {
  widthZoomImage: 1200,
  heightZoomImage: 1200
};

ProductZoom.propTypes = {
  widthZoomImage: PropTypes.number,
  heightZoomImage: PropTypes.number
};

export default ProductZoom;
