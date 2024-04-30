// Initialise the selected language (See languageSelect.js)
const vocab = languageSelect();

// Online URL for the geo data for map of Switzerland
const backupURL = "https://raw.githubusercontent.com/CptMeh/TREE-Visualisation/main/data/geo-data/landesforstinventar-kantone_2056.geojson"


const geoDataURL = "./data/geo-data/landesforstinventar-kantone_2056.geojson"

// Online URL Tree2 data. This takes the data from the git repo.
const backupdTreeURL = "https://raw.githubusercontent.com/CptMeh/TREE-Visualisation/main/data/study-data/currated_data.csv"

// Local URL for Tree2 data
const treeDataURL = "./data/study-data/currated_data.csv"

var maps = []

//createAll(geoDataURL, treeDataURL)
run(backupURL, backupdTreeURL)

/**
 * Creates the Visualisation of the data at the given URLs.
 * 
 * @param geoDataURL  String the URL to the Data source of the geo data
 * @param treeDataURL String the URL to the Data source of the study data
**/
function run(geoDataURL, treeDataURL) {
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

/**
 * Initialises all important parts of this Visualisation:
 * - Prepares the Map- and Tree2-Data to be visualised. 
 * - For each Study-Wave a separate map is generated.
 * - Initialises the selection menues for the selection of the waves.
 * - Dynamically generates the text of the Website in the chosen Language. 
 * 
 * @link languageSelect#HTMLtitle
 * @link languageSelect#HTMLbanner
 * @link languageSelect#HTMLdescrition
 * @link languageSelect#HTMLfooter
 * 
 * @param geoData  Array?? geojson data
 * @param treeData Array?? variables and values of Tree2-Study
**/
function init(geoData, treeData) {
  prepareData(geoData, treeData);



  createMaps(geoData);


  // For some reason the maps don't resize on widow resizing. So, now they just get deleted and recreated...
  window.addEventListener('resize', () => {
    redraw();
  });

  // HTML text
  HTMLtitle();
  HTMLbanner();
  HTMLdescription();
  HTMLfooter();
}

function redraw() {
  for (const m of maps) {
    m.redraw();
  }
}

function createMaps(geoData) {
  maps = [new Map(geoData, 1, vocab), new Map(geoData, 2, vocab), new Map(geoData, 3, vocab)];

  for (const m of maps) {
    m.drawMap();
  }
}


