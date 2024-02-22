const COLORING = {"NIA" : "#a00000", 
                    "AB" : "#00566b", 
                    "BB" : "#1e6b00", 
                    "ZL" : "#e48100"}


// TODO: Make it so the map object is appended to its own div. Not sure yet how this will work with SVG object.                 


/**
 * Responsible for creating and maintaining a visualisation of the Tree2-Study data by binding it to the regions of the given Geo data.
 *  
 * @param {Array} geoData   
 * @param {int} wave        the selected wave to be visualised
 * @param {int} width       width of the map
 * @param {int} height      height of the map
 * @param {dict} vocab      the vocabulary used for the chosen language
 */
class Map {   
    #wave; 
    #width;
    #height;
    #geoData;
    #selected;  // the currently selected variable used to colour in the map parts
    #path_projection;      // the paths to the individual map projections, using d3.js
    #vocab;
    #SVG = d3.select("#map")
            .append("svg")
            .classed("svg-container", true) 
            .classed("col", true) 
            .attr("preserveAspectRatio", "xMinYMin")
            .attr("viewBox", "0 0 900 700");

    

    /**
     * Construction and initialisation of the map class and all its variables.
     * 
     * @param {Array} geoData   the geo data of the map to be visualised
     * @param {int} wave        the selected questionair wave of the Tree2 Studie
     * @param {int} width       width of the map
     * @param {int} height      height of the map
     * @param {dict} vocab      the vocabulary of all the text in the chosen language 
     */
    constructor(geoData, wave, width, height, vocab) {
        this.#wave = wave;
        this.#width = width;
        this.#height = height;
        this.#geoData = geoData;
        this.#selected = "BB"; // Chose BB to be selected at the start
        this.#vocab = vocab;
        let projection = d3.geoIdentity().reflectY(true).fitSize([this.#width, this.#height], this.#geoData);// The projection determines what kind of plane the map itself is projected on to (eg. onto a globe or a flat plain).
        
        this.#path_projection = d3.geoPath().projection(projection); // Create the path for the projection
        
        this.#SVG.attr("width", width)
            .attr("height", height);

        this.drawMap();
        this.initDescr();

    }   

    /**
     * Renders the map, adds the hover and click functionalities to the individual parts of the map and colours in the individual parts of the map.
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

        let this_map = this; // To avoid confusion for the event listeners, since "this" sometimes has a different context when using d3.js

        let mouseclick = function(d) { // d is the canton data
            this_map.permaDescr(d, this_map);
        };


        let mousemove = function(d) { // d is the canton data
            // Highlight selected part and show tooltip
            d3.select(this) 
            .style("stroke-width", 2)
            .style("cursor", "pointer");      
            
            tooltip.html(this_map.description(d, true)) 
                    .style("left", (d.pageX) + "px")
                    .style("top", (d.pageY) + "px")
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

        this.#SVG.selectAll("path").remove();
        
        let features = this.#geoData.features
        let maxScale = 0
        
        // This finds the max scale for the coloring, so there's also color even if the values ar way smaller
        for (let d in features) {
            let detail = features[d].properties.details[this.#wave][this.#selected]

            if (detail > maxScale) {
                maxScale = detail
            }

        }

        const colorScale = d3.scaleLinear()
                            .domain([0, maxScale])  // Assuming the percentage ranges from 0 to 100
                            .range(["#FFFFFF", COLORING[this.#selected]]); 

        // This defines the crosshatch pattern, for when a value is 0.
        this.#SVG.append("defs")
            .append("pattern")
                .attr("id", "crosshatch")
                .attr("patternUnits", "userSpaceOnUse")
                .attr("width", 8)
                .attr("height", 8)
            .append("image")
                .attr("xlink:href", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnPgogIDxyZWN0IHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9JyNmZmYnLz4KICA8cGF0aCBkPSdNMCAwTDggOFpNOCAwTDAgOFonIHN0cm9rZS13aWR0aD0nMC41JyBzdHJva2U9JyNhYWEnLz4KPC9zdmc+Cg==")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", 8)
                .attr("height", 8);

        // Creates the map visualisation
        this.#SVG.selectAll("path")
            .data(this.#geoData.features)
            .enter()
            .append("path")
                .attr("class", "canton")
                .attr("id", function(d) { return d.properties.KantonId; })
                .attr("d", this.#path_projection)
                .on("mousemove", mousemove)
                .on("click", mouseclick)
                .on("mouseleave", mouseleave)
                .style("stroke-width", 0.5)
                .style("stroke", "white")
                .style("fill", d => {return d.properties.details[this.#wave][this.#selected] === 0 ? "url(#crosshatch)" : colorScale(d.properties.details[this.#wave][this.#selected]); })
                .append("text")

                    .text(d => {return d.properties.alternateName})
                    .attr("text-anchor", "middle") // Centers the text
                    .attr("alignment-baseline", "central")
                    .style("font-size", "12px") // Adjust font size as needed
                    .style("fill", "black"); // Set text color
    }

    

    /**  
     * Creates the permanent description of the values, shown in the tool tip.
     *  
     * @param event     
     * @param this_map  Object this instance of the map class
    */
    permaDescr(event, this_map) {
        let descr = d3.select("#canton-descr");

        descr.selectAll("p")
            .remove();

        descr.html(this_map.description(event, false));
    }

    /** 
     * Creates the contents of the tool tip / the description. 
     * 
     * @param {object} event        the mouse click/over event
     * @param {boolean} isTooltip   determining if it is for a tool tip or a description
     * 
     * @returns {string} the label for the tool tip / description formatted to be compilable as HTML-code.
    */
    description(event, isTooltip) {
        const canton = event.target.__data__;
        const details = canton.properties.details;
        const lang = localStorage.getItem('lang') || "0";
        let label = this.initLabel(isTooltip);

        switch(lang) {
            case "0" : label += "<p><b>" + canton.properties.KantonName_de + "</b></p>"; break;
            case "1" : label += "<p><b>" + canton.properties.KantonName_en + "</b></p>"; break;
            case "2" : label += "<p><b>" + canton.properties.KantonName_fr + "</b></p>"; break;
        }

        for (let key in details[this.#wave]) {

            if (key != "sum"){
                if (isTooltip) {
                    if (key === this.#selected) {
                        label += "<p style='color:red;'>" + key + ":  " + details[this.#wave][key] + "%</p>";
                    } else {
                        label += "<p>" + key + ":  " + details[this.#wave][key] + "%</p>";
                    }

                } else {
                    label += "<p>" + this.#vocab[key] + " (" + key + "):  " + details[this.#wave][key] + "%</p>";
                }
            }
        }
        
        return label;    
    }


    /**
     * Initialises the label based on if it is for a tool tip or not:
     * - if isTooltip == True: the label is initialised with the wave number
     * - else: the label is initialiesd with the word "selected survey wave 'number'" in the chosen language.
     * 
     * 
     * @param {boolean} isTooltip 
     * 
     * @returns {string} the initialised label
     */
    initLabel(isTooltip) {
        return isTooltip ? "<p><b>" + this.#vocab["wave"] + " " + this.#wave + "</b></p>" : 
                            "<p><b>" + this.#vocab["selected"] + " " + this.#vocab["survey wave"] + ": " + this.#wave + "</b></p>";
    }


    /**
     * Writes the initial label combined with the infomation about the canton and its variables directly into HTML, using d3.js.
     */
    initDescr() {
        let label = this.initLabel() + "<p><b>" + this.#vocab["Kanton"] + "</b></p>" 
                    + "<p>" + this.#vocab["BB"] + " (BB): - </p>" 
                    + "<p>" + this.#vocab["AB"] + " (AB): - </p>" 
                    + "<p>" + this.#vocab["ZL"] + " (ZL): - </p>" 
                    + "<p>" + this.#vocab["NIA"] + " (NIA): - </p>";

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

    getSVG() {
        return this.#SVG;
    }
}
