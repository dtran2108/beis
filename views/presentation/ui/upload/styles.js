import styled from 'styled-components';

export const AvatarOverlay = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${(props) => (props.shape === 'square' ? '0%' : '50%')};
  .overlay {
    display: none;
    position: absolute;
    width: ${(props) => (props.size ? props.size + 'px' : '130px')};
    height: ${(props) => (props.size ? props.size + 'px' : '130px')};
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    border-radius: ${(props) => (props.shape === 'square' ? '0%' : '50%')};
    line-height: 80px;
  }
  &:hover {
    .overlay {
      display: block;
    }
  }
`;

export const AvatarUploadWrapper = styled.div`
  .avatar-uploader > .ant-upload {
    width: ${(props) => (props.size ? props.size + 'px' : '130px')};
    height: ${(props) => (props.size ? props.size + 'px' : '130px')};
    border: none;
    background-color: transparent;
    margin: 0;
    display: inline-block;
    cursor: ${(props) => (props.disabled ? 'unset' : 'pointer')};
  }
  .avatar-uploader > .ant-upload > .ant-upload {
    padding: 0;
    display: block;
    div {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
