// Set up dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;   // Total width of the chart
const height = 400;  // Total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Set up inner chart variable for scatterplot
let innerChartS;

// Set up tooltip dimensions (used in Exercise 6.4)
const tooltipWidth = 200;
const tooltipHeight = 56;

// Set up colors accessible globally
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// Set up the histogram scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Set up the scatterplot scales and color scale
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

// Create a bin generator using d3.bin
// Fixed domain and thresholds so the 14 bins (0-200, 200-400 ... 2600-2800)
// stay identical when the data is filtered
const binGenerator = d3.bin()
  .value(d => d.energyConsumption)       // Accessor for energyConsumption
  .domain([0, 2800])
  .thresholds(d3.range(200, 2800, 200)); // 200, 400, ... 2600

// Array of filter options for screen types
const filters_screen = [
  { id: "all",  label: "All",  isActive: true },
  { id: "LED",  label: "LED",  isActive: false },
  { id: "LCD",  label: "LCD",  isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];