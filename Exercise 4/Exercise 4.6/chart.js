// Load, format, and sort the dataset
d3.csv("data/BrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count 
  };
}).then(data => {
  // Sort data highest to lowest
  data.sort((a, b) => b.count - a.count);
  drawBarChart(data);
});

// Bind data to SVG groups and draw the bars with labels
function drawBarChart(data) {
  const svg = d3.select("svg");
  
  const xScale = d3.scaleLinear()
    .domain([0, 1200])
    .range([0, 400]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 1600])
    .padding(0.1);

  // Step 2: Create a group container for the bars and labels[cite: 25]
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    // Move the entire group down the y-axis according to the scale[cite: 25]
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Step 3: Add back the rectangles inside the group[cite: 26]
  barAndLabel
    .append("rect")
    .attr("class", d => "bar bar-" + d.count)
    .attr("width", d => xScale(d.count)) 
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    // Step 1: Shift the bars 100px to the right to make room for labels[cite: 24]
    .attr("x", 100) 
    // Set y-axis to 0 because the group handles the vertical positioning[cite: 26]
    .attr("y", 0); 

  // Step 4: Add the column category text (Brand Names)[cite: 27]
  barAndLabel
    .append("text")
    .text(d => d.brand)
    .attr("x", 90) // Position text just left of the bars
    .attr("y", 15)
    .attr("text-anchor", "end") // Right-align the text[cite: 28]
    .style("font-size", "13px");

  // Step 5: Add the value number (Counts)[cite: 28]
  barAndLabel
    .append("text")
    .text(d => d.count)
    // Dynamically calculate x position: 100px offset + bar width + 5px gap[cite: 28]
    .attr("x", d => 100 + xScale(d.count) + 5)
    .attr("y", 15)
    .style("font-size", "13px");
}