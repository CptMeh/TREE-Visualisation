function addWaveDropdown(map) {
  const container = d3.select("#map");


  const dropdown = container.append("select")
                            .attr("id", "wave-dropdown-button")
                            .attr("class", "wave-dropdown btn btn-secondary btn-lg btn-block")
                            .attr("label", "Select Wave")
                            .on("change", function() { map.setWave(this.value) ; map.drawMap();});

  dropdown.selectAll("option")
          .data([1, 2, 3])
          .enter()
          .append("option")
          .attr("value", d => d)
          .text(d => vocab["survey wave"] + " " + d);
}

function addVarSelection(container, map) {
    const varSelect = container.append("select")
                                .attr("id", "dropdown-button")
                                .attr("class", "dropdown btn btn-secondary btn-lg btn-block")
                                .attr("label", "Select Variable")
                                .on("change", function() {map.setSelected(this.value); map.drawMap();});

    varSelect.selectAll("option")
              .data(["BB", "AB", "ZL", "NIA"])
              .enter()
              .append("option")
              .attr("value", d => d)
              .text(d => vocab[d]);

}

