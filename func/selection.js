let container = d3.select("#wave-select");

function addWaveDropdown(map) {
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
          .text(d => vocab["survey wave"][lang] + " " + d);
}

function addVarSelection(map) {
    const varSelect = container.append("select")
                                .attr("id", "wave-dropdown-button")
                                .attr("class", "wave-dropdown btn btn-secondary btn-lg btn-block")
                                .attr("label", "Select Variable")
                                .on("change", function() {map.setSelected(this.value); map.drawMap();});

    varSelect.selectAll("option")
              .data(["BB", "AB", "ZL", "NIA"])
              .enter()
              .append("option")
              .attr("value", d => d)
              .text(d => vocab[d][lang]);

}

