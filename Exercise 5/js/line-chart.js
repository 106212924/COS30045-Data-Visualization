// Load and format the line chart data[cite: 43]
d3.csv("data/ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year, // Converts string year to number[cite: 42, 43]
        averagePrice: +d["Average Price (notTas-Snowy)"] // Target the exact column header[cite: 42]
    };
}).then(data => {
    console.log(data); // Verify data loads correctly in the console[cite: 43]
    drawLineChart(data);
});

// Set up function and margins[cite: 44]
function drawLineChart(data) {
    // Use the exact same margins as Exercise 5.1 so the charts are the same size[cite: 44]
    const margin = { top: 40, right: 170, bottom: 25, left: 40 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the svg container[cite: 45]
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Create the innerChart[cite: 45]
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create the x and y scales for continuous data[cite: 44]
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year)) // Finds min and max in one go[cite: 44]
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);

    // Setup the Axes[cite: 45]
    // Format ticks as integers using "d" so years don't get decimals or commas[cite: 45]
    const bottomAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")); 
    const leftAxis = d3.axisLeft(yScale);

    // Add axes to the innerChart[cite: 45]
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`) 
        .call(bottomAxis);

    innerChart
        .append("g")
        .call(leftAxis);

    // Draw the Scatter Plot (Circles)[cite: 46]
    innerChart
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 4) // Radius of the circle[cite: 46]
        .attr("cx", d => xScale(d.year)) // X coordinate[cite: 46]
        .attr("cy", d => yScale(d.averagePrice)) // Y coordinate[cite: 46]
        .attr("fill", "green"); //[cite: 46]

    // Generate line coordinates[cite: 47]
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    // Draw the line (Path)[cite: 48]
    innerChart
        .append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none") // Must be none so it doesn't try to fill the space under the curve[cite: 48]
        .attr("stroke", "green"); //[cite: 48]
}