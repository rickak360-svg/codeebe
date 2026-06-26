export function formatInr(amount: number): string {
  if (amount >= 100_000) {
    return `₹${(amount / 100_000).toFixed(1).replace(/\.0$/, '')}L`;
  }
  if (amount >= 1_000) {
    return `₹${(amount / 1_000).toFixed(0)}K`;
  }
  return `₹${amount}`;
}
