// Initialise the selected language (See languageSelect.js)
const vocab = languageSelect();

// Online URL for the geo data for map of Switzerland
const backupURL = "https://raw.githubusercontent.com/CptMeh/TREE-Visualisation/main/data/geo-data/landesforstinventar-kantone_2056.geojson"


const geoDataURL = "./data/geo-data/landesforstinventar-kantone_2056.geojson"

// Online URL Tree2 data. This takes the data from the git repo.
const backupdTreeURL = "https://raw.githubusercontent.com/CptMeh/TREE-Visualisation/main/data/study-data/currated_data.csv"

// Local URL for Tree2 data
const treeDataURL = "./data/study-data/currated_data.csv";

var maps = [];


fetch('https://raw.githubusercontent.com/CptMeh/TREE-Visualisation/dev/data/geo-data/map_data.geojson')
  .then(response => response.json())
  .then(geoData => {
    // `data` now contains the parsed GeoJSON object
    console.log(geoData);
    init(geoData);

  })
  .catch(error => {
    console.error('Error reading GeoJSON file:', error);
});


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
 * @param {Array??} geoData  geojson data
**/
function init(geoData) {
  maps = [new Map(geoData, 1, vocab), new Map(geoData, 2, vocab), new Map(geoData, 3, vocab)];

  for (const m of maps) {
    m.drawMap();
  }

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
