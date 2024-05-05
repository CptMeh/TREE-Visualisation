const COLORING = {"NET" : "#a00000", 
                    "GE" : "#00566b", 
                    "VET" : "#1e6b00", 
                    "IS" : "#e48100"}


/**
 * Responsible for creating and maintaining a visualisation of the Tree2-Study data by binding it to the regions of the given Geo data.
 */
class Map {   
    #geoData;
    #summary;

    #wave; 
    #selected;  // MUST BE INITIALIZED OUTSIDE OF THIS CLASS! the currently selected variable used to colour in the map parts
    #vocab;

    #width;
    #height;
    #container; // Contains all the map divs
    #map_div; // Contains the svg for the map, the tooltips, the wave drop down, and the data table
    #svg;
    #tooltip;
    

    /**
     * Construction and initialisation of the map class and all its variables.
     * 
     * @param {Array?+} geoData   the geo data of the map to be visualised
     * @param {int} wave        the selected questionair wave of the Tree2 Studie
     * @param {dict} vocab      the vocabulary of all the text in the chosen language 
     */
    constructor(geoData, summary, wave, vocab) {
        this.#wave = wave;
        this.#geoData = geoData;
        this.#summary = summary;
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
        this.initContainers();
        this.initTooltip();
        this.renderMap();
        this.initEventListeners(); // This order is important, because the tooltip wont show up /behind the map otherwise.
        this.initDescr();
    }

    /**
     * Sets up the containers for the map and SVG.
     */
    initContainers() {

        if (window.innerWidth >= window.innerHeight) {
            if (this.isMobile()) {
                this.#width = window.innerWidth*0.7;
                this.#height = this.#width*0.8;
            } else {
                this.#width = window.innerWidth*0.3;
                this.#height = this.#width*0.8;
            }
        
        } else {
            this.#width = window.innerHeight*0.3;
            this.#height = this.#width*0.8;
        }

        
        if (d3.select("#map_" + this.#wave).size() === 0) {
            this.#map_div = this.#container
                .append("div")
                .attr("id", "map_" + this.#wave)
                .attr("class", "row");
        }
        

        this.addDropDown(this);


        this.#svg = this.#map_div
                        .append("svg")
                        .attr("width", this.#width)
                        .attr("height", this.#height);


        if (!this.isMobile()) {
            this.#svg.attr('class', 'col-8 order-1')    
        } else {
            this.#svg.style("margin-top", "50px");
        }

        this.createTable(this.#summary[this.#wave], this.#summary['lang']);
    }

    /**
     * Sets up the tooltip for displaying additional information on hover.
     */
    initTooltip() {
        // Create tooltip
        this.#tooltip = this.#map_div.append("div")
            .attr("id", "tooltip_" + this.#wave)
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style("position","absolute")
            .style("overflow", "scroll")
            .style("pointer-events", "none")    
            .style("max-width", "150px"); // Adjust the maximum height as needed
    }
    
    /**
     * Sets up event listeners for mouse events on map elements.
     */
    initEventListeners() {
        let this_map_instance = this; // To avoid confusion for the event listeners, since "this" sometimes has a different context when using d3.js
    
        let mousemove = function(d) {
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
        this.#svg.selectAll("path")
            .on("mousemove", mousemove)
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
        this.#svg.append("defs")
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
        this.#svg.selectAll("path")
            .data(features)
            .enter()
            .append("path")
            .attr("class", "canton")
            .attr("id", function(d) { return d.properties.KantonId; })
            .attr("d", path_projection)
            .style("stroke-width", 0.5)
            .style("stroke", "white")
            .style("fill", d => {
                return d.properties.details[this.#wave][this.#selected] === 0.0 ? "url(#crosshatch)" : colorScale(d.properties.details[this.#wave][this.#selected]);
            });

        this.renderCantonText(path_projection)
    }

    
    /**
     * Renders the text for cantons on the map.
     * @param {Object} path_projection - The path projection function.
     */
    renderCantonText(path_projection) {
    
        // Render Canton text
        this.#svg.selectAll("text")
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
            // Create the dropdown select element
            const varSelect = map.getMapDiv()
                            .append("select")
                            .attr("id", "dropdown-button_" + this.#wave)
                            .classed("dropdown btn btn-secondary btn-lg btn-block col order-1", true)
                            .style("position", "absolute")
                            .style("width", this.#width + "px");

            // Add a default option that is not selectable
            varSelect.append("option")
                .text(vocab['drop_down_label'])
                .attr("disabled", "")
                .attr("selected", "");

            // Populate the dropdown with options
            varSelect.selectAll(null) // Use null for better separation of options
                .data(["GE", "VET", "IS", "NET"])
                .enter()
                .append("option")
                .attr("value", d => d)
                .text(d => vocab[d]);

            // Handle change event
            varSelect.on("change", function() {
                map.setSelected(this.value);
                map.redraw();
            });
        } else {
            d3.select("#dropdown-button_" + this.#wave).style("width", this.#width + "px");
        }
    }

    
    createTable(entries, languages) {
        if (d3.select('#table_container_' + this.#wave).size() === 0) {
            this.#map_div.append('div')
                .attr('id', 'table_container_' + this.#wave)
                .style("width", this.#width + "px");
        
        } 
        const container_div = d3.select("#table_container_" + this.#wave).style("width", this.#width + "px");
                
        container_div.selectAll('*').remove();
        
        if (!this.isMobile()) {
            container_div.attr('class', 'col order-2')
        }

        const table_div = container_div.append('div')
            .attr('id', 'table_' + this.#wave + '_div')
    
    
        const table = table_div.append('table')
            .attr('id', 'table_' + this.#wave)
            .attr('class', 'table table-striped table-bordered');
    
        const thead = table.append('thead');
        const tbody = table.append('tbody');
    
        thead.html('<p>' + vocab['table_descr'] + '</p>'); 
    
        // Header between entryRows and languageRows

    


        this.addRows(entries, tbody, 'table_head');
        this.addRows(languages, tbody, 'table_lang');
    
        
    }

    addRows(entries, tbody, header) {
        tbody.append('tr').append('th')
            .attr('colspan', 2)
            .text(vocab[header]);

        // Bind and append rows for the entry data
        const rows = tbody.selectAll('tr.entry')
                .data(Object.entries(entries))
                .enter()
                .append('tr')
                .classed('entry', true);

        rows.append('td')
                .html(d => {
                    if (d[0] === this.#selected) {
                        return `<span class="highlight">${vocab[d[0]]} (${d[0]})</span>`;
                    } 
                    return `${vocab[d[0]]} (${d[0]})`;
                });
    

        rows.append('td')
                .html(d => {
                    if (d[0] === this.#selected) {
                        return `<span class="highlight">${d[1]}%</span>`;
                    } 
                    return `${d[1]}%`;
                });

    }
    

    /**
     * Clears the container and redraws the map.
     */
    redraw() {
        this.#svg.remove();
        this.drawMap()
    }


    /** 
     * Creates the contents of the tool tip / the description. 
     * 
     * @param {object} event        the mouse click/over event
     * @param {boolean} isTooltip   determining if it is for a tool tip or a description
     * 
     * @returns {string} the label for the tool tip / description formatted to be compilable as HTML-code.
    */
    description(event) {
        const canton = event.target.__data__;
        const details = canton.properties.details;
        const lang = localStorage.getItem('lang') || "0";
        let label = this.initLabel(true);

        switch(lang) {
            case "0" : label += "<p><b>" + canton.properties.KantonName_de + "</b></p>"; break;
            case "1" : label += "<p><b>" + canton.properties.KantonName_en + "</b></p>"; break;
            case "2" : label += "<p><b>" + canton.properties.KantonName_fr + "</b></p>"; break;
        }

        for (let key in details[this.#wave]) {

            if (key != "sum"){

                if (key === this.#selected) {
                    label += "<p style='color:red;'>" + key + ":  " + details[this.#wave][key] + "%</p>";
                } else {
                    label += "<p>" + key + ":  " + details[this.#wave][key] + "%</p>";
                }

            }
        }
        
        return label;    
    }

    /**
     * Initialises the label based for a tool tip.
     * 
     * @returns {string} the initialised label
     */
    initLabel() {
        return "<p><b>" + this.#vocab["wave"] + " " + vocab[this.#wave] + "</b></p>"
    }

    /**
     * Writes the initial label combined with the infomation about the canton and its variables directly into HTML.
     */
    initDescr() {
        let label = this.initLabel() + "<p><b>" + this.#vocab["Kanton"] + "</b></p>" 
                    + "<p>" + this.#vocab["BB"] + " (BB): - </p>" 
                    + "<p>" + this.#vocab["AB"] + " (AB): - </p>" 
                    + "<p>" + this.#vocab["ZL"] + " (ZL): - </p>" 
                    + "<p>" + this.#vocab["NIA"] + " (NIA): - </p>";

        d3.select("#canton-descr").html(label);
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
        return this.#svg;
    }
}
