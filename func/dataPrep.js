/*
Cleans and prepares the TREE-Survey data to be mapped onto a map of Switzerland per canton.
The data points will be summarised in terms of frequency.
*/
function prepareData(geoData, treeData) {
    //TODO: cleanData(treeData) to remove all non-valids
    waves = categorizeEdj(treeData);    

    geoData.features.forEach(function(d) {
        d.properties.details = waves[d.properties.KantonId];
    });
}



function categorizeEdj(treeData) {
    treeData = _.groupBy(treeData, "aes_canton");// from underscore library

    for (let k1 in treeData) {
        for (let k2 in treeData[k1]) {
            treeData[k1][k2]["t1educ_class_1_r"] = categorize(treeData[k1][k2]["t1educ_class_1_r"]);
            treeData[k1][k2]["t2educ_class_1_r"] = categorize(treeData[k1][k2]["t2educ_class_1_r"]);
            treeData[k1][k2]["t3educ_class_1_r"] = categorize(treeData[k1][k2]["t3educ_class_1_r"]);
        }
    }   
    
    
    
    return count(treeData)
}
    
function categorize(edj) {
    const educationMap = {"NET": "NIA",
                        "10th school year": "AB",
                        "2 years VET": "BB",
                        "3-4 years VET": "BB",
                        "Vocational baccalaureate //VET": "BB",
                        "General baccalaureate": "BB",
                        "Internship": "ZL",
                        "Other intermediate solution": "ZL",
                        "Other general education programme (specialized middle school, Waldorf)": "ZL"};
    
    return educationMap[edj] || "NA"; // Return the categorized value or NA if not found
}


// Generalise this to be used on all data variables
function count(treeData) {
    const waves = Array.apply(null, Array(27)).map(x => { return getWaves(); });

    for (let i in treeData){
        let canton = treeData[i];
        
        for (let j in canton) {
            let x1 = canton[j]["t1educ_class_1_r"];
            let x2 = canton[j]["t2educ_class_1_r"];
            let x3 = canton[j]["t3educ_class_1_r"];

            waves[i][1][x1] = waves[i][1][x1] + 1;
            waves[i][2][x2] = waves[i][2][x2] + 1;
            waves[i][3][x3] = waves[i][3][x3] + 1;

            waves[i][1]["sum"] = waves[i][1]["sum"] + 1;
            waves[i][2]["sum"] = waves[i][2]["sum"] + 1;
            waves[i][3]["sum"] = waves[i][3]["sum"] + 1;

            waves[0][1][x1] = waves[0][1][x1] + 1;
            waves[0][2][x2] = waves[0][2][x2] + 1;
            waves[0][3][x3] = waves[0][3][x3] + 1;

            waves[0][1]["sum"] = waves[0][1]["sum"] + 1;
            waves[0][2]["sum"] = waves[0][2]["sum"] + 1;
            waves[0][3]["sum"] = waves[0][3]["sum"] + 1;
        }
        
        for (let j = 1; j <= 3; j++) {
            for (let key in waves[i][j]) {
                if (key !== "sum") {
                    let percentage = (waves[i][j][key] / waves[i][j]["sum"]) * 100;
                    waves[i][j][key] = parseFloat(percentage.toFixed(2));                
                }
            }
        }
    }
    
    return waves;
}

function getWaves() {
    return {1 : {"BB" : 0, "AB" : 0, "ZL" : 0, "NIA" : 0, "sum" : 0},
            2 : {"BB" : 0, "AB" : 0, "ZL" : 0, "NIA" : 0, "sum" : 0},
            3 : {"BB" : 0, "AB" : 0, "ZL" : 0, "NIA" : 0, "sum" : 0}};
}