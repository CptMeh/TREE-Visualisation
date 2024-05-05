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
    GR : "Deutsch",
    FR : "Französisch",
    IT : "Italienisch",
    EN : "Englisch",
    Kanton: "Kanton",
    coloring: "Färbung",
    selected: "Ausgewählte",
    "survey wave": "Befragungswelle",
    wave: "Welle",
    NET: "Nicht in Ausbildung",
    GE: "Allgemeinbildung",
    VET: "Berufsbildung",
    IS: "Zwischenlösung",
    table_head : 'Gesammtschweizerische Verteilung',
    table_lang : 'Sprachverteilung',
    drop_down_label : "Wähle eine Ausbildungskategorie aus...",
    banner_title : "TREE2-Studie Visualisierung",
    map : "Karte",
    dev : "Entwickler",
    lang : "Sprache",
    map_title : "Visualierung der TREE2-Studie - kantonal",
    cnt : "Weiters",
    descr : [["Beschreibung"], 
            ["Visualisierung der TREE2-Studie",
            "Die Ergebnisse der ersten drei Befragungswellen der TREE2-Kohorte werden auf der obigen Karte visualisiert. Hierbei werden jeweils kantonal die Resultate in Prozent aufgeführt und farblich gekennzeichnet."],
            ["Erklärung zu den Variablen",
            "<p>In dieser Visualisierung wurden die Variablen bezüglich der Ausbildung (t1educ_class_1_r, t2educ_class_1_r, t3educ_class_1_r) in Berufsausbildung (BB), Allgemeinbildung (AB), Zwischenlösung (ZL) und Nicht in Ausbildung (NIA) unterteil, gewichtet und dann prozentual dargestellt.</p>"
            + "<p>Gurppierung der Variablen:</p> <ul>"
            + "<li><b>BB</b>: 2 years VET, 3-4 years VET, Vocational baccalaureate, General baccalaureate</li>"
            + "<li><b>AB</b>: 10th school year</li>" 
            + "<li><b>ZL</b>: Internship, Other intermediate solution, Other general education programme (specialized middle school, Waldorf)</li>"
            + "<li><b>NIA</b>: NET</li>"
            + "</ul>"],
            ["TREE-Studie", 
            "TREE (Transitionen von der Erstausbildung ins Erwerbsleben) ist eine gesamtschweizerische, längsschnittlich angelegte Befragung zum Übergang Jugendlicher von der Schule ins Erwachsenenleben (Transition). Im Zentrum der Untersuchung stehen die Ausbildungs- und Erwerbsverläufe nach Austritt aus der obligatorischen Schule. Die erste Stichprobe (TREE1) umfasst über 6'000 Jugendliche, die im Jahr 2000 am Projekt PISA (Programme for International Student Assessment) teilnahmen und im selben Jahr aus der obligatorischen Schulpflicht entlassen wurden. Die Stichprobe ist national nd sprachregional repräsentativ. Eine zweiteStichprobe (TREE2) von fast 10'000 Jugendlichen wird seit 2016 längsschnittlich befragt. Damit gehört TREE zu einer der weltweit wenigen Multi-Kohorten-Studien, welche kohortenvergleichende Analysen ermöglichen."],
            ["Weiteres",
            "Diese Visualisierung wurde von Marlene Kulowatz und Ramon Näf als Projekt für die Vorlesung \"Open Data and Open Government\" an der Universität Bern im Frühjahressemester 2023 entwickelt. Die Daten zur TREE-Studie wurden von <a href='https://www.tree.unibe.ch/ueber_uns/personen/dr_meyer_thomas/index_ger.html'>Dr. Thomas Meyer</a> zur Verfügung gestellt."],
            []
            ],
    footer : ["TREE-Studie", "Universität Bern", "Institut für Soziologie"]
};

// English Vocabulary
const englishVocab = {
    GR : "German",
    FR : "French",
    IT : "Italian",
    EN : "English",
    word: "english",
    Kanton: "Canton",
    coloring: "Coloring",
    selected: "selected",
    "survey wave": "survey wave",
    wave: "Wave",
    NET: "Not in education or training",
    GE: "General education",
    VET: "Vocational education & training",
    IS: "Intermediate solution",
    table_head: 'Swiss-wide Distribution',
    table_lang : 'Language distribution',
    drop_down_label : "Select an education class...",
    banner_title : "TREE2-Study Visualisation",
    map : "Map",
    dev : "Developers",
    lang : "Language",
    map_title : "Visualisation of the TREE2-Study - cantonal",
    cnt : "Continued",
    descr : [["Description"], 
            ["Visualization of the TREE2 Study",
            "The results of the first three survey waves of the TREE2 cohort are visualized on the map above. Here, the results are listed by canton in percentage and color-coded."], 
            ["Explanation of the variables",
            "<p>In this visualization, the variables concerning education (t1educ_class_1_r, t2educ_class_1_r, t3educ_class_1_r) were categorized into vocational training (BB), general education (AB), intermediate solution (ZL), and not in education (NIA), weighted, and then presented as percentages.</p>"
            + "<p>Grouping of the Variables:</p> <ul>"
            + "<li><b>BB</b>: 2 years VET, 3-4 years VET, Vocational baccalaureate, General baccalaureate</li>"
            + "<li><b>AB</b>: 10th school year</li>" 
            + "<li><b>ZL</b>: Internship, Other intermediate solution, Other general education programme (specialized middle school, Waldorf)</li>"
            + "<li><b>NIA</b>: NET</li>"
            + "</ul>"],
            ["TREE Study", 
            "TREE (Transitions from initial education to working life) is a nationwide, longitudinal survey in Switzerland on the transition of young people from school to adult life (Transition). The focus of the study is on the educational and employment trajectories after leaving compulsory schooling. The first sample (TREE1) comprises over 6,000 young people who participated in the PISA (Programme for International Student Assessment) project in 2000 and were released from compulsory schooling in the same year. The sample is nationally and linguistically regionally representative. A second sample (TREE2) of almost 10,000 young people has been surveyed longitudinally since 2016. This makes TREE one of the few multi-cohort studies worldwide that allow cohort-comparative analyses."],
    
            ["About",
            "This visualization was developed by Marlene Kulowatz and Ramon Näf as a project for the \"Open Data and Open Government\" lecture at the University of Bern in the Spring Semester 2023. The data for the TREE study was provided by <a href='https://www.tree.unibe.ch/ueber_uns/personen/dr_meyer_thomas/index_ger.html'>Dr. Thomas Meyer</a>."],
            []
        ],
    footer : ["TREE-Study", "University of Bern", "Institut of Soziology"]
    };

// French Vocabulary
const frenchVocab = {
    GR : "Allemande",
    FR : "Français",
    IT : "Italien",
    EN : "Anglaise",
    Kanton: "Canton",
    coloring: "Coloration",
    selected: "Sélectionné",
    "survey wave": "Vague d'enquête",
    wave: "Vague",
    NET: "Pas en formation",
    GE: "Formation générale",
    VET: "Formation professionnelle",
    IS: "Solution transitoire",
    table_head : 'Distribution à l\'échelle suisse',
    table_lang : 'Répartition linguistique',
    drop_down_label : "Veuillez choisir une catégorie de formation...",
    banner_title: "Visualisation de l'étude TREE2",
    map: "Carte",
    dev: "Développeur",
    lang: "Langue",
    map_title: "Visualisation de l'étude TREE2 - cantonale",
    cnt: "Continuer",
    descr : [["Description"], 
            ["Visualisation de l'étude TREE2",
            "Les résultats des trois premières vagues d'enquêtes de la cohorte TREE2 sont visualisés sur la carte ci-dessus. Les résultats sont présentés en pourcentage par canton et colorés en conséquence."], 
            ["Explication des variables",
            "Dans cette visualisation, les variables concernant l'éducation (t1educ_class_1_r, t2educ_class_1_r, t3educ_class_1_r) ont été catégorisées en formation professionnelle (BB), éducation générale (AB), solution intermédiaire (ZL) et non en formation (NIA), pondérées, puis présentées en pourcentage."
            + "<p>Groupement des Variables:</p> <ul>"
            + "<li><b>BB</b>: 2 years VET, 3-4 years VET, Vocational baccalaureate, General baccalaureate</li>"
            + "<li><b>AB</b>: 10th school year</li>" 
            + "<li><b>ZL</b>: Internship, Other intermediate solution, Other general education programme (specialized middle school, Waldorf)</li>"
            + "<li><b>NIA</b>: NET</li>"
            + "</ul>"],
            ["Étude TREE", 
            "TREE (Transitions de l'Éducation Initiale à la Vie Active) est une enquête longitudinale suisse sur la transition des jeunes de l'école à la vie adulte. L'étude se concentre sur les parcours éducatifs et professionnels après la fin de l'école obligatoire. La première échantillon (TREE1) comprend plus de 6'000 jeunes qui ont participé au projet PISA (Programme for International Student Assessment) en 2000 et ont terminé l'école obligatoire la même année. L'échantillon est représentatif au niveau national et linguistique. Un second échantillon (TREE2) de près de 10'000 jeunes est interrogé longitudinalement depuis 2016. Ainsi, TREE est l'une des rares études multi-cohortes au monde qui permet des analyses comparatives entre cohortes."],
            ["Informations supplémentaires",
            "Cette visualisation a été développée par Marlene Kulowatz et Ramon Näf dans le cadre d'un projet pour le cours \"Open Data and Open Government\" à l'Université de Berne au semestre de printemps 2023. Les données de l'étude TREE ont été fournies par <a href='https://www.tree.unibe.ch/ueber_uns/personen/dr_meyer_thomas/index_ger.html'>Dr. Thomas Meyer</a>."],
            []    
        ],
    footer : ["Étude TREE", "Université de Berne", "Institut de Sociologie"]
};



function languageSelect() {
    let lang;

    if (localStorage.getItem('lang') !== null) {
        lang = localStorage.getItem('lang');
    } else {
        lang = 1;
    }        

    switch(lang) {
        case "0" : return germanVocab; 
        case "1" : return englishVocab; 
        case "2" : return frenchVocab; 
        default : return germanVocab;
    }
}

function HTMLtitle() {
    d3.select("#map-title")
        .html(vocab.map_title);
}
  
function HTMLbanner() {
    d3.select("#banner-title")
        .html(vocab.banner_title);

    d3.select("#banner-maps")
        .html(vocab.map);

        d3.select("#map_dropdown_1")
        .on("click", scrollToTarget)
        .html(vocab.wave + " 1");
    
    d3.select("#map_dropdown_2")
        .on("click", scrollToTarget)
        .html(vocab.wave + " 2");
    
    d3.select("#map_dropdown_3")
        .on("click", scrollToTarget)
        .html(vocab.wave + " 3");

    d3.select("#banner-descr")
        .html(vocab.descr[0][0]);

    d3.select("#banner-dev")
        .html(vocab.dev);
        
    d3.select("#banner-lang")
        .html(vocab.lang);
}

function scrollToTarget() {
    // Get the target div id from the data-target attribute
    var targetId = d3.select(this).attr("data-target");            
    // Scroll to the target div
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
}

function HTMLdescription() {
    const descr = vocab.descr;
    let text = "";
  
    // First one is always the title, sencond one is always the text. If it's just a title, it'll be displayed in a bigger font.
    for (let i in descr) {
      if (descr[i].length === 1) {
        text += "<h2>" + descr[0] + "</h2>"

      } else {
        text += "<h4 class='mt-4'>" + descr[i][0] + "</h4>" + "<p>" + descr[i][1] + "</p>";
      }
    }

    d3.select("#descr")
        .html(text);
}

function HTMLfooter() {
    let footer = vocab.footer;
    d3.select("#tree")
        .html("<h5>" + footer[0] + "</h5>"
                + "<dd>" + footer[1] + "</dd>"
                + "<dd>" + footer[2] + "</dd>"
                + "<a class='small' href='https://www.tree.unibe.ch/'>www.tree.unibe.ch</a>");

}