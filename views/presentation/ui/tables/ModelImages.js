import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import strings from './../../../../localization';
import { getArray, getString } from '~/utils/helpers/utilObject';
import { API_UPLOAD_URL, IMAGE_URL, imageExtension } from '~/configs';
import { checkAvartarImage } from '~/views/presentation/ui/upload/checkUploadFile';
import _ from 'lodash';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class ModelImages extends React.PureComponent {
  constructor(props) {
    super(props);
    let stringImage = this.props.images || '';
    this.state = {
      visible: true,
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList:
        stringImage.trim().length > 0
          ? (this.props.images || '').split('|').map((item, index) => ({
              uid: index,
              name: this.props.title,
              status: 'done',
              url: IMAGE_URL + item
            }))
          : []
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.images !== nextProps.images) {
      this.setState({
        fileList: getArray(nextProps.images, undefined, []).map((item, index) => ({
          uid: index,
          name: this.props.title,
          status: 'done',
          url: item
        }))
      });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    });
  };

  handleChangeImages = ({ file, fileList }) => {
    if (file.status === 'uploading') {
      this.setState({ fileList });
    } else {
      this.setState({
        fileList: (fileList || []).map((item, index) => {
          if (item.response) {
            return {
              uid: index,
              name: this.props.title,
              status: 'done',
              url: IMAGE_URL + getString(_.first(item.response), 'pathImage')
            };
          } else {
            return { ...item, uid: index };
          }
        })
      });
    }
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const { onChange, images, editable = true } = this.props;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Modal
        title={this.props.title}
        visible={this.state.visible}
        okText={strings.update}
        cancelText={strings.close}
        maskClosable={false}
        okButtonProps={{ disabled: !editable }}
        onOk={() => {
          this.setState({ visible: false });
          let updateImages = this.state.fileList
            .filter((item) => item.status === 'done')
            .map((item) => item.url.replace(IMAGE_URL, ''))
            .join('|');
          onChange && onChange(updateImages);
        }}
        onCancel={() => {
          this.setState({ visible: false });
          onChange && onChange(images);
        }}>
        <div className="clearfix">
          <Upload
            name="files"
            action={API_UPLOAD_URL}
            listType="picture-card"
            fileList={fileList}
            accept={imageExtension}
            showUploadList={{ showPreviewIcon: true, showRemoveIcon: editable }}
            beforeUpload={checkAvartarImage}
            onPreview={this.handlePreview}
            onChange={this.handleChangeImages}>
            {editable === false || fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      </Modal>
    );
  }
}
