const width = 900; 
const height = 900; 
// Maybe language?
// let language = ...;

// Add an SVG to the div with the ID 'map' and then sets its height and width.
let svg = d3.select("#map")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .attr("preserveAspectRatio", "xMaxYMax")
              .attr("overflow", "scroll"); 

// Get the map- and TREE-data and check if everything worked. Then use the drawMap function to render the map.
d3.queue()
  // This one is the Swiss-Map-Geo-Data
  .defer(d3.json, "https://data.geo.admin.ch/ch.bafu.landesforstinventar-kantone/landesforstinventar-kantone/landesforstinventar-kantone_2056.geojson")
  
  // This one is the TREE-Data
  .defer(d3.csv, "https://raw.githubusercontent.com/CptMeh/OpenData/ramon/D3.js_implementation/Daten/currated_data.csv")

  // Geting the labels for the TREE-Data
  .defer(d3.csv, "https://raw.githubusercontent.com/CptMeh/OpenData/ramon/D3.js_implementation/Daten/labels.csv")


  .defer(d3.csv, "https://raw.githubusercontent.com/CptMeh/OpenData/ramon/D3.js_implementation/Daten/labels_weighted.csv")

  // Wait till all the data is ready
  .await(function (error, map, data, labels, labels_weighted) {
      if (error) {
        console.error("Somthing went wrong: " + error);
      } else {
        init(labels, labels_weighted, map, data)
      }
  }
);

function init(labels, labels_weighted, map, data) {
  addButtonChecks(labels, labels_weighted);
  drawMap(map, data);
}

