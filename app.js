const vocab = languageSelect();

// Source of geo data for map of Switzerland
const backupURL = "https://data.geo.admin.ch/ch.bafu.landesforstinventar-kantone/landesforstinventar-kantone/landesforstinventar-kantone_2056.geojson"
const geoDataURL = "./landesforstinventar-kantone_2056.geojson"

// Source for the Currated Tree2 data
const backupdTreeURL = "https://raw.githubusercontent.com/CptMeh/OpenData/ramon/D3.js_implementation/Daten/currated_data.csv"
const treeDataURL = "./data/study-data/currated_data.csv"
createAll(geoDataURL, treeDataURL, backupURL)


function createAll(geoDataURL, treeDataURL, backupURL) {
  // Get the map- and TREE-data and check if everything worked. Then use the drawMap function to render the map.
  d3.json(geoDataURL).then(function(geoData) {
    // GeoJSON data loaded successfully
    d3.csv(treeDataURL).then(function(treeData) {
      // CSV data loaded successfully
      init(geoData, treeData);
    }).catch(function(error) {
      console.error("Something went wrong loading the tree data: " + error);
    });
  });
}

function init(geoData, treeData) {
  console.log(geoData)
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