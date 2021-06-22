import React from 'react';
import styled from 'styled-components';
import { UIBreadcrumb } from '~/views/presentation/ui/commons';
import { Button } from 'antd';
import { compose } from 'recompose';
import { withRouter } from 'next/router';
import strings from '~/localization';
import * as PATH from '~/configs/routesConfig';
import { getString } from '~/utils/helpers/utilObject';

const ContainerStyled = styled.div`
  height: 70px;
  span.ant-dropdown-trigger {
    margin-right: auto;
  }
  background-color: #fff;
  box-shadow: 1px 1px 1px 0px #dcdcdc;
  padding: 2px 0px;
  .row {
    height: 35px;
    align-items: center;
    &:last-child {
      align-items: flex-start;
    }
    .btn-header-action {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
`;
const GroupButtonStyled = styled.div`
  button {
    width: auto;
    height: 24px !important;
    padding: 0px 15px !important;
    border-radius: 5px;
  }
  button span {
    text-transform: lowercase;

    cursor: pointer;
  }
  button span:first-letter {
    text-transform: uppercase;
  }
`;

class BreadcrumbHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    if (global.viewAsBlocks === undefined) {
      global.viewAsBlocks = true;
    }
    this.state = {
      viewAsBlocks: global.viewAsBlocks,
      isChooseProfileType: false
    };
  }

  handleChangeView = () => {
    let viewAsBlocks = this.state.viewAsBlocks;
    this.setState({ viewAsBlocks: !viewAsBlocks });
    global.viewAsBlocks = !viewAsBlocks;
    this.handleUpdateViewStyle(!viewAsBlocks);
  };
  componentDidMount() {
    this.handleUpdateViewStyle(this.state.viewAsBlocks);
  }

  handleUpdateViewStyle = (viewAsBlocks) => {
    const { changeViewStyle } = this.props;
    changeViewStyle && changeViewStyle(viewAsBlocks);
  };

  renderAttributer = (obj) => {
    switch (obj) {
      default:
        return { title: '', link: '' };
    }
  };

  renderButtonSlost = (type) => {
    if (type == 'add')
      return (
        <div className="btn-header-action">
          <Button
            className="ml-3"
            type="primary"
            block
            // onClick={props.onChangeButton}
          >
            {strings.save}
          </Button>
          <Button
            className="ml-3"
            type="secondary"
            block
            // onClick={props.onChangeButton}
          >
            {strings.btn_cancel}
          </Button>
        </div>
      );
  };
  renderButtons = (props) => {
    const { router, history } = this.props;
    let title = getString(this.renderAttributer(router.pathname), 'title', '');
    let path = getString(this.renderAttributer(router.pathname), 'link', '');
  };

  render() {
    const { breadcrumb } = this.props;

    return (
      <ContainerStyled className={this.props.className}>
        <div className="row ">
          <div className="col-6 ml-3">
            <UIBreadcrumb path={breadcrumb} />
          </div>
        </div>
        <div className="row">
          <GroupButtonStyled className="col-6">{this.renderButtons(this.props)}</GroupButtonStyled>
        </div>
      </ContainerStyled>
    );
  }
}
export default compose(withRouter)(BreadcrumbHeader);
