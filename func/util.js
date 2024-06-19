// German Vocabulary
const germanVocab = {
    GR : "Deutsch",
    FR : "Französisch",
    IT : "Italienisch",
    EN : "Englisch",
    Kanton: "Kanton",
    coloring: "Färbung",
    selected: "Ausgewählte",
    survey_wave: "Befragungswelle",
    wave: "Welle",
    NET: "Nicht in Ausbildung",
    GE: "Allgemeinbildung",
    VET: "Berufsbildung",
    IS: "Zwischenlösung",
    table_head : 'Gesammtschweizerische Verteilung',
    table_lang : 'Verteilung nach Sprachregion',
    drop_down_label : "Wähle eine Ausbildungskategorie aus...",
    banner_title : "Ausbildungsstatus der zweiten TREE-Kohorte nach Kanton",
    map : "Karte",
    dev : "Entwickler",
    lang : "Sprache",
    map_title : "Ausbildungssituation der 2. TREE-Kohorte nach Kanton",
    cnt : "Weiters",
    descr : [["Beschreibung"], 
            ["Ausbildungssituation der 2. TREE-Kohorte nach Kanton",
            "Die interaktiven Karten veranschaulichen die Ausbildungssituation der 2. TREE-Kohorte (TREE2) nach Befragungswelle und Kanton. Wählen Sie im Dropdown-Menu eine der vier Ausbildungssituationen aus \
	        (Allgemeinbildung, Berufsbildung, Zwischenlösung und nicht in Ausbildung). \
            Die Tabelle rechts der Karten zeigt Ihnen für die Schweiz als Ganzes, wie sich die TREE2-Befragten prozentual auf die Ausbildungssituationen verteilen. \
	        Wenn Sie mit dem Cursor-Pfeil über die einzelnen Kantone auf der Karte streichen, wird Ihnen die Verteilung im überstrichenen Kanton angezeigt. \
            Die im Dropdown-Menu ausgewählte Ausbildungssituation ist jeweils rot hervorgehoben. \
	        Wenn ein Kanton mit einer Schraffur auf weissem Hintergrund angezeigt wird, heisst das, dass für diesen Kanton zu wenig Fälle vorhanden sind, um statistische Aussagen machen zu können."
            ],
            
            ["Zu den einzelnen Ausbildungssituationen",
            "<ul>\
	        <li><strong>Berufsbildung:</strong> 2-4jährige Berufslehre (Eidgenössisches Berufsattest (EBA) oder Eidgenössisches Fähigkeitszeugnis (EFZ, inkl. Berufsmaturität 1).</li>\
            <li><strong>Allgemeinbildung:</strong> Gymnasium, Fachmittelschule u.ä..</li>\
            <li><strong>Zwischenlösung:</strong> 10. Schuljahr, Praktikum Vorlehre, Motivationssemester u.ä..</li>\
            <li><strong>Nicht in Ausbildung:</strong> Nicht in einer formalen Ausbildung.</li>\
	        </ul>"
            ],

            ["TREE-Studie", 
            "TREE (Transitionen von der Erstausbildung ins Erwerbsleben) ist eine schweizweite Längsschnittstudie, die den Übergang von Jugendlichen von der Schule ins Erwachsenenleben (Transition) untersucht. \
            Im Fokus der Studie stehen Ausbildungs- und Erwerbsverläufe nach dem Ende der obligatorischen Schule. Die hier dargestellten Ergebnisse beziehen sich auf die 2. TREE-Kohorte (TREE2), \
            welche 2016 aus der obligatorischen Schulpflicht entlassen wurde. Sie beziehen sich auf die Ausbildungssituation zum Zeitpunkt der jeweiligen Befragungswelle:\
            <ul>\
            <li><strong>Welle 1:</strong> Erstes Jahr nach Ende der obligatorischen Schulzeit (2017, Durchschnittsalter 16-17 Jahre).</li>\
            <li><strong>Welle 2:</strong> Zweites Jahr nach Ende der obligatorischen Schulzeit (2018, Durchschnittsalter 17-18 Jahre).</li>\
            <!--usw.--></ul>"
            ],
            
            ["Weitere Informationen",
            "Diese Visualisierung wurde von Marlene Kulowatz und Ramon Näf als Projekt für die Vorlesung \"Open Data and Open Government\" an der Universität Bern im \
            Frühjahrssemester 2023 erarbeitet."
            ]
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
    coloring: "Colouring",
    selected: "selected",
    survey_wave : "panel wave",
    wave: "Wave",
    NET: "Not in education or training",
    GE: "General education",
    VET: "Vocational education & training",
    IS: "Intermediate solution",
    table_head: 'Distribution at national level',
    table_lang : 'Distribution by language region',
    drop_down_label : "Select a type of education...",
    banner_title : "Educational status of the 2nd TREE cohort by canton",
    map : "Map",
    dev : "Developers",
    lang : "Language",
    map_title : "Educational status of the 2nd TREE cohort by canton",
    cnt : "Continued",
    descr : [
        ["Description"], 
        ["Educational status of the 2nd TREE cohort by canton",
        "The interactive maps illustrate the training situation of the 2nd TREE cohort (TREE2) by survey wave and canton. Select one of the four training situations \"General education\", \"Vocational education & training\", \"Intermediate solution\", and \"Not in education or training\" in the dropdown menu above the map. \
        The table on the right side of the maps informs you about the percentage distribution at national level. If you move the cursor arrow over a given canton on the map, the distribution in the respective canton is displayed. \
        The category you've selected in the drop-down menu is highlighted in red. If a canton is displayed with hatching on a white background, this means that there are too few cases for this canton to allow for reliable statistics."],
            
        ["Categories of educational status",
        "<ul>\
        <li><strong>Vocational education & training:</strong> 2-4-year VET programmes, including Federal Vocational Certificate (EBA), Federal Certificate of Competence (EFZ), and Vocational Baccalaureate (VB, type 1).</li>\
        <li><strong>General education:</strong> academic baccalaureate schools.</li>\
        <li><strong>Intermediate solution:</strong> Transitional programmes such as a 10th school year or preparatory internships.</li>\
        <li><strong>Not in education or training:</strong> No attendance of any formal education programme.</li>\
        </ul>"
        ],

        ["TREE study", 
        "TREE (Transitions from Education to Employmnt) is a large panel survey following up compulsory school leavers from all over Switzerland through their post-compulsory education and training and into employment and adulthood. \
        The study focuses on post-compulsory educational and occupational pathways. The results presented here relate to the 2nd TREE cohort (TREE2), which left compulsory education in 2016. They relate to the educational situation at the time of the respective panel wave: \
        <ul>\
        <li><strong>Panel wave 1:</strong> First year after compulsory school (2017, average age 16-17).</li>\
        <li><strong>Panel wave 2:</strong> Second years after compulsory school (2018, average age 17-18).</li>\
        <!--etc.--></ul>"
        ],

        ["Additional Information",
        "This visualization was designed in the context of the course \"Open Data and Open Government\" at the University of Bern in the spring semester of 2023 by Marlene Kulowatz and Ramon Näf."
        ]],
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
    survey_wave : "Vague d'enquête",
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
    map_title: "Situation formative de la 2e cohorte TREE (TREE2) par canton",
    cnt: "Continuer",
    descr: [
        ["Description"],
        ["Situation formative de la 2e cohorte TREE (TREE2) par canton",
        "Les cartes interactives illustrent la situation de formation de la 2e cohorte TREE (TREE2) par vague d'enquête et par canton. Sélectionnez dans le menu déroulant l'une des quatre situations de formation \
	    (formation générale, formation professionnelle, solution intermédiaire et pas en formation). \
        Le tableau à droite des cartes vous montre, pour la Suisse dans son ensemble, la distribution des personnes interrogées dans le cadre de TREE2 à travers les situations de formation. \
	    Si vous passez la flèche du curseur sur un canton donné dans la carte, la répartition dans le canton en question s'affiche. \
        La situation de formation sélectionnée dans le menu déroulant est toujours mise en évidence en rouge. \
	    Si un canton est affiché avec une hachure sur fond blanc, cela signifie que le nombre de cas pour ce canton est trop petit pour élaborer des statistiques."
        ],

        ["Situation formative",
        "<ul>\
        <li><strong>Formation professionnelle:</strong> Attestation Fédérale de Formation Professionnelle (AFP), Certificat Fédéral de Capacité (CFC; y inclue maturité professionnelle du type 1).</li>\
        <li><strong>Formation générale:</strong> Lycée, école de culture générale ou similaire.</li>\
        <li><strong>Solution transitoire:</strong> 10e année scolaire, stage, préapprentissage, semestre de motivation ou similaire.</li>\
        <li><strong>Pas en formation:</strong> Aucune activité formative dans un programme de formation formel.</li>\
        </ul>"
        ],

        ["Etudié TREE",
        "TREE (Transitions from Education to Employment) est une grande enquête de panel suivant les jeunes ayant terminé leur scolarité obligatoire dans toute la Suisse à travers leur formation post-obligatoire et leur entrée dans l'emploi et l'âge adulte. \
        L'étude se concentre sur les parcours éducatifs et professionnels post-obligatoires. Les résultats présentés ici concernent la 2e cohorte de TREE (TREE2), qui a terminé l'enseignement obligatoire en 2016. Ils se rapportent à la situation éducative au moment de chaque vague du panel : \
        <ul>\
        <li><strong>Vague du panel 1 :</strong> Première année après l'école obligatoire (2017, âge moyen 16-17 ans).</li>\
        <li><strong>Vague du panel 2 :</strong> Deuxième année après l'école obligatoire (2018, âge moyen 17-18 ans).</li>\
        <!--etc.--></ul>"
        ],

        ["Information complémentaire",
        "Cette visualisation a été réalisée dans le cadre du cours \"Open Data and Open Government\" à l'Université de Berne en 2023 par Marlene Kulowatz et Ramon Näf."
        ]],
    footer: ["Etude TREE", "Université de Berne", "Institut de sociologie"]
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