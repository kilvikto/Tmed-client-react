import moment from 'moment';

export const setValidDateFormat = (value: any) => moment(value).format("YYYY-MM-DD");