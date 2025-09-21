
// ---------------- Helper for data ----------------
const selectRows = (state) => state.data.rows;

// Count of vehicles in WA
export const selectWaCount = (state) =>
  selectRows(state).filter((r) => (r['State'] || '').toString().trim() === 'WA').length;

// Brand counts
export const selectBrandCounts = (state) =>
  selectRows(state).reduce((acc, r) => {
    const k = (r['Make'] || '').toString().trim();
    if (!k) return acc;
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

// Most sold brand
export const selectMostSoldBrand = (state) => {
  const bc = selectBrandCounts(state);
  return Object.keys(bc).reduce((a, b) => (bc[a] || 0) > (bc[b] || 0) ? a : b, '');
};

// Year count data
export const selectYearCountData = (state) => {
  const map = selectRows(state).reduce((acc, r) => {
    const y = r['Model Year'];
    if (!y) return acc;
    acc[y] = (acc[y] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(map)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([year, count]) => ({ year, count }));
};

// Year range and growth
export const selectYearRangeAndGrowth = (state) => {
  const list = selectYearCountData(state);
  if (list.length < 2) return { range: '', growth: 0 };
  const years = list.map((x) => Number(x.year));
  const startYear = years[0];
  const endYear = years[years.length - 1];
  const startCount = list[0].count;
  const endCount = list[list.length - 1].count;
  const n = Math.max(1, endYear - startYear);
  const growth = ((endCount / startCount) ** (1 / n) - 1) * 100;
  return { range: `${startYear} - ${endYear}`, growth: Number(growth.toFixed(2)) };
};

// CAFV data
export const selectCafvData = (state) => {
  const rows = selectRows(state);
  const E = 'Clean Alternative Fuel Vehicle Eligible';
  const U = 'Eligibility unknown as battery range has not been researched';
  const N = 'Not eligible due to low battery range';
  return [
    { name: 'Eligible', value: rows.filter((r) => r['Clean Alternative Fuel Vehicle (CAFV) Eligibility'] === E).length },
    { name: 'Unknown', value: rows.filter((r) => r['Clean Alternative Fuel Vehicle (CAFV) Eligibility'] === U).length },
    { name: 'Not Eligible', value: rows.filter((r) => r['Clean Alternative Fuel Vehicle (CAFV) Eligibility'] === N).length },
  ];
};

// City count data
export const selectCityCountData = (state) => {
  const map = selectRows(state).reduce((acc, r) => {
    const c = (r['City'] || '').toString().trim();
    if (!c) return acc;
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(map).map(([city, count]) => ({ city, count }));
};

// EV Type data
export const selectEvTypeData = (state) => {
  const rows = selectRows(state);
  const BEV = rows.filter((r) => r['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)').length;
  const PHEV = rows.filter((r) => r['Electric Vehicle Type'] === 'Plug-in Hybrid Electric Vehicle (PHEV)').length;
  return [
    { name: 'BEV', value: BEV },
    { name: 'PHEV', value: PHEV },
  ];
};

// Brand line data
export const selectBrandLineData = (state) =>
  Object.entries(selectBrandCounts(state)).map(([make, count]) => ({ make, count }));

// Top model distribution
export const selectTopModelDistribution = (state) => {
  const counts = selectRows(state).reduce((acc, r) => {
    const brand = (r['Make'] || '').toString().trim();
    const model = (r['Model'] || '').toString().trim();
    if (!brand || !model) return acc;
    const key = `${brand} ${model}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const total = Object.values(counts).reduce((s, n) => s + n, 0) || 1;
  return Object.entries(counts)
    .map(([k, c]) => ({ brandModel: k, count: c, percentage: Number(((c / total) * 100).toFixed(2)) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

// Map points
export const selectMapPoints = (state) =>
  selectRows(state)
    .map((r) => ({
      city: r['City'],
      location: r['Vehicle Location'],
      lat: parseFloat(r['Latitude']),
      lng: parseFloat(r['Longitude']),
    }))
    .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng));
