// Use the exact filename from your data folder
d3.csv("data/BrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count // Converts string to number
  };
}).then(data => {
  
  // Print dataset information to the console
  console.log("Original Array:", data);
  console.log("Dataset Length:", data.length);
  console.log("Max Count:", d3.max(data, d => d.count));
  console.log("Min Count:", d3.min(data, d => d.count));
  console.log("Extent:", d3.extent(data, d => d.count));

  // Sort data highest to lowest
  data.sort((a, b) => b.count - a.count);
  
  // Pass data to charting function
  drawBarChart(data);
});

// Scaffold function for Exercise 4.5
function drawBarChart(data) {
  console.log("Data successfully passed to charting function:", data);
}