import * as routePath from '~/configs/routesConfig';
import strings from '~/localization/vi';
const menus = {
  DASHBOARD: {
    icon: '',
    name: strings.SIDEBAR_MENU_DASHBOARD,
    path: routePath.DASHBOARD_PATH
  },
  CATEGORY: {
    icon: '',
    name: strings.SIDEBAR_MENU_CATEGORY,
    path: routePath.MASTER_DATA_CATEGORY
  },
  PRODUCT: {
    icon: '',
    name: strings.SIDEBAR_MENU_PRODUCT,
    path: routePath.MASTER_DATA_ORIGINAL_PRODUCT,
    subMenus: {
      productList: {
        icon: '',
        name: strings.SIDEBAR_MENU_PRODUCT_LIST,
        path: routePath.MASTER_DATA_PRODUCT_ALL
      },
      createProduct: {
        icon: '',
        name: strings.SIDEBAR_MENU_PRODUCT_ADD,
        path: routePath.MASTER_DATA_PRODUCT_ADD
      }
    }
  }
  // REPORT: {
  // 	icon: "",
  // 	name: 'Báo Cáo',
  // 	path: routePath.REPORT_PATH,
  // 	subMenus:{
  // 		ReportSKU:{
  // 			icon: "",
  // 			name: 'B/C doanh số theo SKU',
  // 			path: routePath.REPORT_SKU_PATH
  // 		},
  // 		ReportSales:{
  // 			icon: "",
  // 			name: 'B/C doanh số theo NVKD',
  // 			path: routePath.REPORT_SALE_MAN
  // 		}
  // 	}
  // }
};

export default menus;
