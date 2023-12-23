const COLORING = {"NIA" : "#a00000", 
                    "AB" : "#00566b", 
                    "BB" : "#1e6b00", 
                    "ZL" : "#e48100"}

const SVG = d3.select("#map")
                .append("svg")
                .classed("svg-container", true) 
                .classed("col", true) 
                .attr("preserveAspectRatio", "xMinYMin")
                .attr("viewBox", "0 0 900 700")
                //.attr("overflow", "scroll")
                

class Map {   
    #wave;
    #width;
    #height;
    #geoData;
    #selected;
    #path;

    constructor(geoData, wave, width, height) {
        this.#wave = wave;
        this.#width = width;
        this.#height = height;
        this.#geoData = geoData;
        this.#selected = "BB";
        let projection = d3.geoIdentity().reflectY(true).fitSize([this.#width, this.#height], this.#geoData);// The projection determines what kind of plane the map itself is projected on to (eg. onto a globe or a flat plain).
        
        this.#path = d3.geoPath().projection(projection); // Create the path for the projection
        
        SVG.attr("width", width)
            .attr("height", height);

        this.drawMap();
        this.initDescr();
        this.addColorDescr();
    }   

    /**
     * Renders the map.
     **/  
    drawMap() {
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
                        .style("pointer-events", "none"); 

        let map = this; // To avoid confusion for the event listeners

        let mouseclick = function(d) { // d is the canton data
            map.permaDescr(d, map);
        };


        let mousemove = function(d) { // d is the canton data
            // Highlight selected part and show tooltip
            d3.select(this) 
            .style("stroke-width", 2)
            .style("cursor", "pointer");    // maybe use .classed("canton-highligted", true); ?    
            
            tooltip.html(map.description(d, true)) 
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    .style("opacity", 0.9) // makes tooltip visible
                    .style("z-index", "2");
        };
        
        let mouseleave = function(d) { // d is the canton data
            // De-highlight and hide tooltip
            d3.select(this)
                .style("stroke-width", 0.5);  
                
            tooltip.style("opacity", 0.0) // makes tooltip invisible
                    .style("z-index", "0"); // makes it go behind the cantons, so it doesn't block them
        };

        SVG.selectAll("path").remove();

        let features = this.#geoData.features
        let maxScale = 0

        console.log(features)
        
        for (let d in features) {
            let detail = features[d].properties.details[this.#wave][this.#selected]

            if (detail > maxScale) {
                maxScale = detail
            }

        }


        SVG.selectAll("path")
            .data(this.#geoData.features)
            .enter()
            .append("path")
            .attr("class", "canton")
            .attr("id", function(d) { return d.properties.KantonId; })
            .attr("d", this.#path)
            .on("mousemove", mousemove)
            .on("click", mouseclick)
            .on("mouseleave", mouseleave)
            .style("stroke-width", 0.5)
            .style("stroke", "white")
            .style("fill", d => this.getColor(d.properties.details[this.#wave], this.#selected, maxScale)); 
    }

    
    /** 
     * Creates the color scale and returns the color value for the canton.
     * 
     * @param details   Array containing all the details
     * @param select  String the selected variable 
     * 
     * @returns         color value
     **/
    getColor(details, select, maxScale) {
        const colorScale = d3.scaleLinear()
                            .domain([0, maxScale])  // Assuming the percentage ranges from 0 to 100
                            .range(["#FFFFFF", COLORING[select]]);  // Scale from white to blue

        return colorScale(details[select]).toString()

    }

    addColorDescr() {
    // TODO 
    }

    // Creates the permanent description of the values, shown in the tool tip.
    permaDescr(canton, that) {
        let descr = d3.select("#canton-descr")

        descr.selectAll("p")
            .remove();

        descr.html(that.description(canton, false));
    }

    // Creates the contents of the tool tip / the description.
    description(canton, isTooltip) {
        let details = canton.properties.details;
        let label = this.initLabel(isTooltip);

        switch(lang) {
            case 0 : label += "<p><b>" + canton.properties.KantonName_de + "</b></p>"; break;
            case 1 : label += "<p><b>" + canton.properties.KantonName_en + "</b></p>"; break;
            case 2 : label += "<p><b>" + canton.properties.KantonName_fr + "</b></p>"; break;
        }

        for (let key in details[this.#wave]) {
            if (key != "sum"){
                if (isTooltip) {
                    label += "<p>" + key + ":  " + details[this.#wave][key] + "%</p>";

                } else {
                    label += "<p>" + vocab[key][lang] + " (" + key + "):  " + details[this.#wave][key] + "%</p>";
                }
            }
        }
        
        return label;    
    }

    initLabel(isTooltip) {
        return isTooltip ? "<p><b>" + vocab["wave"][lang] + " " + this.#wave + "</b></p>" : 
                            "<p><b>" + vocab["selected"][lang] + " " + vocab["survey wave"][lang] + ": " + this.#wave + "</b></p>";
    }

    initDescr() {
        let label = this.initLabel() + "<p><b> Kanton </b></p>" 
                    + "<p>Nicht in Ausbildung (NIA): - "
                    + "</p><p>Allgemeinausbildung (AB): - "
                    + "</p><p>Berufsausbildung (BB): - " 
                    + "</p><p>Zwischenlösung (ZL): -</p>";

        d3.select("#canton-descr").html(label);
    }

    setWave(wave) {
        this.#wave = wave;
    }

    setGeoData(geoData) {
        this.#geoData = geoData;
    }

    setHeight(height) {
        this.#height = height;
    }

    setHeight(width) {
        this.#width = width;
    }

    setSelected(selected) {
        this.#selected = selected;
    }
}
