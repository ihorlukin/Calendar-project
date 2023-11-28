import moment from "moment";

export const isCurrentDay = (day) => moment().isSame(day, 'day');
export const isSelectedMonth = (day,today) => today.isSame(day, 'month');
export const isDayContainCurrentTimestamp = (a,b) => a >= b.startOf('day').format('X')
  && a <= b.clone().endOf('day').format('X');
const isDayContainCurrentEvent = (event,dayItem) => isDayContainCurrentTimestamp(event.date, dayItem);
export default isDayContainCurrentEvent;