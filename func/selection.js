let container = d3.select("#wave-select");

function addWaveDropdown() {
  // Create the dropdown select element
  const dropdown = container.append("select")
                            .attr("id", "wave-dropdown-button")
                            .attr("class", "wave-dropdown btn btn-secondary btn-lg btn-block")
                            .attr("label", "Select Wave")
                            .on("change", function() { setWave(this.value) });

// Add options to the dropdown
  dropdown.selectAll("option")
          .data([1, 2, 3])
          .enter()
          .append("option")
          .attr("value", d => d)
          .text(d => vocab["wave"][lang] + " " + d);

  setWave(1);
}