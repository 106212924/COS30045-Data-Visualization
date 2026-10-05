const drawScatterplot = (data) => {

  // ---- 1. SVG container (responsive) and inner chart ----
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`); // Responsive SVG

  // innerChartS is declared in shared-constants.js, so NO const here
  innerChartS = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // ---- 2. x and y scales (the scales themselves live in shared-constants.js) ----
  const maxStar = d3.max(data, d => d.star);              // max star rating
  const maxEng = d3.max(data, d => d.energyConsumption);  // max energy consumption

  xScaleS
    .domain([0, maxStar])
    .range([0, innerWidth]);

  yScaleS
    .domain([0, maxEng])
    .range([innerHeight, 0])
    .nice();

  // ---- 3. Colour scale (one hue per screen type) ----
  colorScale
    .domain(data.map(d => d.screenTech)) // unique screenTech values
    .range(d3.schemeCategory10);         // predefined colour scheme

  // ---- 4. Draw the circles ----
  innerChartS
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("r", 3)
      .attr("cx", d => xScaleS(d.star))
      .attr("cy", d => yScaleS(d.energyConsumption))
      .attr("fill", d => colorScale(d.screenTech))
      .attr("opacity", 0.5); // less opaque so overlapping points are visible

  // ---- 5. Axes ----
  const bottomAxis = d3.axisBottom(xScaleS)
    .ticks(maxStar);

  innerChartS
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  const leftAxis = d3.axisLeft(yScaleS)
    .tickFormat(d3.format(","));

  innerChartS
    .append("g")
    .attr("class", "axis")
    .call(leftAxis);

  // ---- 6. Axis labels ----
  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", 10)
    .attr("y", margin.top - 20)
    .text("Labeled Energy Consumption (kWh/year)");

  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", width - margin.right)
    .attr("y", height - 8)
    .attr("text-anchor", "end")
    .text("Star Rating");

  // ---- 7. Legend (top right corner, attached to the svg) ----
  const legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 100}, ${margin.top})`);

  // Loop through the colour scale domain to create one legend row per screen type
  colorScale.domain().forEach((screenTech, i) => {

    // A group for each legend entry, spaced 20px apart
    const legendRow = legend
      .append("g")
      .attr("transform", `translate(0, ${i * 20})`);

    // Coloured rectangle
    legendRow.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", colorScale(screenTech));

    // Label text to the right of the rectangle
    legendRow.append("text")
      .attr("x", 20)
      .attr("y", 5)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle")
      .text(screenTech);
  });
};