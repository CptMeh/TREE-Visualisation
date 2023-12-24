/*
let vocab = {"word" : ["german", "english", "french"],
                "Kanton" : ["Kanton", "Canton", "Canton"],
                "coloring" : ["Färbung", "Coloring", "?????????"],
                "selected" : ["Ausgewählte", "selected", "??????????"],
                "survey wave" : ["Befragungswelle", "Survey wave", "Vague d'enquête"],
                "wave" : ["Welle", "Wave", "Vague"],
                "variable" : ["NIA", "AB", "BB", "ZL"],
                "NIA" : ["Nicht in Ausbildung", "Not in Education", "Pas en formation"],
                "AB" : ["Allgemeinausbildung", "Vocational Training", "Formation professionnelle"],
                "BB" : ["Berufsausbildung", "Professional- / Vocational Education", "Formation professionnelle en entreprise"],
                "ZL" : ["Zwischenlösung", "Temporary Solution", "Solution temporaire"]
                };*/


// German Vocabulary
const germanVocab = {
    "Kanton": "Kanton",
    "coloring": "Färbung",
    "selected": "Ausgewählte",
    "survey wave": "Befragungswelle",
    "wave": "Welle",
    "NIA": "Nicht in Ausbildung",
    "AB": "Allgemeinausbildung",
    "BB": "Berufsausbildung",
    "ZL": "Zwischenlösung",
    title_head : "TREE2-Studie Visualisierung",
    map : "Karte",
    descr : "Beschreibung",
    descr_t1 : "Visualisierung der TREE2-Studie",
    descr_t2 : "TREE-Studie",
    descr_t3 : "Beschreibung zu den Variablen",
    dev : "Entwickler",
    lang : "Sprache",
    title_main : "Visualierung der TREE2-Studie - kantonal",
    cnt : "Weiters",
    descr_text : "",
};

// English Vocabulary
const englishVocab = {
    "word": "english",
    "Kanton": "Canton",
    "coloring": "Coloring",
    "selected": "selected",
    "survey wave": "survey wave",
    "wave": "Wave",
    "NIA": "Not in Education",
    "AB": "Vocational Training",
    "BB": "Vocational Education",
    "ZL": "Temporary Solution",
    title_head : "TREE2-Study Visualisation",
    map : "Map",
    descr : "Description",
    descr_t1 : "Visualisation of the TREE2-Study",
    descr_t2 : "TREE-Study",
    descr_t3 : "Variable description",
    dev : "Developers",
    lang : "Language",
    title_main : "Visualisation of the TREE2-Study - cantonal",
    cnt : "Continued",
    descr_text : "",
};

// French Vocabulary
const frenchVocab = {
    "Kanton": "Canton",
    "coloring": "Coloration",
    "selected": "Sélectionné",
    "survey wave": "Vague d'enquête",
    "wave": "Vague",
    "NIA": "Pas en formation",
    "AB": "Formation générale",
    "BB": "Formation professionnelle",
    "ZL": "Solution temporaire",
    title_head: "Visualisation de l'étude TREE2",
    map: "Carte",
    descr: "Description",
    descr_t1: "Visualisation de l'étude TREE2",
    descr_t2: "Étude TREE",
    descr_t3: "Description des variables",
    dev: "Développeur",
    lang: "Langue",
    title_main: "Visualisation de l'étude TREE2 - cantonale",
    cnt: "Continuer",
    descr_text: "",
};



function languageSelect() {
    const lang = localStorage.getItem('lang');

    console.log(lang)
        
    let vocab;

    switch(lang) {
        case "0" : vocab = germanVocab; break;
        case "1" : vocab = englishVocab; break;
        case "2" : vocab = frenchVocab; break;
    }

    console.log(vocab)

    return vocab;
}
