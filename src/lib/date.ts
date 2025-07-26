import { format, isToday, isTomorrow, isYesterday, differenceInDays } from 'date-fns';

export const formatDate = (date: Date): string => {
  if (isToday(date)) {
    return 'Today';
  }
  if (isTomorrow(date)) {
    return 'Tomorrow';
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }

  const daysDiff = Math.abs(differenceInDays(new Date(), date));
  if (daysDiff <= 7) {
    return format(date, 'EEEE');
  }

  return format(date, 'MMM d, yyyy');
};

export const formatTime = (date: Date): string => {
  return format(date, 'h:mm a');
};

export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};
