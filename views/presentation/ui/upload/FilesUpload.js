import React from 'react';
import { Upload, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getArray, getString, getNumber } from '~/utils/helpers/utilObject';
import { API_UPLOAD_FILES_URL, IMAGE_URL, filesExtension } from '~/configs';
import { checkDocs } from '~/views/presentation/ui/upload/checkUploadFile';
import strings from '~/localization';
import _ from 'lodash';

const UploadStyled = styled(Upload)`
  display: flex;
  flex-direction: column-reverse;
  .ant-upload.ant-upload-select {
    background: #fafafa;
    border: 1px dashed #dcdcdc;
    padding: 4px;
    margin: 4px 8px 0 0;
  }
  .ant-upload.ant-upload-select:hover {
    border: 1px dashed #9696fa;
  }
`;

export default class FilesUpload extends React.Component {
  constructor(props) {
    super(props);
    let fileList = getArray(this.props, 'files', []).map((file) => ({
      ...file,
      url: IMAGE_URL + file.url
    }));

    this.state = {
      pointerInDiv: false,
      isFocused: false,
      previewVisible: false,
      fileList,
      file: {}
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.files !== this.state.fileList) {
      let fileList = getArray(nextProps, 'files', []).map((file) => ({
        ...file,
        url: IMAGE_URL + file.url,
        path: file.path
      }));
      this.setState({ fileList });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickDocument);
  }

  onClickDocument = () => {
    if (this.state.isFocused === true && this.state.pointerInDiv === false) {
      this.props.onBlur && this.props.onBlur();
    }
  };

  handleChangeDocs = ({ file, fileList }) => {
    const { onChange } = this.props;
    if (file.status === 'uploading') {
      this.setState({ fileList });
      return;
    }
    this.setState(
      {
        fileList: (fileList || []).map((item) => {
          if (item.response) {
            return {
              ...item,
              uid: getNumber(_.first(item.response), 'id'),
              name: getString(_.first(item.response), 'originalName'),
              status: 'done',
              url: IMAGE_URL + getString(_.first(item.response), 'path'),
              path: getString(_.first(item.response), 'path')
            };
          } else {
            return { ...item };
          }
        })
      },
      () => {
        let updateImages = this.state.fileList.map((file) => ({
          ...file,
          url: getString(file, 'url', '').replace(IMAGE_URL, '')
        }));
        onChange && onChange(updateImages);
      }
    );
  };

  onConfirm = () => {
    const { onDeleteFile } = this.props;
    const { file } = this.state;
    return onDeleteFile(file);
  };
  onCancel = () => {};

  handleRemove = (file) => {
    this.setState({ file });
    return false;
  };

  render() {
    const { fileList } = this.state;
    const {
      multiple,
      user,
      profileId,
      profileType,
      listType,
      showRemoveIcon,
      showDownloadIcon,
      downloadIcon,
      isUploadButton,
      nameUpload
    } = this.props;

    // Có thể custom button upload ở đây
    const uploadButton = (
      <div className="ant-upload-text">
        <PlusOutlined />
        {strings.upload_docs}
      </div>
    );
    return (
      <div className="clearfix" role="presentation" onClick={() => this.setState({ isFocused: true })}>
        <UploadStyled
          action={API_UPLOAD_FILES_URL + `?profileId=${profileId}&profileType=${profileType}`}
          headers={{
            Authorization: `Bearer ${user.id_token}`
          }}
          name={nameUpload}
          listType={listType}
          accept={filesExtension}
          multiple={multiple}
          fileList={fileList}
          showUploadList={{
            showRemoveIcon: showRemoveIcon,
            showDownloadIcon: showDownloadIcon,
            removeIcon: (
              <Popconfirm
                placement="topRight"
                title={strings.upload_confirm_title}
                okText={strings.upload_confirm_yes}
                cancelText={strings.upload_confirm_no}
                onConfirm={this.onConfirm}
                onCancel={this.onCancel}>
                <DeleteOutlined />
              </Popconfirm>
            )
          }}
          downloadIcon={downloadIcon}
          onChange={this.handleChangeDocs}
          onRemove={this.handleRemove}
          beforeUpload={checkDocs}>
          {!isUploadButton ? null : uploadButton}
        </UploadStyled>
      </div>
    );
  }
}
