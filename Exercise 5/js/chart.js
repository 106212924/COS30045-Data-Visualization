// Load the data from your data folder[cite: 33]
d3.csv("data/Data_exercise_5.1.csv", d => {
    return {
        // Update this key if your CSV column name differs[cite: 32]
        Screen_Tech: d.Screen_Tech.toUpperCase(),
        Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"] 
    };
}).then(data => {
    // Sort the energy consumption data highest to lowest[cite: 33]
    data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
    
    // Pass data to the drawing function[cite: 33]
    drawBarChart(data); 
});

function drawBarChart(data) {
    // Set up inner chart margins and dimensions[cite: 34]
    const margin = { top: 40, right: 170, bottom: 25, left: 40 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Add the svg container targeted to your div ID[cite: 34]
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Create inner chart group and apply margins[cite: 35]
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create the x scale (Band scale for categories)[cite: 35]
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .padding(0.1);

    // Create the y scale (Linear scale for numerical data)[cite: 35]
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Energy_Consumption)])
        // Range is inverted (innerHeight to 0) because SVG y-coordinates draw top-down[cite: 35, 37]
        .range([innerHeight, 0]); 

    // Calculate the x and y axes[cite: 36]
    const bottomAxis = d3.axisBottom(xScale);
    const leftAxis = d3.axisLeft(yScale);

    // Add axes to the innerChart group[cite: 36]
    innerChart
        .append("g")
        // Push the x-axis to the bottom of the inner chart[cite: 36]
        .attr("transform", `translate(0, ${innerHeight})`) 
        .call(bottomAxis);

    innerChart
        .append("g")
        .call(leftAxis);

    // Add y-axis label[cite: 36]
    innerChart
        .append("text")
        .text("Energy Consumption (kWh)")
        .attr("x", -margin.left)
        .attr("y", -10)
        .attr("text-anchor", "start")
        .style("font-size", "12px");

    // Draw bars[cite: 37]
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar") // Added for easier CSS styling and future interactivity[cite: 37]
        .attr("width", xScale.bandwidth())
        // Calculate height by subtracting the mapped y-value from the total innerHeight[cite: 37]
        .attr("height", d => innerHeight - yScale(d.Energy_Consumption)) 
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.Energy_Consumption))
        .attr("fill", "green");

    // Customization: Add value labels on top of bars[cite: 38]
    innerChart
        .selectAll(".label")
        .data(data)
        .join("text")
        .attr("class", "label")
        .text(d => Math.round(d.Energy_Consumption) + " kWh")
        // Center text in the middle of each bar bandwidth 
        .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
        // Shift text 5px above the top of the bar
        .attr("y", d => yScale(d.Energy_Consumption) - 5) 
        .attr("text-anchor", "middle")
        .style("font-size", "12px");
}