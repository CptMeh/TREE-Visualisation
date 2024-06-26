const geoDataURL = './data/geo_data/map_data.geojson'
const summaryURL = './data/study_data/summary.json'

var maps = []

// Initialise the selected language (see func/util.js)
const vocab = languageSelect();

run(geoDataURL, summaryURL)

/**
 * Creates the Visualisation of the data at the given URLs.
 *
 * @param {String} geoDataURL - the URL to the Data source of the geo data
 * @param {String} summaryURL - the URL to the Data source of the study data
 **/
function run(geoDataURL, summaryURL) {
    // Get the map- and TREE-data and check if everything worked. Then use the drawMap function to render the map.
    d3.json(geoDataURL).then(function(geoData) {
        // GeoJSON data loaded successfully
        d3.json(summaryURL).then(function(summary) {
        // CSV data loaded successfully

        init(geoData, summary);

        }).catch(function(error) {
            console.error("Something went wrong loading the data: " + error);
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
 * @link util#HTMLtitle
 * @link util#HTMLbanner
 * @link util#HTMLdescrition
 * @link util#HTMLfooter
 * 
 * @param {Object} geoData - geojson data
 * @param {Object} summary - summary of the variables and values of Tree2-Study
**/
function init(geoData, summary) {
    maps = [new Map(geoData, summary, 'w1_edu', vocab), 
    new Map(geoData, summary, 'w2_edu', vocab), 
    new Map(geoData, summary, 'w3_edu', vocab)];

    for (const m of maps) {
        m.setSelected('GE')
        m.drawMap();

    }

    // For some reason the maps don't resize on widow resizing. So, now they just get deleted and recreated...
    window.addEventListener('resize', () => {
        for (const m of maps) {
            m.redraw();
        }    
    });

    // HTML text
    HTMLtitle();
    HTMLbanner();
    HTMLtexts();
    HTMLdescription();
    HTMLfooter();
}

