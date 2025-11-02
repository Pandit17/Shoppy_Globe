export default function formatCurrency(num) {
  if (typeof num !== "number") num = Number(num) || 0;
  return "₹" + num.toFixed(2);
}
