const vocab = languageSelect();

// Source of geo data for map of Switzerland
geoDataURL = "https://data.geo.admin.ch/ch.bafu.landesforstinventar-kantone/landesforstinventar-kantone/landesforstinventar-kantone_2056.geojson"

// Source for the Currated Tree2 data
DataURL = "https://raw.githubusercontent.com/CptMeh/OpenData/ramon/D3.js_implementation/Daten/currated_data.csv"

createVisual(geoDataURL, DataURL)


function createVisual(geoDataURL, DataURL) {
  // Get the map- and TREE-data and check if everything worked. Then use the drawMap function to render the map.
  d3.queue()
    // This one is the Swiss-Map-Geo-Data
    .defer(d3.json, geoDataURL)
    
    // This one is the TREE-Data
    .defer(d3.csv, DataURL)

    // Wait till all the data is ready
    .await(function (error, geoData, treeData) {
      if (error) {
        console.error("Somthing went wrong: " + error);
        return;
      }
      init(geoData, treeData)
    }
  );
}

function init(geoData, treeData) {
  prepareData(geoData, treeData);

  let map = new Map(geoData, 1, 930, 650, vocab);
  map.drawMap()
 
  addWaveDropdown(map);
  addVarSelection(map);

}


d3.select("#descr")
  .html("<h2>" + vocab.descr[0] + "</h2>" 
        + "<h4 class='mt-5'>" + vocab.descr[1] + "</h4>" 
        + "<p>" + vocab.descr[2] + "</p>"
        + "<h4 class='mt-4'>" + vocab.descr[3] + "</h4>"
        + "<p>" + vocab.descr[4] + "</p>"
        + "<h4 class='mt-4'>" + vocab.descr[5] + "</h4>"
        + "<p>" + vocab.descr[6] + "</p>"
        + "<h4 class='mt-4'>" + vocab.descr[7] + "</h4>"
        + "<p>" + vocab.descr[8] + "</p>");