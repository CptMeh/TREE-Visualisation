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
            "Willkommen zur geographischen Darstellung der TREE2-Studie! Die drei interaktiven Karten präsentieren die drei Befragungswellen der TREE2-Kohorte auf \
            anschauliche Weise, wobei man zwischen verschiedenen Ausbildungskategorien wie \"Allgemeinbildung\", \"Berufsbildung\", \"Zwischenlösung\" und \"Nicht in Ausbildung\" \
            über ein Dropdown-Menü oberhalb der Karte wählen kann. Auf der rechten Seite der Karten befindet sich jeweils eine Tabelle, die die gesamten prozentualen Anteile der \
            Ausbildungskategorien schweizweit für die spezifische Befragungswelle darstellt. Bei der Auswahl eines Kantons werde durch einen Tooltip die prozentualen Anteil der \
            Ausbildungskategorien des entsprechenden Kantons angezeigt. Zusätzlich wird die ausgewählte Ausbildungskategorie sowohl \
            in der Tabelle als auch im Tooltip rot markiert, um sie deutlich hervorzuheben."],
            
            ["Erklärung zu den Variablen",
            "<ul><li><strong>Berufsbildung:</strong> Diese Variable erfasst die Teilnehmerinnen und Teilnehmer, die sich in einem berufsbildenden Ausbildungsprogramm befinden. \
            Dies umfasst Personen, die ein Eidgenössisches Berufsattest (EBA), eine Berufslehre mit einem Eidgenössischen Fähigkeitszeugnis (EFZ) oder eine Berufsmaturität absolvieren.</li>\
             <li><strong>Allgemeinbildung:</strong> Diese Variable erfasst die Teilnehmerinnen und Teilnehmer, die sich in einem allgemeinbildenden Ausbildungsprogramm befinden. \
             Dazu gehören Personen, die das Gymnasium besuchen, sowie andere allgemeinbildende Ausbildungswege.</li>\
             <li><strong>Zwischenlösung:</strong> Diese Variable erfasst die Teilnehmerinnen und Teilnehmer, die sich in einer Übergangslösung befinden, bevor sie eine berufliche \
             oder allgemeinbildende Ausbildung beginnen. Dies kann das Absolvieren des 10. Schuljahres, ein Praktikum oder andere Zwischenlösungen umfassen.</li>\
             <li><strong>Nicht in Ausbildung:</strong> Diese Variable erfasst die Teilnehmerinnen und Teilnehmer, die sich zum Zeitpunkt der Datenerhebung nicht in einem formellen Ausbildungsprogramm befinden.</li></ul>"
            ],

            ["TREE-Studie", 
            "TREE (Transitionen von der Erstausbildung ins Erwerbsleben) ist eine umfassende, schweizweite Langzeitstudie, die den Übergang von Jugendlichen von der Schule ins \
            Erwachsenenleben (Transition) untersucht. Im Fokus dieser Untersuchung stehen die Bildungs- und Karriereverläufe nach dem Verlassen der obligatorischen Schule. Die  \
            erste Stichprobe (TREE1) umfasst mehr als 6.000 Jugendliche, die im Jahr 2000 am PISA-Projekt (Programme for International Student Assessment) teilgenommen haben und im \
            selben Jahr die obligatorische Schulpflicht abgeschlossen haben. Diese Stichprobe ist national und sprachregional repräsentativ. Seit 2016 wird eine zweite Stichprobe \
            (TREE2) von fast 10.000 Jugendlichen längschnittlich befragt. Dadurch zählt TREE zu einer der weltweit wenigen Multi-Kohorten-Studien, die kohortenübergreifende Vergleiche ermöglichen."
            ],
            
            ["Weiteres",
            "Diese Visualisierung wurde unter Zusammenarbeit von Marlene Kulowatz und Ramon Näf als Projekt für die Vorlesung \"Open Data and Open Government\" an der Universität Bern im \
            Frühjahressemester 2023 entworfen. Die Daten zur TREE-Studie wurden von <a href='https://www.tree.unibe.ch/ueber_uns/personen/dr_meyer_thomas/index_ger.html'>Dr. Thomas Meyer</a> \
            zur Verfügung gestellt."]
            ],
    footer : ["TREE-Studie", "Universität Bern", "Institut für Soziologie"]
};

// English Vocabulary
const englishVocab = {
    GR: "German",
    FR: "French",
    IT: "Italian",
    EN: "English",
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
    descr : [
        ["Description"], 
        ["Visualization of the TREE2-Study",
        "Welcome to the geographical representation of the TREE2-Study! The three interactive maps present the three survey waves of the TREE2 cohort in an illustrative way, allowing users to choose between different education categories such as \"General education\", \"Vocational education & training\", \"Intermediate solution\", and \"Not in education or training\" via a dropdown menu above the map. On the right side of the maps, there is a table displaying the total percentage shares of the education categories nationwide for the specific survey wave. When selecting a canton, the tooltip will display the percentage share of the education categories for the respective canton. Additionally, the selected education category is highlighted in red both in the table and in the tooltip to emphasize it."],
        
        ["Explanation of the variables",
        "<ul><li><strong>Vocational education & training:</strong> This variable captures participants who are enrolled in a vocational training program. This includes individuals who obtain a Federal Vocational Certificate (EBA), a Federal Certificate of Competence (EFZ), or a Vocational Baccalaureate.</li>\
         <li><strong>General education:</strong> This variable captures participants who are enrolled in a general education program. This includes individuals attending high school, as well as other general education pathways.</li>\
         <li><strong>Intermediate solution:</strong> This variable captures participants who are in a transitional solution before starting a vocational or general education program. This may include completing the 10th year of school, an internship, or other intermediate solutions.</li>\
         <li><strong>Not in education or training:</strong> This variable captures participants who are not enrolled in a formal education program at the time of data collection.</li></ul>"
        ],

        ["TREE-Study", 
        "TREE (Transitions from Education to Employment) is a comprehensive, nationwide longitudinal study that examines the transition of adolescents from school to adulthood. This study focuses on the educational and career pathways after leaving compulsory schooling. The first sample (TREE1) consists of more than 6,000 adolescents who participated in the Programme for International Student Assessment (PISA) project in 2000 and completed compulsory schooling in the same year. This sample is nationally and linguistically representative. Since 2016, a second sample (TREE2) of almost 10,000 adolescents has been longitudinally surveyed. Thus, TREE is one of the few multi-cohort studies worldwide that enable cohort-comparative analyses."],

        ["Additional Information",
        "This visualization was designed as a project for the course \"Open Data and Open Government\" at the University of Bern in the spring semester of 2023, in collaboration with Marlene Kulowatz and Ramon Näf. The data for the TREE-Study were provided by <a href='https://www.tree.unibe.ch/ueber_uns/personen/dr_meyer_thomas/index_ger.html'>Dr. Thomas Meyer</a>."]
        ],
    footer : ["TREE-Study", "University of Bern", "Institute of Sociology"]
};


// French Vocabulary
const frenchVocab = {
    GR: "Allemande",
    FR: "Français",
    IT: "Italien",
    EN: "Anglaise",
    Kanton: "Canton",
    coloring: "Coloration",
    selected: "Sélectionné",
    "survey wave": "Vague d'enquête",
    wave: "Vague",
    NET: "Pas en formation",
    GE: "Formation générale",
    VET: "Formation professionnelle",
    IS: "Solution transitoire",
    table_head: "Distribution à l'échelle suisse",
    table_lang: "Répartition linguistique",
    drop_down_label: "Veuillez choisir une catégorie de formation...",
    banner_title: "Visualisation de l'étude TREE2",
    map: "Carte",
    dev: "Développeur",
    lang: "Langue",
    map_title: "Visualisation de l'étude TREE2 - cantonale",
    cnt: "Continuer",
    descr: [
        ["Description"],
        ["Visualization of the TREE2-Study",
            "Welcome to the geographical representation of the TREE2-Study! The three interactive maps present the three survey waves of the TREE2 cohort in an illustrative way, allowing users to choose between different education categories such as \"General education\", \"Vocational education & training\", \"Intermediate solution\", and \"Not in education or training\" via a dropdown menu above the map. On the right side of the maps, there is a table displaying the total percentage shares of the education categories nationwide for the specific survey wave. When selecting a canton, the tooltip will display the percentage share of the education categories for the respective canton. Additionally, the selected education category is highlighted in red both in the table and in the tooltip to emphasize it."],

        ["Explanation of the variables",
            "<ul><li><strong>Formation professionnelle:</strong> Cette variable concerne les participants inscrits dans un programme de formation professionnelle. Cela inclut les individus qui obtiennent un Attestation Fédérale de Formation Professionnelle (AFP), un Certificat Fédéral de Capacité (CFC), ou une Maturité Professionnelle.</li>\
             <li><strong>Formation générale:</strong> Cette variable concerne les participants inscrits dans un programme d'éducation générale. Cela inclut les individus fréquentant le lycée, ainsi que d'autres parcours d'éducation générale.</li>\
             <li><strong>Solution transitoire:</strong> Cette variable concerne les participants qui se trouvent dans une solution transitoire avant de commencer une formation professionnelle ou générale. Cela peut inclure la réussite de la 10e année scolaire, un stage, ou d'autres solutions intermédiaires.</li>\
             <li><strong>Pas en formation:</strong> Cette variable concerne les participants qui ne sont pas inscrits dans un programme de formation formel au moment de la collecte des données.</li></ul>"
        ],

        ["TREE-Studie",
            "TREE (Transitionen von der Erstausbildung ins Erwerbsleben) est une étude longitudinale exhaustive à l'échelle nationale qui examine la transition des adolescents de l'école à l'âge adulte. Cette étude se concentre sur les parcours éducatifs et professionnels après avoir quitté l'école obligatoire. Le premier échantillon (TREE1) comprend plus de 6 000 adolescents qui ont participé au projet Programme for International Student Assessment (PISA) en 2000 et ont terminé la scolarité obligatoire la même année. Cet échantillon est représentatif au niveau national et linguistique. Depuis 2016, un deuxième échantillon (TREE2) de près de 10 000 adolescents est interrogé longitudinalement. Ainsi, TREE fait partie des rares études multi-cohortes dans le monde qui permettent des analyses comparatives entre cohortes."],

        ["Additional Information",
            "This visualization was designed as a project for the course \"Open Data and Open Government\" at the University of Bern in the spring semester of 2023, in collaboration with Marlene Kulowatz and Ramon Näf. The data for the TREE-Study were provided by <a href='https://www.tree.unibe.ch/ueber_uns/personen/dr_meyer_thomas/index_ger.html'>Dr. Thomas Meyer</a>."]
    ],
    footer: ["TREE-Studie", "Universität Bern", "Institut für Soziologie"]
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

function HTMLtexts() {

    d3.select("#descr_1")
        .html(vocab['descr_1']);

}

function HTMLfooter() {
    let footer = vocab.footer;
    d3.select("#tree")
        .html("<h5>" + footer[0] + "</h5>"
                + "<dd>" + footer[1] + "</dd>"
                + "<dd>" + footer[2] + "</dd>"
                + "<a class='small' href='https://www.tree.unibe.ch/'>www.tree.unibe.ch</a>");

}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}