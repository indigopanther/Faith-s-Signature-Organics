// Currency + small formatting helpers.

export function formatMoney(amount, currency = 'USD') {
  const n = Number(amount);
  if (!Number.isFinite(n)) return '';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    // Fallback if currency code is unknown
    return '$' + n.toFixed(2);
  }
}

// "1 product" / "6 products"
export function pluralize(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural || singular + 's'}`;
}
