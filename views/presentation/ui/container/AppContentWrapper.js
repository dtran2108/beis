import React from 'react';
import { Navbar, Sidebar } from '../navigation';
import { MenuSize } from '../navigation/Navbar';
import 'jquery-slimscroll/jquery.slimscroll.min';
import { withRouter } from 'next/router';
import { compose } from 'recompose';
import strings from '~/localization';
import * as PATH from '~/configs/routesConfig';

const menuHeader = [
  {
    title: strings.menu_header_dashboad,
    path: PATH.APP_DEFAULT_PATH
  },
  {
    title: strings.menu_header_commerce,
    path: PATH.ECOMMERCE_DASHBOARD
  },
  {
    title: strings.menu_header_shopping,
    path: PATH.PURCHASES_LIST_SHOP
  },
  {
    title: strings.menu_header_user,
    path: PATH.USERS_SHIPPER_LIST
  },
  {
    title: strings.menu_header_report,
    path: PATH.REPORT_SKU_LIST
  },
  {
    title: strings.menu_header_config,
    path: PATH.CONFIGS_PATH
  }
];
class AppContentWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
      isToggled: false,
      menuSize: MenuSize.small,
      pageWidth: 0
    };
  }

  componentDidMount() {
    this.setState({
      pageWidth: window.innerHeight,
      menuSize: window.innerHeight < 600 ? MenuSize.small : window.innerHeight < 800 ? MenuSize.medium : MenuSize.large
    });
    window.addEventListener(
      'resize',
      () => {
        if (window.innerWidth < 600) {
          this.setState({ menuSize: MenuSize.small });
        } else if (window.innerWidth < 800) {
          this.setState({ menuSize: MenuSize.medium });
        } else {
          this.setState({ menuSize: MenuSize.large });
        }
        this.setState({ pageWidth: window.innerHeight });
      },
      false
    );
  }

  getMenuSize = (size) => {
    switch (size) {
      case MenuSize.small:
        return 'appWrapper scheme-default default-scheme-color header-fixed aside-fixed rightbar-hidden device-lg sidebar-xs';
      case MenuSize.medium:
        return 'appWrapper scheme-default default-scheme-color header-fixed aside-fixed rightbar-hidden device-sm sidebar-sm';
      default:
        return 'appWrapper';
    }
  };

  render() {
    const { children, showMainSideBar } = this.props;

    return (
      <div id="minovate" className={this.getMenuSize(this.state.menuSize)}>
        <div id="wrap" className="animsition" style={{ animationDuration: '1.5s', opacity: 1 }}>
          <section id="header" style={{ position: 'fixed', width: '100%' }} className="scheme-default">
            <Navbar
              topNav={{
                isMenu: true,
                pageName: strings.header_logo_name,
                slot: menuHeader
              }}
              size={this.state.menuSize}
              onResize={(size) => this.setState({ menuSize: size })}
            />
          </section>
          {/* ================================================
                ================= SIDEBAR Content ===================
                ================================================= */}
          {showMainSideBar === true && (
            <div id="controls">
              <aside id="sidebar" className="scheme-default aside-fixed dropdown-open">
                <div id="sidebar-wrap">
                  <div className="slimScrollDiv">
                    <div className="panel-group slim-scroll" role="tablist">
                      <div className="panel panel-default">
                        <div className="panel-heading" role="tab">
                          <h4 className="panel-title">
                            <a data-toggle="collapse" href="#sidebarNav">
                              Navigation <i className="fa fa-angle-up" />
                            </a>
                          </h4>
                        </div>
                        <div
                          id="sidebarNav"
                          className="panel-collapse collapse in hide-scrollbar"
                          role="tabpanel"
                          style={{
                            height: this.state.pageWidth - 45,
                            overflowY: 'scroll'
                          }}>
                          <div className="panel-body">
                            <Sidebar showMainSideBar={showMainSideBar} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
          {/* ====================================================
            ================= CONTENT ===============================
            ===================================================== */}
          <section id={showMainSideBar === true ? 'content' : 'non-left-content'}>{children}</section>
        </div>
        ;
      </div>
    );
  }
}

export default compose(withRouter)(AppContentWrapper);
