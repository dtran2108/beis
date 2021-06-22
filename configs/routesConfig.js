// authUser
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/authUser/register';
export const FORGOT_PASSWORD_PATH = '/authUser/forgotPassword';
export const VERIFY_CODE_PATH = (type) => `/authUser/verifyCode?type=${type}`;
export const REGISTER_PROFILE_PATH = '/authUser/registerProfile';
export const VIEW_CART_PATH = '/checkout/cart';
export const PRODUCT_SEARCH_PATH = '/search';
export const PRODUCT_CATEGORY_SEARCH_PATH = '/category';
export const MY_PROFILE = '/my-profile';
export const MY_ORDERS = '/my-orders';
export const RESET_PASSWORD_PATH = '/resetpassword';
export const SHIPPING_ADDRESSES = '/shipping-addresses';
export const SHOPPING_CART = '/shopping-cart';
export const RETURN_ORDER_PATH = '/return/order/:id';
export const LOGOUT_PATH = '/logout';

export const VIEW_DETAIL_FOOTER = '/footer/:id';

// home
export const HOME_PATH = '/';
export const APP_DEFAULT_PATH = HOME_PATH;
export const SERVICE_PATH = '/servicetop';
export const PURCHASE_PATH = '/purchase';

// [Product Detail]
export const PRODUCT_DETAIL_PATH = '/product/:id';

// [Product list follow category]
export const CATEGORY_PATH = '/category';
export const PRODUCT_CATEGORY_PATH = '/category/:id';

// [My profile]
export const PROFILE_PATH = '/account';
export const MY_PROFILE_PATH = '/account/my-profile';
export const MY_ADDRESS_PATH = '/account/my-addresses';
export const MY_WALLET_PATH = '/account/my-wallet';
export const CREATE_ADDRESS_PATH = '/account/create-address';
export const FAVORITE_SELLER_PATH = '/account/favorite-seller';
export const MY_ORDER_PATH = '/account/my-order';
export const NOTIFY_PATH = '/account/notification';
export const WISHLIST = '/account/pro-wishlist';

// [404]
export const ERROR_404 = '/404';

// cbp x bidv
export const CBP_BIDV_INTRODUCE_PATH = '/cbp-bidv/introduce';
export const CBP_BIDV_CARDS_PATH = '/cbp-bidv/cards';

// features
export const BOOKING_PATH = '/features/booking';
export const TRANSFER_PATH = '/features/transfer';

// account
export const ACCOUNT_MANAGEMENT_PATH = '/account/account-management';
export const ACCOUNT_BOOKING_MANAGEMENT_PATH = '/account/booking-management';
export const PRODUCT_MANAGEMENT_PATH = '/account/product-management';
export const PERSONAL_INFO_PATH = '/account/information';
export const REWARD_POINTS_PATH = '/account/reward-points';
export const OWNING_PACKAGES_INFO_PATH = '/account/owning-packages';
export const BOOKING_INFO_PATH = '/account/booking-information';
export const BOOKING_HISTORY_PATH = '/account/booking-history';

export const ANNOUNCE_PATH = '/announce'