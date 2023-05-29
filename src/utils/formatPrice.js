export function formatPrice(value) {
  return `${Math.round(value)}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
}
