import React from 'react';
import { Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import {
  WALLET_STATUS_VALUES,
  TRANSACTION_STATUS_VALUES,
  TRANSACTION_STATUSES,
  ORDER_STATUSES,
  ORDER_STATUS_VALUES,
  TRANSACTION_TYPES,
  DISTRIBUTOR_STATUSES,
  DISTRIBUTOR_VALUES,
  CAMPAIGN_STATUSES,
  CAMPAIGN_STATUS_VALUES
} from '~/configs';
import { getObject } from './utilObject';
import _ from 'lodash';

export const localizingStatusTitle = (value) => {
  switch (value) {
    case 'ACTIVATED':
      return <FormattedMessage id="ACTIVATED" defaultMessage="Đang hoạt động" />;
    case 'DEACTIVATED':
      return <FormattedMessage id="DEACTIVATED" defaultMessage="Ngưng hoạt động" />;
    case 'APPROVED':
      return <FormattedMessage id="APPROVED" defaultMessage="Đã duyệt" />;
    case 'WAITING_FOR_APPROVAL':
      return <FormattedMessage id="WAITING_FOR_APPROVAL" defaultMessage="Đang chờ duyệt" />;
    case 'REJECTED':
      return <FormattedMessage id="REJECTED" defaultMessage="Bị từ chối" />;
    case 'DELETED':
      return <FormattedMessage id="DELETED" defaultMessage="Đã xoá" />;
    case 'ALL':
      return <FormattedMessage id="ALL" defaultMessage="Tất cả" />;
    default:
      return null;
  }
};

export const renderTitleStatus = (status) => {
  const getStatusTitle = (value) => {
    switch (value) {
      case 'ACTIVATED':
        return (
          <Tag className="text-center" color="#108ee9">
            {localizingStatusTitle(value)}
          </Tag>
        );
      case 'DEACTIVATED':
        return (
          <Tag className="text-center" color="#6c757d">
            {localizingStatusTitle(value)}
          </Tag>
        );
      case 'APPROVED':
        return (
          <Tag className="text-center" color="#36A4E7">
            {localizingStatusTitle(value)}
          </Tag>
        );
      case 'WAITING_FOR_APPROVAL':
        return (
          <Tag className="text-center" color="#ffaf40">
            {localizingStatusTitle(value)}
          </Tag>
        );
      case 'REJECTED':
        return (
          <Tag className="text-center" color="#f50">
            {localizingStatusTitle(value)}
          </Tag>
        );
      case 'DELETED':
        return (
          <Tag className="text-center" color="#D00B35">
            {localizingStatusTitle(value)}
          </Tag>
        );
      default:
        return null;
    }
  };
  return getStatusTitle(status);
};

export const renderDistributorStatus = (status) => {
  const getStatusTitle = (value) => {
    let title =
      getObject(
        DISTRIBUTOR_STATUSES.find((item) => item.value === value),
        'label'
      ) || '';
    switch (value) {
      case DISTRIBUTOR_VALUES.APPROVED:
        return (
          <Tag className="text-center" color="#36A4E7">
            {title}
          </Tag>
        );
      case DISTRIBUTOR_VALUES.REJECTED:
        return (
          <Tag className="text-center" color="#f50">
            {title}
          </Tag>
        );
      default:
        return null;
    }
  };
  return getStatusTitle(status);
};

export const renderTransactionStatus = (status) => {
  const localizeTitle = (value) => {
    return getObject(
      TRANSACTION_STATUSES.find((item) => item.value === value),
      'label'
    );
  };

  const getStatusTitle = (value) => {
    switch (value) {
      case TRANSACTION_STATUS_VALUES.COMPLETED:
        return (
          <Tag className="text-center" color="#108ee9">
            {localizeTitle(value)}
          </Tag>
        );
      case TRANSACTION_STATUS_VALUES.PENDING:
        return (
          <Tag className="text-center" color="#ffc107">
            {localizeTitle(value)}
          </Tag>
        );
      case TRANSACTION_STATUS_VALUES.IN_PROGRESS:
        return (
          <Tag className="text-center" color="#6c757d">
            {localizeTitle(value)}
          </Tag>
        );
      case TRANSACTION_STATUS_VALUES.CANCELED:
        return (
          <Tag className="text-center" color="#f50">
            {localizeTitle(value)}
          </Tag>
        );
      case TRANSACTION_STATUS_VALUES.REJECTED:
        return (
          <Tag className="text-center" color="#D00B35">
            {localizeTitle(value)}
          </Tag>
        );
      default:
        return null;
    }
  };
  return getStatusTitle(status);
};

export const renderAccountStatus = (status) => {
  const getStatusTitle = (isBlocked) => {
    switch (isBlocked) {
      case false:
        return (
          <Tag className="text-center" color="#108ee9">
            <FormattedMessage id="ACCOUNT_ACTIVE" defaultMessage="Đang hoạt động" />
          </Tag>
        );
      case true:
        return (
          <Tag className="text-center" color="#f50">
            <FormattedMessage id="ACCOUNT_BLOCKED" defaultMessage="Bị khoá" />
          </Tag>
        );
      default:
        return null;
    }
  };
  return getStatusTitle(status);
};

export const renderWalletStatus = (status) => {
  const getStatusTitle = (value) => {
    switch (value) {
      case WALLET_STATUS_VALUES.ACTIVE:
        return (
          <Tag className="text-center" color="#108ee9">
            <FormattedMessage id="WALLET_ACTIVE" defaultMessage="Đang hoạt động" />
          </Tag>
        );
      case WALLET_STATUS_VALUES.INACTIVE:
        return (
          <Tag className="text-center" color="#f50">
            <FormattedMessage id="WALLET_INACTIVE" defaultMessage="Bị khoá" />
          </Tag>
        );
      default:
        return null;
    }
  };
  return getStatusTitle(status);
};

export const renderOrderStatus = (status) => {
  const localizeTitle = (value) => {
    return getObject(
      ORDER_STATUSES.find((item) => item.value === value),
      'label'
    );
  };

  const getStatusTitle = (value) => {
    switch (value) {
      case ORDER_STATUS_VALUES.DELIVERED:
        return (
          <Tag className="text-center" color="#108ee9">
            {localizeTitle(value)}
          </Tag>
        );
      case ORDER_STATUS_VALUES.WAITING_APPROVAL:
        return (
          <Tag className="text-center" color="#ffaf40">
            {localizeTitle(value)}
          </Tag>
        );
      case ORDER_STATUS_VALUES.DELIVERING:
        return (
          <Tag className="text-center" color="#ffc107">
            {localizeTitle(value)}
          </Tag>
        );
      case ORDER_STATUS_VALUES.CANCELED:
        return (
          <Tag className="text-center" color="#f50">
            {localizeTitle(value)}
          </Tag>
        );
      case ORDER_STATUS_VALUES.CAN_NOT_DELIVER:
        return (
          <Tag className="text-center" color="##e67e22">
            {localizeTitle(value)}
          </Tag>
        );
      case ORDER_STATUS_VALUES.REJECTED:
        return (
          <Tag className="text-center" color="#D00B35">
            {localizeTitle(value)}
          </Tag>
        );
      case ORDER_STATUS_VALUES.WAITING_PACKING:
        return (
          <Tag className="text-center" color="#fa983a">
            {localizeTitle(value)}
          </Tag>
        );
      case ORDER_STATUS_VALUES.WAITING_DELIVER:
        return (
          <Tag className="text-center" color="#BDC581">
            {localizeTitle(value)}
          </Tag>
        );
      default:
        return null;
    }
  };
  return getStatusTitle(status);
};

export const renderTransactionType = (status) => {
  const localizeTitle = (value) => {
    return getObject(
      TRANSACTION_TYPES.find((item) => item.value === value),
      'label'
    );
  };

  return localizeTitle(status);
};

export const PRODUCT_STATUS_VALUES = {
  ACTIVATED: 'ACTIVATED',
  DEACTIVATED: 'DEACTIVATED',
  WAITING_FOR_APPROVAL: 'WAITING_FOR_APPROVAL',
  REJECTED: 'REJECTED'
};

export const PRODUCT_STATUSES = [
  {
    value: PRODUCT_STATUS_VALUES.ACTIVATED,
    label: <FormattedMessage id="PRODUCT_STATUS_ACTIVE" defaultMessage="Đang hoạt động" />,
    color: '#108ee9'
  },
  {
    value: PRODUCT_STATUS_VALUES.DEACTIVATED,
    label: <FormattedMessage id="PRODUCT_STATUS_DEACTIVE" defaultMessage="Ngưng hoạt động" />,
    color: '#6c757d'
  },
  {
    value: PRODUCT_STATUS_VALUES.WAITING_FOR_APPROVAL,
    label: <FormattedMessage id="PRODUCT_STATUS_WAITING_FOR_APPROVAL" defaultMessage="Đang chờ duyệt" />,
    color: '#ffc107'
  },
  {
    value: PRODUCT_STATUS_VALUES.REJECTED,
    label: <FormattedMessage id="PRODUCT_STATUS_REJECTED" defaultMessage="Bị từ chối" />,
    color: '#D00B35'
  }
];

export const RENDER_PRODUCT_STATUSES_TAG = (status) => {
  let curr = _.find(PRODUCT_STATUSES, ({ value }) => value === status);
  if (curr) {
    return (
      <Tag className="text-center mr-0" color={curr.color}>
        {curr.label}
      </Tag>
    );
  }
  return null;
};

export const renderCampaignStatus = (status) => {
  const localizeTitle = (value) => {
    return getObject(
      CAMPAIGN_STATUSES.find((item) => item.value === value),
      'label'
    );
  };

  const getStatusTitle = (value) => {
    switch (value) {
      // case ORDER_STATUS_VALUES.DELIVERED: return <Tag className='text-center' color="#108ee9">{localizeTitle(value)}</Tag>
      case CAMPAIGN_STATUS_VALUES.WAITING_FOR_APPROVAL:
        return (
          <Tag className="text-center" color="#ffaf40">
            {localizeTitle(value)}
          </Tag>
        );
      case CAMPAIGN_STATUS_VALUES.ACCEPTED:
        return (
          <Tag className="text-center" color="#ffc107">
            {localizeTitle(value)}
          </Tag>
        );
      case CAMPAIGN_STATUS_VALUES.EXPIRED:
        return (
          <Tag className="text-center" color="#f50">
            {localizeTitle(value)}
          </Tag>
        );
      case CAMPAIGN_STATUS_VALUES.RUNNING:
        return (
          <Tag className="text-center" color="#e67e22">
            {localizeTitle(value)}
          </Tag>
        );
      case CAMPAIGN_STATUS_VALUES.APPROVED:
        return (
          <Tag className="text-center" color="#108ee9">
            {localizeTitle(value)}
          </Tag>
        );
      case CAMPAIGN_STATUS_VALUES.REJECTED:
        return (
          <Tag className="text-center" color="#D00B35">
            {localizeTitle(value)}
          </Tag>
        );
      // case CAMPAIGN_STATUS_VALUES.FULFILLED: return <Tag className='text-center' color="#fa983a">{localizeTitle(value)}</Tag>
      // case CAMPAIGN_STATUS_VALUES.REQUESTED_RETURN: return <Tag className='text-center' color="#BDC581">{localizeTitle(value)}</Tag>
      default:
        return null;
    }
  };
  return getStatusTitle(status);
};
