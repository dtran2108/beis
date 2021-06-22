import React from 'react';

import { Upload, Modal } from 'antd';
import { IMAGE_URL } from '~/configs';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default class PicturesWall extends React.Component {
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

  render() {
    const { previewVisible, fileList, previewTitle } = this.state;
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          showUploadList={{
            showPreviewIcon: true,
            showDownloadIcon: false,
            showRemoveIcon: false
          }}></Upload>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}></Modal>
      </>
    );
  }
}
