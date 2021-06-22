import { Tag, Typography } from 'antd';
import { Color } from '~/utils/layout';

const { Text } = Typography;

export const PROMOTION_STATUS = {
  RUNNING: 'RUNNING', //dang dien ra
  EXPIRED: 'EXPIRED', //da het han
  WAITING_FOR_APPROVAL: 'WAITING_FOR_APPROVAL', //dang cho xac nhan
  APPROVED: 'APPROVED', //da xac nhan
  REJECTED: 'REJECTED', //đa bi tu choi
  DELETED: 'DELETED' //da bi xoa)
};

export const COMMON_STATUS = {
  ACTIVATED: 'ACTIVATED',
  DEACTIVATED: 'DEACTIVATED'
};

export const PROMOTION_TYPE = {
  GIFT: 'GIFT',
  DISCOUNT_PER_PRODUCT: 'DISCOUNT_PER_PRODUCT'
};

export const PROMOTION_DISCOUNT_TYPE = {
  MONEY: 'MONEY',
  PERCENT: 'PERCENT'
};

export const SHOPPING_DELIVERY = {
  DELIVERY_YOURSELF: 'DELIVERY_YOURSELF',
  DELIVERY_STORE: 'DELIVERY_STORE',
  DELIVERY_SERVICE: 'DELIVERY_SERVICE'
};

/**
 * THIS IS COMPONENT / FUNCTION
 * @Input: STATUS, type
 * @Output:   string value or Tag value
 * @Description:   return
 * @Author: tan.hoang@vslsoft.com
 * @Date: 2020-12-18 11:53:53
 */
export const renderShoppingDelivery = (STATUS, type = 'string') => {
  if (type === 'string')
    switch (STATUS) {
      case SHOPPING_DELIVERY.DELIVERY_SERVICE:
        return 'Đối tác giao hàng';
      case SHOPPING_DELIVERY.DELIVERY_YOURSELF:
        return 'Tự lấy';
      case SHOPPING_DELIVERY.DELIVERY_STORE:
        return 'Cửa hàng giao hàng';
      default:
        return '-';
    }
  if (type === 'tag')
    switch (STATUS) {
      case SHOPPING_DELIVERY.DELIVERY_SERVICE:
        return <Tag color={Color.DELIVERY_SERVICE}>Đối tác giao hàng</Tag>;
      case SHOPPING_DELIVERY.DELIVERY_YOURSELF:
        return <Tag color={Color.DELIVERY_YOURSELF}>Tự lấy</Tag>;
      case SHOPPING_DELIVERY.DELIVERY_STORE:
        return <Tag color={Color.DELIVERY_STORE}>Cửa hàng giao hàng </Tag>;
      default:
        return '-';
    }
};

export const FILTER_TYPE = {
  ALL: 'ALL',
  PROMOTION: 'PROMOTION',
  COMBO: 'COMBO',
  BOUGHT: 'BOUGHT',
  FILTER: 'FILTER',
  FEATURED: 'FEATURED'
};

export const renderButtonFilter = (t) => {
  return [
    { value: FILTER_TYPE.ALL, label: t('common:btn_all') },
    { value: FILTER_TYPE.PROMOTION, label: t('common:btn_promotion') },
    { value: FILTER_TYPE.BOUGHT, label: t('common:btn_bought') },
    { value: FILTER_TYPE.FEATURED, label: t('common:btn_featured') },
    { value: FILTER_TYPE.COMBO, label: t('common:btn_combo') },
    { value: FILTER_TYPE.FILTER, label: t('common:btn_filter') }
  ];
};

export const MY_ORDER_TYPE = {
  ALL: 'ALL',
  WAITING: 'WAITING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  FULFILLED: 'FULFILLED',
  CANCELED: 'CANCELED',
  DELIVERED: 'DELIVERED'
};

export const renderMyOrderFillter = (t) => {
  return [
    { value: '', label: t('common:btn_all') },
    { value: MY_ORDER_TYPE.WAITING, label: t('common:waiting') },
    { value: MY_ORDER_TYPE.ACCEPTED, label: t('common:accepted') },
    { value: MY_ORDER_TYPE.REJECTED, label: t('common:rejected') },
    { value: MY_ORDER_TYPE.FULFILLED, label: t('common:fulfilled') },
    // { value: MY_ORDER_TYPE.CANCELED, label: t('common:cancel') },
    { value: MY_ORDER_TYPE.DELIVERED, label: t('common:delivered') }
  ];
};

export const renderStatusMyOrder = (status, t) => {
  switch (status) {
    case MY_ORDER_TYPE.ACCEPTED:
      return <Text className="text-info">{t('common:accepted')}</Text>;
    case MY_ORDER_TYPE.WAITING:
      return <Text type="danger">{t('common:waiting')}</Text>;
    case MY_ORDER_TYPE.REJECTED:
      return <Text type="secondary">{t('common:rejected')}</Text>;
    case MY_ORDER_TYPE.CANCELED:
      return <Text type="secondary">{t('common:cancel')}</Text>;
    case MY_ORDER_TYPE.FULFILLED:
      return <Text type="success">{t('common:fulfilled')}</Text>;
    case MY_ORDER_TYPE.DELIVERED:
      return <Text type="warning">{t('common:delivered')}</Text>;
  }
};
export const COUPON_TYPE = {
  FIXED: 'FIXED', // decrease amount
  PERCENTAGE: 'PERCENTAGE' // percent / total amount
};
/**
 * THIS IS COMPONENT / FUNCTION
 * @Input: STATUS, type
 * @Output:   string value or Tag value
 * @Description:   return
 * @Author: tan.hoang@vslsoft.com
 * @Date: 2020-12-18 11:53:53
 */
export const renderCouponType = (STATUS, type = 'string') => {
  if (type === 'string')
    switch (STATUS) {
      case COUPON_TYPE.FIXED:
        return 'Đối tác giao hàng';
      case COUPON_TYPE.PERCENTAGE:
        return 'Tự lấy';
      default:
        return '-';
    }
  if (type === 'tag')
    switch (STATUS) {
      case COUPON_TYPE.FIXED:
        return <Tag color={Color.FIXED}>Đối tác giao hàng</Tag>;
      case COUPON_TYPE.PERCENTAGE:
        return <Tag color={Color.PERCENTAGE}>Tự lấy</Tag>;
      default:
        return '-';
    }
};

export const SURVEY_STATUS = {
  RUNNING: 'RUNNING',
  PAUSE: 'PAUSE ',
  EXPIRED: 'EXPIRED',
  WAITING_FOR_APPROVAL: 'WAITING_FOR_APPROVAL',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  DELETED: 'DELETED'
};

export const ADVERTISEMENT_STATUS = {
  RUNNING: 'RUNNING',
  PAUSE: 'PAUSE ',
  EXPIRED: 'EXPIRED',
  WAITING_FOR_APPROVAL: 'WAITING_FOR_APPROVAL',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  DELETED: 'DELETED'
};

/**
 * THIS IS COMPONENT / FUNCTION
 * @Input: STATUS, type
 * @Output:   string value or Tag value
 * @Description:   return
 * @Author: tan.hoang@vslsoft.com
 * @Date: 2020-12-18 11:53:53
 */
export const renderSurveyStatus = (STATUS, type = 'string', t) => {
  if (type === 'string')
    switch (STATUS) {
      case RUNNING:
        return t('survey:RUNNING');
      case PAUSE:
        return t('survey:PAUSE');
      case EXPIRED:
        return t('survey:EXPIRED');
      case WAITING_FOR_APPROVAL:
        return t('survey:WAITING_FOR_APPROVAL');
      case APPROVED:
        return t('survey:APPROVED');
      case REJECTED:
        return t('survey:REJECTED');
      case DELETED:
        return t('survey:DELETED');
      default:
        return '-';
    }
  if (type === 'tag')
    switch (STATUS) {
      case RUNNING:
        return <Tag color={Color.primary}>t('survey:RUNNING');</Tag>;
      case PAUSE:
        return <Tag color={Color.primary}>t('survey:PAUSE');</Tag>;
      case EXPIRED:
        return <Tag color={Color.primary}>t('survey:EXPIRED');</Tag>;
      case WAITING_FOR_APPROVAL:
        return <Tag color={Color.primary}>t('survey:WAITING_FOR_APPROVAL');</Tag>;
      case APPROVED:
        return <Tag color={Color.primary}>t('survey:APPROVED');</Tag>;
      case REJECTED:
        return <Tag color={Color.primary}>t('survey:REJECTED');</Tag>;
      case DELETED:
        return <Tag color={Color.primary}>t('survey:DELETED');</Tag>;
      default:
        return '-';
    }
};

export const renderTransStatus = (STATUS, t) => {
  switch (STATUS) {
    case 'COMPLETED':
      return <Text type="success">{t('common:COMPLETED')}</Text>;
    case 'FAILED':
      return <Text type="danger">{t('common:FAILED')}</Text>;
    case 'REJECTED':
      return <Text type="secondary">{t('common:REJECTED')}</Text>;
    case 'PENDING':
      return <Text type="warning">{t('common:PENDING')}</Text>;
    case 'ERROR':
      return <Text type="danger">{t('common:ERROR')}</Text>;
  }
};
