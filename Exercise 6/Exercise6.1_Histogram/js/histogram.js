const drawHistogram = (data) => {

  // ---- 1. SVG container and inner chart (Dufour & Meeks) ----
  const svg = d3.select("#histogram")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`);

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // ---- 2. Create the bins ----
  const bins = binGenerator(data);
  console.log(bins); // Should be 14 arrays (one per bin)

  // ---- 3. Lower/upper bounds for the scales ----
  const minEng = bins[0].x0;                         // lower bound of the first bin
  const maxEng = bins[bins.length - 1].x1;           // upper bound of the last bin
  const binsMaxLength = d3.max(bins, d => d.length); // tallest bin
  console.log("minEng:", minEng, "maxEng:", maxEng, "binsMaxLength:", binsMaxLength);

  // ---- 4. Set domains and ranges ----
  xScale
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

  yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice(); // round y-axis values to a human-readable format

  // ---- 5. Draw the bars ----
  innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => xScale(d.x1) - xScale(d.x0))
      .attr("height", d => innerHeight - yScale(d.length))
      .attr("fill", barColor)
      .attr("stroke", bodyBackgroundColor) // gives the appearance of a gap between bars
      .attr("stroke-width", 2);

  // ---- 6. Axes ----
  const bottomAxis = d3.axisBottom(xScale)
    .ticks(14)
    .tickFormat(d3.format(","));

  innerChart
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  const leftAxis = d3.axisLeft(yScale)
    .tickFormat(d3.format(","));

  innerChart
    .append("g")
    .attr("class", "axis")
    .call(leftAxis);

  // ---- 7. Axis labels ----
  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", margin.left)
    .attr("y", margin.top - 20)
    .text("Frequency");

  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", width - margin.right)
    .attr("y", height - 8)
    .attr("text-anchor", "end")
    .text("Labeled Energy Consumption (kWh/year)");
};