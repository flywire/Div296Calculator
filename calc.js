// calc.js
function div296Calc({ tsb_start, tsb_end, after_tax_contrib, withdrawals }) {
  if (tsb_end <= 3000000) {
    return {
      earnings: null,
      proportion_percent: null,
      taxable_earnings: null,
      div296_tax: null,
      comment: "No Division 296 tax applies (TSB End ≤ $3m)"
    };
  }
  const greater_start_or_3m = Math.max(tsb_start, 3000000);
  const earnings = tsb_end - greater_start_or_3m - after_tax_contrib + withdrawals;
  if (earnings <= 0) {
    return {
      earnings,
      proportion_percent: null,
      taxable_earnings: null,
      div296_tax: null,
      comment: "No Division 296 taxable earnings"
    };
  }
  const proportion_percent = Math.round(((tsb_end - 3000000) / tsb_end) * 10000) / 100;
  const taxable_earnings = Math.round(earnings * (proportion_percent / 100));
  const div296_tax = Math.round(taxable_earnings * 0.15);
  return {
    earnings,
    proportion_percent,
    taxable_earnings,
    div296_tax,
    comment: ""
  };
}
module.exports = { div296Calc };
