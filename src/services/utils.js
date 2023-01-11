export function currencyFormat(num = 0) {
  return parseFloat(num)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
