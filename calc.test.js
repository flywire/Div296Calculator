const { div296Calc } = require('./calc');

test('Example 1.1: Keny', () => {
  const r = div296Calc({ tsb_start: 150000, tsb_end: 165000, after_tax_contrib: 0, withdrawals: 0 });
  expect(r.comment).toMatch(/No Division 296 tax applies/);
});

test('Example 1.2: Jess', () => {
  const r = div296Calc({ tsb_start: 4000000, tsb_end: 4500000, after_tax_contrib: 23375, withdrawals: 0 });
  expect(r.earnings).toBe(477000);
  expect(r.proportion_percent).toBeCloseTo(33.33, 2);
  expect(r.taxable_earnings).toBe(158999);
  expect(r.div296_tax).toBe(23850);
  expect(r.comment).toBe("");
});

test('Example 1.3: Melanie', () => {
  const r = div296Calc({ tsb_start: 3700000, tsb_end: 4100000, after_tax_contrib: 300000, withdrawals: 250000 });
  expect(r.earnings).toBe(350000);
  expect(r.proportion_percent).toBeCloseTo(26.83, 2);
  expect(r.taxable_earnings).toBe(93905);
  expect(r.div296_tax).toBe(14086);
  expect(r.comment).toBe("");
});

test('Example 1.4: MG', () => {
  const r = div296Calc({ tsb_start: 2800000, tsb_end: 3200000, after_tax_contrib: 0, withdrawals: 0 });
  expect(r.earnings).toBe(200000);
  expect(r.proportion_percent).toBeCloseTo(6.25, 2);
  expect(r.taxable_earnings).toBe(12500);
  expect(r.div296_tax).toBe(1875);
  expect(r.comment).toBe("");
});

test('Example 1.5: Lin', () => {
  const r = div296Calc({ tsb_start: 2800000, tsb_end: 3200000, after_tax_contrib: 300000, withdrawals: 0 });
  expect(r.earnings).toBe(-100000);
  expect(r.comment).toMatch(/No Division 296 taxable earnings/);
});

test('Example 1.6: Jamal', () => {
  const r = div296Calc({ tsb_start: 3200000, tsb_end: 2800000, after_tax_contrib: 0, withdrawals: 0 });
  expect(r.comment).toMatch(/No Division 296 tax applies/);
});

test('Example 1.7: Jacob', () => {
  const r = div296Calc({ tsb_start: 9000000, tsb_end: 8000000, after_tax_contrib: 0, withdrawals: 150000 });
  expect(r.earnings).toBe(-850000);
  expect(r.comment).toMatch(/No Division 296 taxable earnings/);
});
