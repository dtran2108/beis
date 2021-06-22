import React, { useEffect } from 'react';
import { Upload, Form } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import { commonValidate } from '~/views/utils/helpers/ant-validation';
import { IMAGE_UPLOAD_URL } from '~/configs';
import { ACCEPT_IMAGE_UPLOAD } from '~/configs/upload';
import { getAuthoz } from '~/redux/utils/session';
import { beforeUpload } from '~/views/utils/helpers/image';
import { head } from 'lodash';
import { firstImage } from '~/views/utils/helpers/utilObject';
import styled from 'styled-components';

const UploadStyled = styled(Upload)`
  .ant-upload.ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container {
    width: 150px;
    height: 150px;
  }
  .ant-upload.ant-upload-select-picture-card,
  .ant-upload-list-picture .ant-upload-list-item,
  .ant-upload-list-picture-card .ant-upload-list-item-info,
  .ant-upload-list-picture-card .ant-upload-list-item {
    border-radius: 99px;
  }
`;

// Crop before upload preview
const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow.document.write(image.outerHTML);
};
// Crop before upload preview

function MUploadImageCrop(props) {
  const [fileList, setFileList] = useState(props?.fileList !== null ? [props.fileList] : []);
  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
    props.onImageChange(
      fileList.map((f) => {
        const f1 = head(f?.response);
        return f1?.path;
      })
    );
  };

  useEffect(() => {
    if (props.fileList?.length > 0)
      if (Array.isArray(props.fileList))
        setFileList(
          props.fileList.map((f) => {
            return { url: firstImage(f) };
          })
        );
      else
        setFileList(
          props.fileList.split(', ').map((f) => {
            return { url: firstImage(f) };
          })
        );
    // eslint-disable-next-line
  }, [props.fileList?.length]);

  return (
    <div
      className={
        props.noLabel
          ? 'col-12'
          : props.oneLine
          ? 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'
          : props.customLayout
          ? props.customLayout
          : 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4'
      }>
      {props.copyBtn && props.copyBtn}
      <Form.Item label={props?.label} name={props.name || 'MUploadImageCrop'} rules={props.rules}>
        <ImgCrop shape={props.shape || 'rect'} beforeCrop={beforeUpload} rotate aspect={props.aspect || 3 / 4} grid>
          <UploadStyled
            action={IMAGE_UPLOAD_URL}
            beforeUpload={beforeUpload}
            fileList={fileList}
            accept={ACCEPT_IMAGE_UPLOAD.join(', ')}
            headers={{ Authorization: `Bearer ${getAuthoz()}` }}
            listType="picture-card"
            multiple
            name="files"
            onChange={onFileChange}
            onPreview={onPreview}>
            {fileList.length < (props.maximumUpload || 5) && '+ Upload'}
          </UploadStyled>
        </ImgCrop>
      </Form.Item>
    </div>
  );
}
export default MUploadImageCrop;
