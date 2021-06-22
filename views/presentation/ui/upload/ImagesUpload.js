import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IMAGE_URL } from '~/configs/';
import { IMAGE_UPLOAD_URL } from '~/configs/';
import { IMG_URL } from '~/configs/';
import { getArray } from '~/utils/helpers/utilObject';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class ImagesUpload extends React.Component {
  constructor(props) {
    super(props);
    let fileList = this.props.files || [];

    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList,
      loading: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.files !== this.state.fileList) {
      let fileList = getArray(nextProps, 'files', []).map((file) => {
        return {
          ...file,
          url: IMAGE_URL + file.url,
          path: file.path
        };
      });
      this.setState({ fileList });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url,
      previewVisible: true,
      previewTitle: file.name
    });
  };

  handleChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      const files = (fileList || []).map((file) => {
        let path = file && file.response && file.response[0] && file.response[0].pathImage;
        return {
          uid: file.uid,
          name: file.name,
          status: file.status,
          url: file.url || `${IMG_URL}${path}`,
          path: file.path || path
        };
      });

      this.props.onChange && this.props.onChange(files);
      this.setState({ fileList: files });
    } else if (file.status === 'removed') {
      this.props.onChange && this.props.onChange(fileList);
      this.setState({ fileList: fileList });
    } else if (file.status === 'uploading') {
      this.setState({ fileList });
    }
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <>
        <Upload
          name="files"
          action={IMAGE_UPLOAD_URL}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}>
          {this.props.disabled || fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default ImagesUpload;
