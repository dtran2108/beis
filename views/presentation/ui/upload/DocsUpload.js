import React from 'react';
import { Upload, Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getString } from '~/utils/helpers/utilObject';
import { API_UPLOAD_URL, IMAGE_URL, videoUploadConfig, docsExtension } from '~/configs';
// import { checkAvartarImage } from "~/views/presentation/ui/upload/checkUploadFile";
import strings from '~/localization';
import _ from 'lodash';

const UploadStyled = styled(Upload)``;

const ModalStyled = styled(Modal)`
  .ant-modal-content span.ant-modal-close-x {
    position: relative;
    top: -13px;
    right: -13px;
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

export default class DocsUpload extends React.Component {
  constructor(props) {
    super(props);
    let stringDocs = getString(this.props, 'docs', '');
    let fileList =
      stringDocs.length > 0
        ? stringDocs.split('|').map((item, index) => ({
            uid: index,
            name: item,
            status: 'done',
            url: IMAGE_URL + item,
            videoUrl: item
          }))
        : [];

    this.state = {
      pointerInDiv: false,
      isFocused: false,
      previewVisible: false,
      previewImage: '',
      previewVideo: '',
      previewTitle: '',
      fileList
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.docs !== nextProps.docs) {
      let stringDocs = getString(nextProps, 'docs', '');
      let fileList =
        stringDocs.length > 0
          ? stringDocs.split('|').map((item, index) => ({
              uid: index,
              name: item,
              status: 'done',
              url: IMAGE_URL + item,
              videoUrl: item
            }))
          : [];
      this.setState({
        fileList: fileList
      });
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickDocument);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickDocument);
  }

  onClickDocument = () => {
    if (this.state.isFocused === true && this.state.pointerInDiv === false) {
      this.props.onBlur && this.props.onBlur();
    }
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVideo: file.videoUrl || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    });
  };

  handleChange = ({ fileList }) => {
    const { onChange } = this.props;
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].status === 'uploading') {
        this.setState({ fileList });
        return;
      }
    }
    this.setState(
      {
        fileList: (fileList || []).map((item, index) => {
          if (item.response) {
            return {
              uid: index,
              name: getString(_.first(item.response), 'imageName'),
              status: 'done',
              url: API_UPLOAD_URL + '/' + getString(_.first(item.response), 'pathImage')
            };
          } else {
            return { ...item, uid: index };
          }
        })
      },
      () => {
        let updateDocs = this.state.fileList
          .filter((item) => item.status === 'done')
          .map((item) => item.url.replace(IMAGE_URL, ''))
          .join('|');
        onChange && onChange(updateDocs);
      }
    );
  };

  renderContentPreview() {
    const { previewImage, previewVideo } = this.state;
    const { controlsVideo, autoPlayVideo } = this.props;
    if (videoUploadConfig.type.test(previewImage))
      return (
        <video style={{ width: '100%', height: 'auto' }} controls={controlsVideo} autoPlay={autoPlayVideo}>
          <source src={previewVideo} type="video/mp4" />
          <track default kind="captions" srcLang="en" src="video thumbnail defaul" />
          Sorry, your browser does not support embedded videos.
        </video>
      );
    return <img alt="example" style={{ width: '100%' }} src={previewImage} />;
  }

  renderPreview() {
    const { previewVisible } = this.state;
    return (
      <ModalStyled
        visible={previewVisible}
        // title={previewTitle}
        footer={null}
        onCancel={this.handleCancel}>
        {this.renderContentPreview()}
      </ModalStyled>
    );
  }

  render() {
    const { fileList } = this.state;
    const { editable, multiple } = this.props;

    // Có thể custom button upload ở đây
    const uploadButton = (
      <Button>
        <UploadOutlined /> {strings.upload_docs}{' '}
      </Button>
    );

    return (
      <div
        className="clearfix"
        role="presentation"
        onClick={() => this.setState({ isFocused: true })}
        onMouseEnter={() => {
          if (this.state.pointerInDiv === false) {
            this.setState({ pointerInDiv: true });
          }
        }}
        onMouseLeave={() => {
          if (this.state.pointerInDiv === true) {
            this.setState({ pointerInDiv: false });
          }
        }}>
        <UploadStyled
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          action={API_UPLOAD_URL}
          name="files"
          // listType="picture-card"
          // previewFile={this.setPreviewFile}
          accept={docsExtension}
          multiple={multiple}
          fileList={fileList}
          disabled={!editable}
          showUploadList={{
            showPreviewIcon: editable,
            showDownloadIcon: editable,
            showRemoveIcon: editable
          }}
          // onPreview={this.handlePreview}
          onChange={this.handleChange}
          // beforeUpload={checkAvartarImage}
        >
          {!editable ? null : uploadButton}
        </UploadStyled>
        {this.renderPreview()}
      </div>
    );
  }
}
