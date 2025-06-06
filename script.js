// Format input with thousands separator as user types
function formatInput(input) {
  let value = input.value.replace(/,/g, '').replace(/[^\d]/g, '');
  if (value === "") {
    input.value = "";
    return;
  }
  let intPart = value.replace(/^0+(?!$)/, '');
  input.value = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Helper to parse formatted input to float
function parseInput(id) {
  let val = document.getElementById(id).value.replace(/,/g, '');
  return parseFloat(val) || 0;
}

function calculateDiv296Tax() {
  const tsb_start = parseInput('tsb_start');
  const tsb_end = parseInput('tsb_end');
  const after_tax_contrib = parseInput('after_tax_contrib');
  const withdrawals = parseInput('withdrawals');

  let earnings = null, proportion_percent = null, taxable_earnings = null, div296_tax = null, taxable = "";

  // Rule 1: No Division 296 tax if TSB at end of year is $3M or less
  if (tsb_end <= 3000000) {
    taxable = "No, Total Super Balance ≤ $3M";
    showOutput({
      taxable: taxable,
      earnings: "—",
      proportion_percent: "—",
      taxable_earnings: "—",
      div296_tax: "—"
    });
    return;
  }

  // Step 1: Calculate Division 296 Earnings
  const greater_start_or_3m = Math.max(tsb_start, 3000000);
  earnings = tsb_end - greater_start_or_3m - after_tax_contrib + withdrawals;

  // Rule 2: No Division 296 tax if earnings are zero or negative
  if (earnings <= 0) {
    taxable = "No Division 296 taxable earnings";
    showOutput({
      taxable: taxable,
      earnings: formatAmount(earnings),
      proportion_percent: "—",
      taxable_earnings: "—",
      div296_tax: "—"
    });
    return;
  }

  // Step 2: Calculate Proportion above $3m (rounded to 2 decimal places as a percentage)
  proportion_percent = ((tsb_end - 3000000) / tsb_end) * 100;
  proportion_percent = Math.round(proportion_percent * 100) / 100;

  // Step 3: Calculate Division 296 Taxable Earnings
  taxable_earnings = Math.round(earnings * (proportion_percent / 100));

  // Step 4: Calculate Division 296 Tax (15%), rounded to nearest dollar
  div296_tax = Math.round(taxable_earnings * 0.15);

  taxable = "Yes";

  showOutput({
    taxable: taxable,
    earnings: formatAmount(earnings),
    proportion_percent: proportion_percent.toFixed(2) + "%",
    taxable_earnings: formatAmount(taxable_earnings),
    div296_tax: formatAmount(div296_tax)
  });
}

function showOutput(data) {
  document.getElementById('result').innerHTML = `
    <div class="grid-table">
      ${data.taxable ? `
      <div class="grid-row">
        <div class="grid-label">Taxable</div>
        <div class="grid-value">${data.taxable}</div>
      </div>` : ""}
      <div class="grid-row">
        <div class="grid-label">Earnings</div>
        <div class="grid-value">${data.earnings}</div>
      </div>
      <div class="grid-row">
        <div class="grid-label">Taxable Proportion (%)</div>
        <div class="grid-value">${data.proportion_percent}</div>
      </div>
      <div class="grid-row">
        <div class="grid-label">Taxable Earnings</div>
        <div class="grid-value">${data.taxable_earnings}</div>
      </div>
      <div class="grid-row">
        <div class="grid-label">Div 296 Tax</div>
        <div class="grid-value">${data.div296_tax}</div>
      </div>
    </div>
  `;
}

function formatAmount(val) {
  if (typeof val !== "number" || isNaN(val)) return "—";
  return Math.round(val).toLocaleString();
}
