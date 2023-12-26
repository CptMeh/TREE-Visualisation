const COLORING = {"NIA" : "#a00000", 
                    "AB" : "#00566b", 
                    "BB" : "#1e6b00", 
                    "ZL" : "#e48100"}

const SVG = d3.select("#map")
                .append("svg")
                    .classed("svg-container", true) 
                    .classed("col", true) 
                    .attr("preserveAspectRatio", "xMinYMin")
                    .attr("viewBox", "0 0 900 700");
                

class Map {   
    #wave;
    #width;
    #height;
    #geoData;
    #selected;
    #path;
    #vocab;

    constructor(geoData, wave, width, height, vocab) {
        this.#wave = wave;
        this.#width = width;
        this.#height = height;
        this.#geoData = geoData;
        this.#selected = "BB";
        this.#vocab = vocab;
        let projection = d3.geoIdentity().reflectY(true).fitSize([this.#width, this.#height], this.#geoData);// The projection determines what kind of plane the map itself is projected on to (eg. onto a globe or a flat plain).
        
        this.#path = d3.geoPath().projection(projection); // Create the path for the projection
        
        SVG.attr("width", width)
            .attr("height", height);

        this.drawMap();
        this.initDescr();

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

        SVG.selectAll("path").remove();
        
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
        SVG.append("defs")
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
                .style("fill", d => {return d.properties.details[this.#wave][this.#selected] === 0 ? "url(#crosshatch)" : colorScale(d.properties.details[this.#wave][this.#selected]); }); 
    }

    

    // Creates the permanent description of the values, shown in the tool tip.
    permaDescr(event, that) {
        let descr = d3.select("#canton-descr");

        descr.selectAll("p")
            .remove();

        descr.html(that.description(event, false));
    }

    // Creates the contents of the tool tip / the description.
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

    initLabel(isTooltip) {
        return isTooltip ? "<p><b>" + this.#vocab["wave"] + " " + this.#wave + "</b></p>" : 
                            "<p><b>" + this.#vocab["selected"] + " " + this.#vocab["survey wave"] + ": " + this.#wave + "</b></p>";
    }

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
}
