let wave;
let width = 930; //d3.select("#main").node().clientWidth * 0.7;
let height = 650; //width * 0.7;

const svg = d3.select("#map")
            .append("svg")
            .classed("svg-container", true) 
            .classed("col", true) 
            .attr("preserveAspectRatio", "xMinYMin")
            .attr("viewBox", "0 0 900 700")
            //.attr("overflow", "scroll")
            .attr("width", width)
            .attr("height", height);


// Renders the map 
function drawMap(geoData) {
    let projection = d3.geoIdentity().reflectY(true).fitSize([width, height], geoData);// The projection determines what kind of plane the map itself is projected on to (eg. onto a globe or a flat plain).
    let path = d3.geoPath().projection(projection); // Create the path for the projection
    let tooltip = d3.select("#map")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("opacity", 0)
                    .attr("class", "tooltip")
                    .style("background-color", "white")
                    .style("border", "solid")
                    .style("border-width", "2px")
                    .style("border-radius", "5px")
                    .style("padding", "5px")
                    .style("position","absolute")
                    .style("overflow", "scroll")
                    .style("pointer-events", "none"); /*This makes the tooltip unclickable, so it doesn't block the canton behind it, once it is made invisible again. 
                                                        However, this hinders the user from copying the info in the box, not very handy :/ */

    let mouseclick = function(d) { // d is the canton data
        permaDescr(d);
    };

    let mousemove = function(d) { // d is the canton data
        // Highlight selected part and show tooltip
        d3.select(this) 
        .style("stroke", "gray")
        .style("stroke-width", 2)
        .style("cursor", "pointer");    // maybe use .classed("canton-highligted", true); ?    
        
        tooltip.html(description(d)) 
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .style("opacity", 0.9) // makes tooltip visible
                .style("z-index", "2");
    };
    
    let mouseleave = function(d) { // d is the canton data
        // De-highlight and hide tooltip
        d3.select(this)
            .style("stroke", "gray")
            .style("stroke-width", 0.5);  
            
        tooltip.style("opacity", 0.0) // makes tooltip invisible
                .style("z-index", "0"); // makes it go behind the cantons, so it doesn't block them
    };

    let map = svg.selectAll("path")
                    .data(geoData.features)
                    .enter()
                    .append("path")
                    .attr("class", "canton")
                    .attr("id", function(d) { return d.properties.KantonId; })
                    .attr("d", path)
                    .on("mousemove", mousemove)
                    .on("click", mouseclick)
                    .on("mouseleave", mouseleave)
                    .style("stroke", "gray")
                    .style("stroke-width", 0.5);
    
    initDescr();
    colorMap();
    //addColorScale();
    
    return map;
}

function colorMap() {

}

// Creates the permanent description of the values, shown in the tool tip.
function permaDescr(canton) {
    let descr = d3.select("#canton-descr")

    descr.selectAll("p")
        .remove();

    descr.html(description(canton));
}

// Creates the contents of the tool tip.
function description(canton) {
    let details = canton.properties.details;
    let label = initLabel();

    switch(lang) {
        case 0 : label += "<p><b>" + canton.properties.KantonName_de + "</b></p>"; break;
        case 1 : label += "<p><b>" + canton.properties.KantonName_en + "</b></p>"; break;
        case 2: label += "<p><b>" + canton.properties.KantonName_fr + "</b></p>"; break;
    }

    for (let key in details[wave]) {
        label += "<p>" + vocab[key][lang] + " (" + key + "):  " + details[wave][key] + "</p>";
    }
    
    return label;    
}

function initLabel() {
    let label = "<p><b>" + vocab["wave"][lang] + " " + wave + "</b></p>";
    return label;
}

function initDescr() {
    d3.select("#canton-descr")
    .html(initLabel())
}

function setWave(newWave) {
    wave = newWave;
}

