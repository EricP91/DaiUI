import {formatISO} from 'utils/format-date';

export function DateValueFormatter(params: {value: string}): string | null {
  return params?.value ? formatISO(new Date(params?.value)) : '';
}
