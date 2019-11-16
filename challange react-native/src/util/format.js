import numeral from 'numeral';
// i have to use NUMERAL to format prices
import 'numeral/locales/en-gb';

numeral.locale('en-gb');

export const formatPrice = num => `£ ${numeral(num).format('0,0.00')}`;
