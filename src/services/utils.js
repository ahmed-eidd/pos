export function currencyFormat(num = 0) {
  const formatedNum = parseFloat(num)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (formatedNum === 'NaN') return 0;
  return formatedNum;
}
