// ===================== Filters (Exercise 6.2) =====================
const populateFilters = (data) => {

  // ---- Update the histogram based on the selected filter ----
  const updateHistogram = (filterId, data) => {

    // 1. Filter the data (don't filter if the id is "all")
    const updatedData = filterId === "all"
      ? data
      : data.filter(tv => tv.screenTech === filterId);

    // 2. Re-bin the filtered data
    const updatedBins = binGenerator(updatedData);

    // 3. Update the bars with a transition
    d3.selectAll("#histogram rect")
      .data(updatedBins)
      .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));
  };

  // ---- Add the filter buttons ----
  d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .text(d => d.label)

      .on("click", (e, d) => {
        console.log("Clicked filter:", e);
        console.log("Clicked filter data:", d);

        // If the clicked filter is not already active, update the filter states
        if (!d.isActive) {

          // make sure only the button clicked is active
          filters_screen.forEach(filter => {
            filter.isActive = d.id === filter.id ? true : false;
          });

          // update the button styles based on which one was clicked
          d3.selectAll("#filters_screen .filter")
            .classed("active", filter => filter.id === d.id ? true : false);

          // update the histogram with the selected filter
          updateHistogram(d.id, data);
        }
      });
};


// ===================== Tooltip (Exercise 6.4) =====================

// Build the tooltip (a group containing a rectangle and text), hidden at first
const createTooltip = () => {

  const tooltip = innerChartS
    .append("g")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("pointer-events", "none");

  tooltip
    .append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", barColor)
    .attr("fill-opacity", 0.85);

  // Three lines of text: brand, model, screen size
  ["tt-brand", "tt-model", "tt-size"].forEach((cls, i) => {
    tooltip
      .append("text")
      .attr("class", cls)
      .text("NA")
      .attr("x", tooltipWidth / 2)
      .attr("y", 16 + i * 16)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "white")
      .style("font-size", i === 0 ? "13px" : "11px")
      .style("font-weight", i === 0 ? 900 : 400);
  });
};

const handleMouseEvents = () => {

  innerChartS.selectAll("circle")

    .on("mouseenter", (e, d) => {
      d3.select(".tt-brand").text(d.brand);
      d3.select(".tt-model").text(d.model);
      d3.select(".tt-size").text(`${d.screenSize}" · ${d.screenTech}`);

      const cx = +e.target.getAttribute("cx");
      const cy = +e.target.getAttribute("cy");

      // Show above the circle, but flip below it for dots near the top of the chart
      const ty = cy < tooltipHeight + 15 ? cy + 15 : cy - tooltipHeight - 10;

      // Keep the box inside the chart horizontally
      const tx = Math.max(0, Math.min(innerWidth - tooltipWidth, cx - 0.5 * tooltipWidth));

      d3.select(".tooltip")
        .attr("transform", `translate(${tx}, ${ty})`)
        .transition()
          .duration(200)
          .style("opacity", 1);
    })

    .on("mouseleave", () => {
      d3.select(".tooltip")
        .interrupt()
        .style("opacity", 0)
        .attr("transform", `translate(0, 500)`);
    });
};