// Load and format the data
d3.csv("data/Data_exercise_5.3.csv", d => {
    return {
        Screensize_Category: d.Screensize_Category, //[cite: 53]
        Count: +d.Count // Convert count to a number[cite: 53]
    };
}).then(data => {
    drawDonutChart(data);
});

function drawDonutChart(data) {
    // Set up chart dimensions[cite: 54]
    const width = 1000;
    const height = 500;
    // Calculate radius to fit the shortest side, minus 20px padding[cite: 54]
    const radius = Math.min(width, height) / 2 - 20; 

    // Create color scale[cite: 55]
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screensize_Category))
        .range(d3.schemeSet2); 

    // Calculate angles for each slice[cite: 55]
    const pie = d3.pie()
        .value(d => d.Count)
        .sort(null); // Disable sorting to maintain original data order[cite: 55]

    // Set up the arcs (donut shape)[cite: 56]
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)  // Inner radius = 60% of available radius[cite: 56]
        .outerRadius(radius * 1)    // Outer radius = 100% of available radius[cite: 56]
        .padAngle(0.02)             // Optional: Adds a small gap between slices[cite: 57]
        .cornerRadius(6);           // Optional: Rounds the corners of the slices[cite: 57]

    // Create the svg container[cite: 56]
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black"); //[cite: 56]

    // Create inner chart centered in the SVG[cite: 56]
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width/2}, ${height/2})`); //[cite: 56]

    // Bind data and draw the donut chart paths[cite: 57]
    innerChart
        .selectAll("path")
        .data(pie(data)) // Pass data through the pie generator[cite: 57]
        .join("path")
        .attr("d", arcGenerator) // Use arc generator for the path "d" attribute[cite: 57]
        // Note: d3.pie() wraps data in a 'data' object, so we use d.data.Screensize_Category[cite: 57]
        .attr("fill", d => color(d.data.Screensize_Category)) 
        .attr("stroke", "white") //[cite: 57]
        .attr("stroke-width", 2); //[cite: 57]

    // Add labels to the center of each slice
    innerChart
        .selectAll("text")
        .data(pie(data))
        .join("text")
        .text(d => d.data.Screensize_Category)
        // Move the text to the exact centroid (middle) of its specific arc[cite: 58]
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`) 
        .attr("text-anchor", "middle")
        .style("font-size", "14px");
}