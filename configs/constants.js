import moment from 'moment';
import { UtilDate } from '~/utils/helpers';

export const START_TIME = {
  CURRENT: moment().add(1, 'day').format(UtilDate.formatDateTimeServer),
  YEAR: moment().startOf('year').format(UtilDate.formatDateTimeServer),
  MONTH: moment().startOf('month').format(UtilDate.formatDateTimeServer),
  WEEK: moment().startOf('week').format(UtilDate.formatDateTimeServer),
  DAY: moment().startOf('day').format(UtilDate.formatDateTimeServer)
};

export const IMAGE_REGEX = /\.(jpg|jpeg|bmp|png|gif|tiff)$/i;
