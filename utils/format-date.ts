import {format} from 'date-fns';

export function formatISO(date: Date): string | null {
  return !isNaN(date?.getTime()) ? format(date, 'yyyy-MM-dd HH:mm') : null;
}
