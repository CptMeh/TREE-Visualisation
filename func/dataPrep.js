/*
Cleans and prepares the TREE-Survey data to be mapped onto a map of Switzerland per canton.
The data points will be summarised in terms of frequency.
*/
function prepareData(geoData, treeData) {
    //console.log(treeData)
    let cleanedData = cleanData(treeData);
    let waves = categorizeEdj(cleanedData);    

    geoData.features.forEach(function(d) {
        d.properties.details = waves[d.properties.KantonId];
    });
}

function cleanData(treeData) {
    // if valid response and more than 30 pro spalte?


    return treeData;
}

function getWeights(treeData) {
    const weights = Array.apply(null, Array(27));

    //weights[0] will always be undefined, because the geoData starts at 1 with indexing
    for (let canton in treeData) {
        weights[canton] = treeData[canton].map(item => {
            return {
                0: item.t1wt,
                1: item.t2wt,
                2: item.t3wt
            };
        });
    }

    return weights;
}

function categorizeEdj(treeData) {
    let weights;
    let orderedData = _.groupBy(treeData, "aes_canton"); // from underscore library

    for (let k1 in orderedData) {
        for (let k2 in orderedData[k1]) {
            orderedData[k1][k2]["t1educ_class_1_r"] = categorize(orderedData[k1][k2]["t1educ_class_1_r"]);
            orderedData[k1][k2]["t2educ_class_1_r"] = categorize(orderedData[k1][k2]["t2educ_class_1_r"]);
            orderedData[k1][k2]["t3educ_class_1_r"] = categorize(orderedData[k1][k2]["t3educ_class_1_r"]);
        }
    }   
    console.log(orderedData)

    weights = getWeights(orderedData);    
    
    return count(orderedData, weights)
}
    
function categorize(edj) {


    const educationMap = {"1.0": "NIA",
                        "2.0": "ZL",
                        "3.0": "AB",
                        "4.0": "ZL",
                        "5.0": "BB",
                        "6.0": "BB",
                        "7.0": "BB",
                        "8.0": "BB",
                        "9.0": "ZL"};
    
    return educationMap[edj] || "NA"; // Return the categorized value or NA if not found
}


// Generalise this to be used on all data variables
function count(orderedData, weights) {
    const waves = Array.apply(null, Array(27)).map(x => { return getWaves(); });

    for (let i in orderedData){
        let canton = orderedData[i];
        
        for (let j in canton) {
            let x1 = canton[j]["t1educ_class_1_r"];
            let x2 = canton[j]["t2educ_class_1_r"];
            let x3 = canton[j]["t3educ_class_1_r"];

            waves[i][1][x1] = waves[i][1][x1] + (1 * weights[i][j][0]);
            waves[i][2][x2] = waves[i][2][x2] + (1 * weights[i][j][1]);
            waves[i][3][x3] = waves[i][3][x3] + (1 * weights[i][j][2]);

            waves[i][1]["sum"] = waves[i][1]["sum"] + (1 * weights[i][j][0]);
            waves[i][2]["sum"] = waves[i][2]["sum"] + (1 * weights[i][j][1]);
            waves[i][3]["sum"] = waves[i][3]["sum"] + (1 * weights[i][j][2]);

            waves[0][1][x1] = waves[0][1][x1] + (1 * weights[i][j][0]);
            waves[0][2][x2] = waves[0][2][x2] + (1 * weights[i][j][1]);
            waves[0][3][x3] = waves[0][3][x3] + (1 * weights[i][j][2]);

            waves[0][1]["sum"] = waves[0][1]["sum"] + (1 * weights[i][j][0]);
            waves[0][2]["sum"] = waves[0][2]["sum"] + (1 * weights[i][j][1]);
            waves[0][3]["sum"] = waves[0][3]["sum"] + (1 * weights[i][j][2]);
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