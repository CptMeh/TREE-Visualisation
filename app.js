const vocab = languageSelect();

// Source of geo data for map of Switzerland
const backupURL = "https://raw.githubusercontent.com/CptMeh/TREE-Visualisation/main/data/geo-data/landesforstinventar-kantone_2056.geojson"
const geoDataURL = "./data/geo-data/landesforstinventar-kantone_2056.geojson"

// Source for the Currated Tree2 data
const backupdTreeURL = "https://raw.githubusercontent.com/CptMeh/TREE-Visualisation/main/data/study-data/currated_data.csv"
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
  prepareData(geoData, treeData);

  let map = new Map(geoData, 1, 930, 650, vocab);
  map.drawMap()
 
  // Dropdown menues
  addWaveDropdown(map);
  addVarSelection(map);

  // HTML text
  HTMLtitle();
  HTMLbanner();
  HTMLdescription();
  HTMLfooter();
}

