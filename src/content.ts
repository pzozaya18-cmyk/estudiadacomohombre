export const content = {
  es: {
    nav: { logo: "Nuevo Horizonte", lang: "es | en" },
    screens: [
      { id: 1, text: "66%\nde las\nmujeres\nreciben un\ndiagnóstico\nerróneo." },
      {
        id: 2,
        scrolls: [
          "Como la",
          "investigación",
          "médica está basada",
          "en el hombre,",
          "el sistema no está",
          "diseñado para dar",
          "respuesta",
          "a las necesidades de",
          "la mujer."
        ],
        mode: "karaoke_moments"
      },
      { id: 3, text: "LOS SIGNOS\nVARÍAN\nENTRE EL HOMBRE\nY LA\nMUJER.\nPOR ESO, MUCHAS\nMUJERES\nNO SON\nDETECTADAS." },
      { id: 4, text: "80%\nde\nmujeres\nautistas\nno tienen\ndiagnóstico" },
      {
        id: 5,
        sticky: "En lugar del diagnóstico en autismo,\nlas diagnostican con:",
        scrolls: ["Ansiedad.", "Depresión.", "Anorexia.", "Bulimia.", "Fatiga Crónica.", "TOC.", "Bipolaridad.", "TDAH.", "Trastornos del sueño."],
        footer: "Siempre es\n“otra cosa”."
      },
      {
        id: 6,
        sticky: "O se descarta como:",
        scrolls: ["“Solo es estrés.”", "“Estás exagerando.”", "“Solo es tímida.”", "“Son las hormonas.”"],
        footer: ""
      },
      {
        id: 7,
        layout: 'comparison',
        top: 'El diagnóstico en mujeres es',
        middle: '3 veces\nmenos',
        bottom: 'probable que en hombres.'
      },
      {
        id: 7.1,
        layout: 'comparison',
        top: 'Sin embargo, los hombres tienen',
        middle: '10 veces\nmás',
        bottom: 'probabilidades de recibir\nun diagnóstico.'
      },
      {
        id: 8,
        sticky: "Frecuentemente la persona con autismo\ntiene mayor riesgo de:",
        scrolls: ["Epilepsia", "Problemas inmunológicos", "Problemas gastrointestinales", "Obesidad", "Diabetes"],
        footer: ""
      },
      {
        id: 9,
        sticky: "Son especialmente vulnerables\nA la violencia\nFísica,\nSexual,\nY digital",
        scrolls: [],
        footer: "",
        accumulate: true
      },
      {
        id: 10,
        layout: 'beats',
        beats: [
          { text: "ESTOS RIESGOS\nSON REALES.", highlight: "REALES" },
          { text: "PERO LAS" },
          { text: "MUJERES", highlight: "MUJERES" },
          { text: "SE ENFRENTAN" },
          { text: "A ALGO", highlight: "ALGO" },
          { text: "MÁS.", highlight: "MÁS." }
        ]
      },
      {
        id: 11,
        layout: 'beats',
        beats: [
          { text: "ALGUNAS MUJERES\nNUNCA\nSON\nDIAGNOSTICADAS.", highlight: "NUNCA DIAGNOSTICADAS" },
          { text: "A OTRAS\nSE LES REDUCE" },
          { text: "A UN SOLO\nDIAGNÓSTICO\nGENERALIZADO", highlight: "SOLO DIAGNÓSTICO GENERALIZADO" },
          { text: "QUE PASA POR ALTO\nEL AUTISMO.", highlight: "EL AUTISMO" }
        ]
      },
      {
        id: 12,
        layout: 'beats',
        beats: [
          { text: "PARA MUCHAS\nMUJERES AUTISTAS\nQUE SÍ SON DIAGNOSTICADAS,", highlight: "SÍ MUJERES AUTISTAS" },
          { text: "EL AUTISMO\nSE CONVIERTE\nEN LO ÚNICO\nQUE SE VE.", highlight: "ÚNICO" },
          { text: "TODO LO DEMÁS\nES IGNORADO.", highlight: "IGNORADO" }
        ]
      },
      {
        id: 13,
        layout: 'beats',
        beats: [
          { text: "LA MOLESTIA.\nNUEVOS SÍNTOMAS." },
          { text: "CAMBIOS\nHORMONALES." },
          { text: "MENOPAUSIA." },
          { text: "ENFERMEDADES\nCRÓNICAS." },
          { text: "TODO LO DEMÁS\nSE DESCARTA:" },
          { text: "“ES SOLO\nSU AUTISMO.”", isCard: true }
        ]
      },
      {
        id: 14,
        layout: 'beats',
        beats: [
          { text: "EL AUTISMO\nECLIPSA\nTODO LO DEMÁS.", highlight: "ECLIPSA" }
        ]
      },
      {
        id: 15,
        layout: 'beats',
        beats: [
          { text: "EN ESPECIAL\nCUANDO ELLA\nNO PUEDE\nVERBALIZARLO.", highlight: "VERBALIZARLO" }
        ]
      },
      {
        id: 16,
        layout: 'beats',
        beats: [
          { text: "MUCHAS MUJERES\nAUTISTAS\nNO PUEDEN\nEXPRESAR\nLO QUE LES PASA.\n\nCOMO SI\nNO PASARA\nNADA.", highlight: "NO PASARA NADA" }
        ]
      },
      {
        id: 17,
        layout: 'beats',
        beats: [
          { text: "#EstudiadaComoHombre", highlight: "EstudiadaComoHombre" },
          { text: "Si te estudian\ncon perspectiva de hombre,\n\nel resultado es que serás\nincomprendida." }
        ]
      },
      {
        id: 18,
        layout: 'beats',
        beats: [
          { text: "SI NO SE LE" },
          { text: "ESTUDIA,", highlight: "ESTUDIA" },
          { text: "ENTIENDE,", highlight: "ENTIENDE" },
          { text: "APOYA.", highlight: "APOYA" }
        ]
      },
      {
        id: 19,
        layout: 'final',
        text: "LA ASOCIACIÓN\nNUEVO HORIZONTE\nTRABAJA PARA\nCAMBIAR ESTO.",
        cta: "INFÓRMATE.",
        ctaUrl: "https://www.nuevohorizonte.es/",
        subtext: "Ayuda a reconocerla.\nAyuda a investigar\ncon perspectiva de género\npara que no quede invisible\ny sin apoyo,\nespecialmente aquellas\ncon grandes necesidades."
      }
    ]
  },
  en: {
    nav: { logo: "Nuevo Horizonte", lang: "es | en" },
    screens: [
      { id: 1, text: "66%\nOf\nWomen\nReceive a\nMisdiagnosis." },
      {
        id: 2,
        scrolls: [
          "Because medical research is based on men,",
          "the system is not designed to respond",
          "to women’s needs."
        ],
        mode: "karaoke_moments"
      },
      { id: 3, text: "THE SIGNS PRESENT DIFFERENTLY\nIN MEN AND WOMEN.\nTHAT’S WHY MANY\nWOMEN\nGO UNDETECTED." },
      { id: 4, text: "80%\nof\nautistic\nwomen\ngo through life\nundiagnosed." },
      {
        id: 5,
        sticky: "Instead of an autism diagnosis,\nthey are diagnosed with:",
        scrolls: ["Anxiety.", "Depression.", "Anorexia.", "Bulimia.", "Chronic fatigue.", "OCD.", "Bipolar disorder.", "ADHD.", "Sleep disorders."],
        footer: "It’s always\n“something else.”"
      },
      {
        id: 6,
        sticky: "Or it gets dismissed as:",
        scrolls: ["“It’s just stress.”", "“You’re exaggerating.”", "“She’s just shy.”", "“It’s hormonal.”"],
        footer: ""
      },
      {
        id: 7,
        layout: 'comparison',
        top: 'Women are',
        middle: '3x LESS',
        bottom: 'likely\nto receive\nan autism diagnosis.'
      },
      {
        id: 7.1,
        layout: 'comparison',
        top: 'Meanwhile, men are',
        middle: '10x MORE',
        bottom: 'likely\nto be\ndiagnosed.'
      },
      {
        id: 8,
        sticky: "People with autism\nare at higher risk of:",
        scrolls: ["Epilepsy", "Immunological issues", "Gastrointestinal problems", "Obesity", "Diabetes"],
        footer: ""
      },
      {
        id: 9,
        sticky: "They are especially vulnerable\nTo physical,\nSexual,\nAnd digital violence",
        scrolls: [],
        footer: "",
        accumulate: true
      },
      {
        id: 10,
        layout: 'beats',
        beats: [
          { text: "THESE RISKS\nARE REAL.", highlight: "REAL" },
          { text: "BUT" },
          { text: "WOMEN", highlight: "WOMEN" },
          { text: "FACE" },
          { text: "SOMETHING", highlight: "SOMETHING" },
          { text: "ELSE TOO.", highlight: "ELSE" }
        ]
      },
      {
        id: 11,
        layout: 'beats',
        beats: [
          { text: "SOME WOMEN\nARE NEVER\nDIAGNOSED.", highlight: "NEVER DIAGNOSED" },
          { text: "OTHERS\nARE REDUCED" },
          { text: "TO A SINGLE\nGENERALIZED\nDIAGNOSIS", highlight: "SINGLE GENERALIZED DIAGNOSIS" },
          { text: "THAT OVERLOOKS\nAUTISM.", highlight: "AUTISM" }
        ]
      },
      {
        id: 12,
        layout: 'beats',
        beats: [
          { text: "FOR MANY\nAUTISTIC WOMEN\nWHO ARE DIAGNOSED,", highlight: "ARE AUTISTIC WOMEN" },
          { text: "AUTISM\nBECOMES THE\nONLY THING\nPEOPLE SEE.", highlight: "ONLY" },
          { text: "EVERYTHING ELSE\nGETS IGNORED.", highlight: "IGNORED" }
        ]
      },
      {
        id: 13,
        layout: 'beats',
        beats: [
          { text: "PAIN.\nNEW SYMPTOMS." },
          { text: "HORMONAL\nCHANGES." },
          { text: "MENOPAUSE." },
          { text: "CHRONIC\nILLNESS." },
          { text: "EVERYTHING GETS\nDISMISSED AS:" },
          { text: "“IT’S JUST\nHER AUTISM.”", isCard: true }
        ]
      },
      {
        id: 14,
        layout: 'beats',
        beats: [
          { text: "AUTISM\nECLIPSES\nEVERYTHING ELSE.", highlight: "ECLIPSES" }
        ]
      },
      {
        id: 15,
        layout: 'beats',
        beats: [
          { text: "ESPECIALLY\nWHEN SHE\nCANNOT\nVERBALIZE IT.", highlight: "VERBALIZE" }
        ]
      },
      {
        id: 16,
        layout: 'beats',
        beats: [
          { text: "MANY AUTISTIC\nWOMEN\nCANNOT EXPRESS\nWHAT IS HAPPENING\nTO THEM.\n\nAS IF NOTHING\nWERE WRONG.", highlight: "NOTHING WRONG" }
        ]
      },
      {
        id: 17,
        layout: 'beats',
        beats: [
          { text: "#StudiedLikeAMan", highlight: "StudiedLikeAMan" },
          { text: "When women are studied\nthrough a male perspective,\n\nthe result is\nmisunderstanding." }
        ]
      },
      {
        id: 18,
        layout: 'beats',
        beats: [
          { text: "IF SHE IS NOT" },
          { text: "STUDIED,", highlight: "STUDIED" },
          { text: "UNDERSTOOD,", highlight: "UNDERSTOOD" },
          { text: "SUPPORTED.", highlight: "SUPPORTED" }
        ]
      },
      {
        id: 19,
        layout: 'final',
        text: "ASOCIACIÓN\nNUEVO HORIZONTE\nIS WORKING TO\nCHANGE THAT.",
        cta: "LEARN MORE.",
        ctaUrl: "https://www.nuevohorizonte.es/",
        subtext: "Help recognize autistic women.\nHelp advance research\nthrough a gender perspective\nso they are not left invisible\nor unsupported,\nespecially those\nwith higher support needs."
      }
    ]
  }
};
