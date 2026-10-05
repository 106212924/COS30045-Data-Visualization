// Step 2: Apply a style to an HTML element using D3
d3.select("h1")
  .style("color", "green");

// Step 3: Append a paragraph to the container div using D3
d3.select(".container")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!")
  .style("font-weight", "bold")
  .style("color", "#15803d");

// Step 4: Append an SVG rectangle with D3
d3.select("#d3-canvas")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "green");