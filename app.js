// Maybe language?
// let language = ...;

// Get the map- and TREE-data and check if everything worked. Then use the drawMap function to render the map.
d3.queue()
  // This one is the Swiss-Map-Geo-Data
  .defer(d3.json, "https://data.geo.admin.ch/ch.bafu.landesforstinventar-kantone/landesforstinventar-kantone/landesforstinventar-kantone_2056.geojson")
  
  // This one is the TREE-Data
  .defer(d3.csv, "https://raw.githubusercontent.com/CptMeh/OpenData/ramon/D3.js_implementation/Daten/currated_data.csv")

  // Wait till all the data is ready
  .await(function (error, geoData, treeData) {
    if (error) {
      console.error("Somthing went wrong: " + error);
    } else {
      init(geoData, treeData)
    }
  }
);

function init(geoData, treeData) {
  //addButtonChecks(labels, labels_weighted);
  combineData(geoData, treeData);
  addDropdown();

  drawMap(geoData);
  console.log("Geo Data:")
  console.log(geoData)

}

