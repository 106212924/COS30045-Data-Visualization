
d3.csv("data/BrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count 
  };
}).then(data => {

  data.sort((a, b) => b.count - a.count);
  
  drawBarChart(data);
});

function drawBarChart(data) {
  const barHeight = 20; 
  const spacing = 5; 

  const svg = d3.select("svg");

  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => "bar bar-" + d.count)
    .attr("width", d => d.count) 
    .attr("height", barHeight)
    .attr("fill", "blue")
    .attr("x", 0) 
    .attr("y", (d, i) => i * (barHeight + spacing)); 
}