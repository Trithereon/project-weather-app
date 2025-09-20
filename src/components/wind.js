// Wind data formatting module.

// Convert numerical value to cardinal points.
export function formatWindDir(data) {
  const windDir = Number(data);
  // Assign cardinal labels to ranges of numerical values.
  const directions = [
    { range: [348.75, 360], label: "N" },
    { range: [0, 11.25], label: "N" },
    { range: [11.25, 33.75], label: "NNE" },
    { range: [33.75, 56.25], label: "NE" },
    { range: [56.25, 78.75], label: "ENE" },
    { range: [78.75, 101.25], label: "E" },
    { range: [101.25, 123.75], label: "ESE" },
    { range: [123.75, 146.25], label: "SE" },
    { range: [146.25, 168.75], label: "SSE" },
    { range: [168.75, 191.25], label: "S" },
    { range: [191.25, 213.75], label: "SSW" },
    { range: [213.75, 236.25], label: "SW" },
    { range: [236.25, 258.75], label: "WSW" },
    { range: [258.75, 281.25], label: "W" },
    { range: [281.25, 303.75], label: "WNW" },
    { range: [303.75, 326.25], label: "NW" },
    { range: [326.25, 348.75], label: "NNW" },
  ];

  // Find where the input value fits and return corresponding label.
  for (const dir of directions) {
    if (windDir >= dir.range[0] && windDir < dir.range[1]) {
      return dir.label;
    }
  }
}
