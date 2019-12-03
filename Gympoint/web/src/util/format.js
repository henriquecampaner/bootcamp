import { parseISO, format } from 'date-fns';

export const { format: formatPrice } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'GBP',
});

export function formatDuration(duration) {
  const durationFormatted =
    duration > 1 ? `${duration} meses` : `${duration} mês`;

  return durationFormatted;
}

export function formatDate(date) {
  return format(parseISO(date), 'dd/MM/yyyy');
}
