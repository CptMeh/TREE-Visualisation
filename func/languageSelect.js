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
    descr : ["Beschreibung", 
            "Visualisierung der TREE2-Studie",
            "Die Ergebnisse der ersten drei Befragungswellen der TREE2-Kohorte werden auf der obigen Karte visualisiert. Hierbei werden jeweils kantonal die Resultate in Prozent aufgeführt und farblich gekennzeichnet.", 
            "TREE-Studie", 
            "TREE (Transitionen von der Erstausbildung ins Erwerbsleben) ist eine gesamtschweizerische, längsschnittlich angelegte Befragung zum Übergang Jugendlicher von der Schule ins Erwachsenenleben (Transition). Im Zentrum der Untersuchung stehen die Ausbildungs- und Erwerbsverläufe nach Austritt aus der obligatorischen Schule. Die erste Stichprobe (TREE1) umfasst über 6'000 Jugendliche, die im Jahr 2000 am Projekt PISA (Programme for International Student Assessment) teilnahmen und im selben Jahr aus der obligatorischen Schulpflicht entlassen wurden. Die Stichprobe ist national nd sprachregional repräsentativ. Eine zweiteStichprobe (TREE2) von fast 10'000 Jugendlichen wird seit 2016 längsschnittlich befragt. Damit gehört TREE zu einer der weltweit wenigen Multi-Kohorten-Studien, welche kohortenvergleichende Analysen ermöglichen.",
            "Erklärung zu den Variablen",
            "",
            "Weiteres",
            "Diese Visualisierung wurde von Marlene Kulowatz und Ramon Näf als Projekt für die Vorlesung Open Data und Open Government an der Universität Bern im Frühjahressemester 2023 entwickelt. Die Daten zur TREE-Studie wurden von <a href='https://www.tree.unibe.ch/ueber_uns/personen/dr_meyer_thomas/index_ger.html'>Dr. Thomas Meyer</a> zur Verfügung gestellt."
            ],
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
    descr : ["Description", 
            "Visualization of the TREE2 Study",
            "The results of the first three survey waves of the TREE2 cohort are visualized on the map above. Here, the results are listed by canton in percentage and color-coded.", 
            "TREE Study", 
            "TREE (Transitions from initial education to working life) is a nationwide, longitudinal survey in Switzerland on the transition of young people from school to adult life (Transition). The focus of the study is on the educational and employment trajectories after leaving compulsory schooling. The first sample (TREE1) comprises over 6,000 young people who participated in the PISA (Programme for International Student Assessment) project in 2000 and were released from compulsory schooling in the same year. The sample is nationally and linguistically regionally representative. A second sample (TREE2) of almost 10,000 young people has been surveyed longitudinally since 2016. This makes TREE one of the few multi-cohort studies worldwide that allow cohort-comparative analyses.",
            "Explanation of the variables",
            "",
            "About",
            "This visualization was developed by Marlene Kulowatz and Ramon Näf as a project for the Open Data and Open Government lecture at the University of Bern in the Spring Semester 2023. The data for the TREE study was provided by <a href='https://www.tree.unibe.ch/ueber_uns/personen/dr_meyer_thomas/index_ger.html'>Dr. Thomas Meyer</a>."            
            ],
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
    descr : ["Description", 
            "Visualisation de l'étude TREE2",
            "Les résultats des trois premières vagues d'enquêtes de la cohorte TREE2 sont visualisés sur la carte ci-dessus. Les résultats sont présentés en pourcentage par canton et colorés en conséquence.", 
            "Étude TREE", 
            "TREE (Transitions de l'Éducation Initiale à la Vie Active) est une enquête longitudinale suisse sur la transition des jeunes de l'école à la vie adulte. L'étude se concentre sur les parcours éducatifs et professionnels après la fin de l'école obligatoire. La première échantillon (TREE1) comprend plus de 6'000 jeunes qui ont participé au projet PISA (Programme for International Student Assessment) en 2000 et ont terminé l'école obligatoire la même année. L'échantillon est représentatif au niveau national et linguistique. Un second échantillon (TREE2) de près de 10'000 jeunes est interrogé longitudinalement depuis 2016. Ainsi, TREE est l'une des rares études multi-cohortes au monde qui permet des analyses comparatives entre cohortes.",
            "Explication des variables",
            "",
            "Informations supplémentaires",
            "Cette visualisation a été développée par Marlene Kulowatz et Ramon Näf dans le cadre d'un projet pour le cours Données Ouvertes et Gouvernement Ouvert à l'Université de Berne au semestre de printemps 2023. Les données de l'étude TREE ont été fournies par <a href='https://www.tree.unibe.ch/ueber_uns/personen/dr_meyer_thomas/index_ger.html'>Dr. Thomas Meyer</a>."
            ],
};



function languageSelect() {
    const lang = localStorage.getItem('lang');        

    switch(lang) {
        case "0" : return germanVocab; break;
        case "1" : return englishVocab; break;
        case "2" : return frenchVocab; break;
        default : return germanVocab; break;

    }
}
