const COLORING = {"NIA" : "#a00000", 
                    "AB" : "#00566b", 
                    "BB" : "#1e6b00", 
                    "ZL" : "#e48100"}


/**
 * Responsible for creating and maintaining a visualisation of the Tree2-Study data by binding it to the regions of the given Geo data.
 */
class Map {   
    #wave; 
    #width;
    #height;
    #geoData;
    #selected;  // the currently selected variable used to colour in the map parts
    #vocab;
    #container; // Contains the map_div, the wave select, and the data table
    #map_div; // Only contains the svg for the map and the tooltips
    #SVG;
    #tooltip;
    

    /**
     * Construction and initialisation of the map class and all its variables.
     * 
     * @param {Array} geoData   the geo data of the map to be visualised
     * @param {int} wave        the selected questionair wave of the Tree2 Studie
     * @param {dict} vocab      the vocabulary of all the text in the chosen language 
     */
    constructor(geoData, wave, vocab) {
        this.#wave = wave;
        this.#geoData = geoData;
        this.#selected = "BB"; // Chose BB to be selected at the start
        this.#vocab = vocab;

        this.#container = d3.select("#maps")
                            .append("div")
                            .attr("id", "container_" + this.#wave)
                            .attr("class", "row container");
    }   

    /**
     * Renders the map, sets up the different HTML containers, adds hover and click functionalities to the individual parts of the map, and colors in the individual parts of the map.
     * Also initializes the description.
     */
    drawMap() {
        this.setUpContainers();
        this.setupTooltip();
        this.setupEventListeners();
        this.renderMap();
        this.initDescr();
    }

    /**
     * Sets up the containers for the map and SVG.
     */
    setUpContainers() {
        this.#width = window.innerWidth*0.3;
        this.#height = this.#width*0.8;

        this.addDropDown(this);

        this.#map_div = this.#container
            .append("div")
            .attr("id", "map_" + this.#wave)
            .attr("class", "col order-1");

        this.#SVG = this.#map_div
                        .append("svg")
                        .classed("col", true)
                        .attr("width", this.#width)
                        .attr("height", this.#height);

        //this.addTable();
    }
    
    /**
     * Sets up the tooltip for displaying additional information on hover.
     */
    setupTooltip() {
        // Create tooltip
        this.#tooltip = this.#map_div.append("div")
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
    }
    
    /**
     * Sets up event listeners for mouse events on map elements.
     */
    setupEventListeners() {
        let this_map_instance = this; // To avoid confusion for the event listeners, since "this" sometimes has a different context when using d3.js
    
        // Define event listener functions
        let mouseclick = function(d) {
            this_map_instance.permaDescr(d, this_map_instance);
        };
    
        let mousemove = function(d) {
            // Highlight selected part and show tooltip
            d3.select(this)
                .style("stroke-width", 2)
                .style("cursor", "pointer");
    
            this_map_instance.#tooltip
                .html(this_map_instance.description(d, true))
                .style("left", (d.pageX) + "px")
                .style("top", (d.pageY) + "px")
                .style("opacity", 0.9)
                .style("z-index", "2");
        };
    
        let mouseleave = function(d) {
            // De-highlight and hide tooltip
            d3.select(this)
                .style("stroke-width", 0.5);
    
            this_map_instance.#tooltip
                .style("opacity", 0.0)
                .style("z-index", "0");
        };
    
        // Set up event listeners
        this.#SVG.selectAll("path")
            .on("mousemove", mousemove)
            .on("click", mouseclick)
            .on("mouseleave", mouseleave);
    }
    
    /**
     * Renders the map with colored paths based on provided data.
     */
    renderMap() {
        let features = this.#geoData.features;
        let maxScale = 0;
    
        // Calculate max scale
        for (let d in features) {
            let detail = features[d].properties.details[this.#wave][this.#selected];
            if (detail > maxScale) {
                maxScale = detail;
            }
        }
    
        // Define color scale
        const colorScale = d3.scaleLinear()
            .domain([0, maxScale])
            .range(["#FFFFFF", COLORING[this.#selected]]);
    
        // Define projection
        const projection = d3.geoIdentity()
            .reflectY(true)
            .fitSize([this.#width, this.#height], this.#geoData);
    
        // Define path projection
        const path_projection = d3.geoPath().projection(projection);
    
        // Create crosshatch pattern
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
    
        // Render map
        this.#SVG.selectAll("path")
            .data(features)
            .enter()
            .append("path")
            .attr("class", "canton")
            .attr("id", function(d) { return d.properties.KantonId; })
            .attr("d", path_projection)
            .style("stroke-width", 0.5)
            .style("stroke", "white")
            .style("fill", d => {
                return d.properties.details[this.#wave][this.#selected] === 0 ? "url(#crosshatch)" : colorScale(d.properties.details[this.#wave][this.#selected]);
            });

        this.renderCantonText(path_projection)
    }
    
    /**
     * Renders the text for cantons on the map.
     * @param {Object} path_projection - The path projection function.
     */
    renderCantonText(path_projection) {
    
        // Render Canton text
        this.#SVG.selectAll("text")
            .data(this.#geoData.features)
            .enter()
            .append("text")
            .text(d => { return d.properties.alternateName; })
            .attr("x", function(d) { return path_projection.centroid(d)[0]; }) // Use centroid for x position
            .attr("y", function(d) { return path_projection.centroid(d)[1]; }) // Use centroid for y position
            .attr("text-anchor", "middle") // Centers the text
            .attr("alignment-baseline", "central")
            .style("font-size", "12px") // Adjust font size as needed
            .style("fill", "black"); // Set text color
    }

    /**
     * Adds a dropdown select element to the specified map.
     * 
     * @param {Object} map - The map object to which the dropdown select element will be added.
     */
    addDropDown(map) {
        if (d3.select("#dropdown-button_" + this.#wave).size() === 0) {
            // Create a label element
            this.#container
                .append("label")
                    .attr("for", "dropdown-button_" + this.#wave)
                    .text("Select Variable");

            // Create the dropdown select element
            const varSelect = this.#container
                .append("select")
                    .attr("id", "dropdown-button_" + this.#wave)
                    .classed("dropdown btn btn-secondary btn-lg btn-block col order-1", true)
                    .style("position", "absolute")
                    .style("width", this.#width + "px")
                    .on("change", function() {
                        map.setSelected(this.value);
                        map.redraw();
                    });

            // Populate the dropdown with options
            varSelect.selectAll("option")
                .data(["BB", "AB", "ZL", "NIA"])
                .enter()
                .append("option")
                .attr("value", d => d)
                .text(d => vocab[d]);
        }
    }
    
    addTable() {
        let table =this.#container.append("table");
        
        // Add a class to the table for styling (optional)
        table.attr("class", "data-table");

        // Create the header row
        const header = table.append("thead").append("tr");

        // Define the columns for the header, including the country column
        const columns = ["country", "BB", "AB", "ZL", "NIA"];

        // Append the header cells
        header.selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .text(column => column);

        // Create rows for each data entry
        const rows = table.append("tbody")
            .selectAll("tr")
            .data(data)
            .enter()
            .append("tr");

        // Create cells for each row
        rows.selectAll("td")
            .data(row => columns.map(column => ({ value: row[column], column })))
            .enter()
            .append("td")
            .text(d => d.value);

    }

    /**
     * Clears the container and redraws the map.
     */
    redraw() {
        this.#SVG.remove();
        this.#map_div.remove();

        this.drawMap();
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

    getSelected() {
        return this.#selected;
    }

    getContainer() {
        return this.#container;
    }

    getMapDiv() {
        return this.#map_div;
    }

    getSVG() {
        return this.#SVG;
    }
}
