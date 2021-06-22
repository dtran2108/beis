import React from 'react';
import { Upload, Modal } from 'antd';
import styled from 'styled-components';
import InfiniteCarousel from 'react-leaf-carousel';
import { API_UPLOAD_URL, IMAGE_URL, imageExtension, IMAGE_UPLOAD_URL } from '~/configs';
import strings from '~/localization';
import _ from 'lodash';
import { getString } from '~/utils/helpers/utilObject';
import { checkAvartarImage } from '~/views/presentation/ui/upload/checkUploadFile';

const UploadStyled = styled(Upload)`
  width: auto !important;
  .ant-upload.ant-upload-select-picture-card {
    display: table;
    float: left;
    width: 160px;
    height: 94px;
    margin-right: 0px;
    margin-bottom: 0px;
    text-align: center;
    vertical-align: top;
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    cursor: pointer;
    -webkit-transition: border-color 0.3s ease;
    transition: border-color 0.3s ease;
  }
`;

const ContainerStyled = styled.div`
  #infinite-carousel {
    button i {
      border-width: 0 3px 3px 0 !important;
    }
    .InfiniteCarouselFrame ul li {
      border: 1px solid #e9e9e9;
    }
  }
`;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class LicenceUploader extends React.Component {
  constructor(props) {
    super(props);

    let stringImages = getString(this.props, 'images', '');
    let fileList =
      stringImages.length > 0
        ? stringImages.split('|').map((item, index) => ({
            uid: index,
            name: item,
            status: 'done',
            url: IMAGE_URL + item
          }))
        : [];

    this.state = {
      loading: false,
      visibleList: true,
      previewVisible: false,
      previewImage: '',
      previewId: undefined,
      previewTitle: '',
      fileList: fileList
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.images !== nextProps.images) {
      let stringImages = getString(nextProps, 'images', '');
      let fileList =
        stringImages.length > 0
          ? stringImages.split('|').map((item, index) => ({
              uid: index,
              name: item,
              status: 'done',
              url: IMAGE_URL + item
            }))
          : [];
      this.setState(
        {
          fileList: fileList,
          visibleList: false
        },
        () => this.setState({ visibleList: true })
      );
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewId: file.uid,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    });
  };

  handleChangeCertificate = ({ file, fileList }) => {
    const { onChange } = this.props;
    if (file.status === 'uploading') {
      this.setState({ fileList: fileList, visibleList: false });
    } else {
      this.setState(
        {
          fileList: (fileList || []).map((item, index) => {
            if (item.response) {
              return {
                uid: index,
                name: this.props.title,
                status: 'done',
                url: API_UPLOAD_URL + '/' + getString(_.first(item.response), 'pathImage')
              };
            } else {
              return { ...item, uid: index };
            }
          }),
          visibleList: true
        },
        () => {
          let updateImages = this.state.fileList
            .filter((item) => item.status === 'done')
            .map((item) => item.url.replace(IMAGE_URL, ''))
            .join('|');
          onChange && onChange(updateImages);
        }
      );
    }
  };

  render() {
    const { previewVisible, previewImage, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <i className="fa fa-upload" style={{ fontSize: '24px' }} />
        <div className="ant-upload-text">{strings.upload_certificate}</div>
      </div>
    );
    return (
      <ContainerStyled>
        <div className="d-flex justify-content-center" style={{ marginBottom: '20px' }}>
          <UploadStyled
            name={'files'}
            action={IMAGE_UPLOAD_URL}
            listType="picture-card"
            disabled={(this.state.fileList || []).length >= 8}
            accept={imageExtension}
            fileList={this.state.fileList}
            showUploadList={false}
            beforeUpload={checkAvartarImage}
            onChange={this.handleChangeCertificate}>
            {uploadButton}
          </UploadStyled>
        </div>
        {this.state.visibleList === true && (
          <InfiniteCarousel
            breakpoints={[
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
                }
              }
            ]}
            dots={true}
            showSides={true}
            sidesOpacity={0.5}
            sideSize={0.1}
            slidesToScroll={4}
            slidesToShow={4}
            scrollOnDevice={true}>
            {this.state.fileList.map((item, index) => (
              <div key={index} role="presentation" onClick={() => this.handlePreview(item)}>
                <img style={{ cursor: 'pointer' }} src={item.url} alt="no thing" />
              </div>
            ))}
          </InfiniteCarousel>
        )}
        <Modal
          visible={previewVisible}
          title={previewTitle}
          okText={strings.delete}
          cancelButtonProps={{ style: { display: 'none' } }}
          onCancel={this.handleCancel}
          onOk={() => {
            this.setState({ visibleList: false }, () => {
              this.setState(
                {
                  fileList: (this.state.fileList || []).filter((item) => item.uid !== this.state.previewId),
                  previewId: undefined,
                  previewVisible: false,
                  visibleList: true
                },
                () => {
                  const { onChange } = this.props;
                  let updateImages = this.state.fileList
                    .filter((item) => item.status === 'done')
                    .map((item) => item.url.replace(IMAGE_URL, ''))
                    .join('|');
                  onChange && onChange(updateImages);
                }
              );
            });
          }}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </ContainerStyled>
    );
  }
}
