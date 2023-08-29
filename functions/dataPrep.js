
function combineData(geoData, treeData) {
    //cleanData(treeData) to remove all non-valids
    waves = categorizeEdj(treeData);
    //console.log(treeData)

    geoData.features.forEach(function(d) {
        d.properties.details = waves[d.properties.KantonId];
    });
    console.log(geoData)

    return geoData;
}


/*
Cleans and prepares the TREE-Survey data to be mapped onto a map of Switzerland per canton.
The data points will be summarised in terms of frequency.
*/
function categorizeEdj(treeData) {
    treeData = _.groupBy(treeData, "aes_canton");// from underscore library

    for (let k1 in treeData) {
        let arr = treeData[k1];

        for (let k2 in arr) {
            arr[k2]["t1educ_class_1_r"] = categorize(arr[k2]["t1educ_class_1_r"]);
            arr[k2]["t2educ_class_1_r"] = categorize(arr[k2]["t2educ_class_1_r"]);
            arr[k2]["t3educ_class_1_r"] = categorize(arr[k2]["t3educ_class_1_r"]);
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
    
    return educationMap[edj] || edj; // Return the categorized value or the original if not found
}


// Generalise this to be used on all data variables
function count(treeData) {
    const waves = Array.apply(null, Array(27)).map(x => { return getWaves(); });
    waves[0] = {};

    for (let i in treeData){
        let canton = treeData[i];
        
        for (let j in canton) {
            let x1 = canton[j]["t1educ_class_1_r"];
            let x2 = canton[j]["t2educ_class_1_r"];
            let x3 = canton[j]["t3educ_class_1_r"];

            waves[i][1][x1] = waves[i][1][x1] + 1;
            waves[i][2][x2] = waves[i][2][x2] + 1;
            waves[i][3][x3] = waves[i][3][x3] + 1;
        }
    }

    return waves;
}

function getWaves() {
    return {1 : {"NIA" : 0, "AB" : 0, "BB" : 0, "ZL" : 0},
            2 : {"NIA" : 0, "AB" : 0, "BB" : 0, "ZL" : 0},
            3 : {"NIA" : 0, "AB" : 0, "BB" : 0, "ZL" : 0}};
}
