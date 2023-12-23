let vocab = {"word" : ["german", "english", "french"],
                "Kanton" : ["Kanton", "Canton", "Canton"],
                "wave" : ["Befragungswelle", "Survey wave", "Vague d'enquête"],
                "NIA" : ["Nicht in Ausbildung", "Not in Education", "Pas en formation"],
                "AB" : ["Arbeitsausbildung", "Vocational Training", "Formation professionnelle"],
                "BB" : ["Berufsausbildung", "Professional- / Vocational Education", "Formation professionnelle en entreprise"],
                "ZL" : ["Zwischenlösung", "Temporary Solution", "Solution temporaire"],

                };
let lang = 0;
geoDataURL = "https://data.geo.admin.ch/ch.bafu.landesforstinventar-kantone/landesforstinventar-kantone/landesforstinventar-kantone_2056.geojson"
DataURL = "https://raw.githubusercontent.com/CptMeh/OpenData/ramon/D3.js_implementation/Daten/currated_data.csv"

createVisual(geoDataURL, DataURL)




function createVisual(geoDataURL, DataURL) {
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
}

function init(geoData, treeData) {
  prepareData(geoData, treeData);
  addWaveDropdown();
  drawMap(geoData);
}

function loadLangFile(file) {
  d3.select("#lang")
    .remove();
  

  d3.select("#main")
    .append("script")
    .attr("id", "lang")
    .attr("src", file);
  
  console.log(file)
}