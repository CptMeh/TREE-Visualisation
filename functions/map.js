let wave;
let gd;
const mapDiv = d3.select("#map");

// Set up initial dimensions
let width = 800;
let height = 600;

// Add an SVG to the div with the ID 'map' and then sets its height and width.
const svg = d3.select("#map")
            .append("svg")
            .classed("svg-container", true) 
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 900 700")
            .classed("svg-content-responsive", true)
            .attr("width", width)
            .attr("height", height);


// Renders the map 
function drawMap(geoData) {
    gd = geoData;
    let projection = d3.geoIdentity().reflectY(true).fitSize([width*0.7, height * 0.6], geoData);// The projection determines what kind of plane the map itself is projected on to (eg. onto a globe or a flat plain).
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

    let mouseclick = function(d) {};

    let mousemove = function(d) {
        // Highlight selected part and show tooltip
        d3.select(this) 
        .style("stroke", "gray")
        .style("stroke-width", 2)
        .style("cursor", "pointer");    // maybe use .classed("canton-highligted", true); ?    
        
        tooltip.html(createLabel(d)) 
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .style("opacity", 0.9) // makes tooltip visible
                .style("z-index", "2");
    };
    
    let mouseleave = function(d) {
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
                    .style("stroke-width", 0.5);;
    //addColorScale();
    
    return map;

    function createLabel(canton) {
        let label = "<p><b>" + canton.properties.KantonName_de + "</b></p>";
        let details = canton.properties.details;

        for (let key in details[wave]) {
            label += "<p><b>" + key + ":</b>  " + details[wave][key] + "</p>";
        }
        
        return label;    
    }
}

function setWave(newWave) {
    wave = newWave;
}

function colorMap() {
    
}

// Add an event listener for window resizing
window.addEventListener("resize", updateMapDimensions);

// Update map dimensions and redraw the map
function updateMapDimensions() {
    // Update dimensions based on the container's size
    width = d3.select("body").node().clientWidth * 0.7;
    height = d3.select("body").node().clientHeight * 0.7;

    // Update SVG dimensions
    svg.attr("width", width).attr("height", height*0.7);
    mapDiv.attr("width", width).attr("height", height);

    // Redraw the map with updated dimensions
    drawMap(gd);
}


