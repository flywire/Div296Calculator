// calc.js
function div296Calc({ tsb_start, tsb_end, after_tax_contrib, withdrawals }) {
  if (tsb_end <= 3000000) {
    return {
      taxable: "No, Total Super Balance ≤ $3M",
      earnings: null,
      proportion_percent: null,
      taxable_earnings: null,
      div296_tax: null,
    };
  }
  const greater_start_or_3m = Math.max(tsb_start, 3000000);
  const earnings = tsb_end - greater_start_or_3m - after_tax_contrib + withdrawals;
  if (earnings <= 0) {
    return {
      taxable: "No Division 296 taxable earnings",
      earnings,
      proportion_percent: null,
      taxable_earnings: null,
      div296_tax: null,
    };
  }
  const proportion_percent = Math.round(((tsb_end - 3000000) / tsb_end) * 10000) / 100;
  const taxable_earnings = Math.round(earnings * (proportion_percent / 100));
  const div296_tax = Math.round(taxable_earnings * 0.15);
  return {
    taxable: "Yes",
    earnings,
    proportion_percent,
    taxable_earnings,
    div296_tax,
  };
}
module.exports = { div296Calc };
