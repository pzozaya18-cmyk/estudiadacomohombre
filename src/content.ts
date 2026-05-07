export const content = {
  es: {
    nav: { logo: "Nuevo Horizonte", lang: "es | en" },
    screens: [
      { id: 1, text: "##66%\nDE LAS\n#MUJERES\nRECIBEN UN\n#DIAGNÓSTICO\n#ERRÓNEO" },
      { 
        id: 2, 
        scrolls: [
          "Como la investigación médica está basada en el hombre",
          "el sistema no está diseñado para acomodar a la mujer."
        ],
        mode: "karaoke_moments"
      },
      { id: 3, text: "Los signos varían\nentre el hombre\ny la mujer.\n\nPor eso, muchas\nmujeres no son\ndetectadas." },
      { id: 4, text: "##80%\nDE MUJERES\n#AUTISTAS\nPASAN SU VIDA\n###SIN DIAGNOSTICAR" },
      { 
        id: 5, 
        sticky: "EN VEZ, LAS DIAGNOSTICAN CON:", 
        scrolls: ["ANSIEDAD", "CANSANCIO", "DEPRESIÓN", "ANOREXIA", "BULIMIA", "FATIGA CRÓNICA", "TOC", "BIPOLARIDAD", "TDAH", "TRASTORNOS DEL SUEÑO"],
        footer: "Siempre es\n“otra cosa”."
      },
      { 
        id: 6, 
        sticky: "O SE DESCARTA COMO:", 
        scrolls: ["“SOLO ES ESTRÉS”", "“ESTÁS EXAGERANDO”", "“SOLO ES TÍMIDA”", "“ERES DEMASIADO”", "“SON LAS HORMONAS”"],
        footer: ""
      },
      { 
        id: 7, 
        layout: 'comparison',
        top: 'LA MUJER ES',
        middle: '3 VECES',
        bottom: 'MENOS PROBABLE\nDE SER\nDIAGNOSTICADA\nCON AUTISMO.'
      },
      { 
        id: 7.1, 
        layout: 'comparison',
        top: 'EL HOMBRE ES',
        middle: '10 VECES',
        bottom: 'MÁS PROBABLE\nA RECIBIR\nUNA EVALUACIÓN'
      },
      { 
        id: 8, 
        sticky: "TODA PERSONA CON AUTISMO ESTÁ A MAYOR RIESGO DE:", 
        scrolls: ["EPILEPSIA", "PROBLEMAS INMUNOLÓGICOS", "PROBLEMAS GASTROINTESTINALES", "OBESIDAD", "DIABETES", "PARKINSON"],
        footer: ""
      },
      { 
        id: 9, 
        sticky: "Son\nvulnerables\na la\nviolencia", 
        scrolls: ["física,", "sexual,", "y digital"],
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
          { text: "ENFRENTAN" },
          { text: "ALGO", highlight: "ALGO" },
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
          { text: "LA MOLESTIA\nNUEVOS SÍNTOMAS" },
          { text: "CAMBIOS\nHORMONALES" },
          { text: "MENOPAUSIA" },
          { text: "ENFERMEDADES\nCRÓNICAS" },
          { text: "TODO LO DEMÁS\nSE DESCARTA" },
          { text: "“ES SOLO\nSU AUTISMO”", isCard: true }
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
          { text: "EN ESPECIAL\nCUANDO ELLA\nNO PUEDE\nVOCALIZARLO.", highlight: "VOCALIZARLO" }
        ]
      },
      { 
        id: 16, 
        layout: 'beats',
        beats: [
          { text: "MUCHAS MUJERES\nAUTISTAS\nNO\nPUEDEN\nEXPRESAR\nLO QUE LES\nPASA.\n\nASÍ QUE\nNADA\nSE TRATA.", highlight: "NADA SE TRATA" }
        ]
      },
      { 
        id: 17, 
        layout: 'beats',
        beats: [
          { text: "#Estudiada\nComo\nHombre", highlight: "Estudiada" },
          { text: "Estudiada como hombre,\nIncomprendida como resultado." }
        ]
      },
      { 
        id: 18, 
        layout: 'beats',
        beats: [
          { text: "NO SE LE" }, // Sticky part (Index 0)
          { text: "ESTUDIA,", highlight: "ESTUDIA" },
          { text: "ENTIENDE,", highlight: "ENTIENDE" },
          { text: "APOYA.", highlight: "APOYA" }
        ]
      },
      {
        id: 19,
        layout: 'final',
        text: "LA ASOCIACIÓN\nNUEVO HORIZONTE\nTRABAJA PARA\nCAMBIAR ESTO.",
        cta: "INFÓRMATE",
        ctaUrl: "https://www.nuevohorizonte.es/",
        subtext: "Ayuda a reconocerla en estudios médicos\npara que no quede invisible y sin apoyo."
      }
    ]
  },
  en: {
    nav: { logo: "Nuevo Horizonte", lang: "es | en" },
    screens: [
      { id: 1, text: "##66%\nOF ALL\n#WOMEN\nARE\n#MISDIAGNOSED" },
      { 
        id: 2, 
        scrolls: [
          "Because The Research is Based On Men.",
          "Women don’t match what the medical system expects."
        ],
        mode: "karaoke_moments"
      },
      { id: 3, text: "The Signs Look\nDifferent From Men\nThan Women.\n\nSo women\nget missed." },
      { id: 4, text: "##80%\nOF AUTISTIC\n#WOMEN\nARE NEVER\n###DIAGNOSED" },
      { 
        id: 5, 
        sticky: "THEY GET RELABELED AS:", 
        scrolls: ["BURNOUT", "ANXIETY", "DEPRESSION", "EATING DISORDERS", "SENSORY OVERLOAD", "CHRONIC FATIGUE", "OCD", "BIPOLAR", "ADHD", "SLEEP DISORDERS", "PSYCHOSOMATIC SYMPTOMS"],
        footer: "Always,\n“It’s something else”"
      },
      { 
        id: 6, 
        sticky: "OR IT GETS DISMISSED AS:", 
        scrolls: ["“IT’S JUST STRESS”", "“YOU’RE OVERREACTING”", "“SHE’S SHY”", "“TOO MUCH”", "“TOO HORMONAL”"],
        footer: ""
      },
      { 
        id: 7, 
        layout: 'comparison',
        top: 'WOMEN ARE',
        middle: '3X',
        bottom: 'LESS LIKELY\nTO BE\nDIAGNOSED\nWITH AUTISM.'
      },
      { 
        id: 7.1, 
        layout: 'comparison',
        top: 'BOYS ARE',
        middle: '10X',
        bottom: 'MORE LIKELY\nTO BE\nREFERRED\nFOR EVALUATION'
      },
      { 
        id: 8, 
        sticky: "ALL PEOPLE WITH AUTISM ARE AT HIGHER RISK OF:", 
        scrolls: ["EPILEPSY", "IMMUNOLOGICAL ISSUES", "GASTROINTESTINAL PROBLEMS", "OBESITY", "DIABETES", "PARKINSON’S DISEASE"],
        footer: ""
      },
      { 
        id: 9, 
        sticky: "They are\nvulnerable\nto\nviolence", 
        scrolls: ["physical,", "sexual,", "and digital"],
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
          { text: "ELSE.", highlight: "ELSE." }
        ]
      },
      { 
        id: 11, 
        layout: 'beats',
        beats: [
          { text: "SOME WOMEN\nARE NEVER\nDIAGNOSED.", highlight: "NEVER DIAGNOSED" },
          { text: "OTHERS\nARE REDUCED" },
          { text: "TO ONLY ONE\nGENERALIZED\nDIAGNOSIS", highlight: "ONLY ONE GENERALIZED DIAGNOSIS" },
          { text: "THAT OVERLOOKS\nAUTISM.", highlight: "AUTISM" }
        ]
      },
      { 
        id: 12, 
        layout: 'beats',
        beats: [
          { text: "FOR MANY\nAUTISTIC WOMEN\nWHO ARE DIAGNOSED,", highlight: "ARE AUTISTIC WOMEN" },
          { text: "AUTISM\nBECOMES THE\nONLY THING\nSEEN.", highlight: "ONLY" },
          { text: "EVERYTHING ELSE\nIS IGNORED.", highlight: "IGNORED" }
        ]
      },
      { 
        id: 13, 
        layout: 'beats',
        beats: [
          { text: "PAIN\nNEW SYMPTOMS" },
          { text: "HORMONAL\nCHANGES" },
          { text: "MENOPAUSE" },
          { text: "CHRONIC\nILLNESS" },
          { text: "EVERYTHING ELSE\nIS DISMISSED" },
          { text: "“IT’S JUST\nHER AUTISM”", isCard: true }
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
          { text: "ESPECIALLY\nWHEN SHE\nCAN’T EXPLAIN IT.", highlight: "EXPLAIN" }
        ]
      },
      { 
        id: 16, 
        layout: 'beats',
        beats: [
          { text: "MANY AUTISTIC\nWOMEN CAN’T\nSAY WHAT’S WRONG.\n\nSO NOTHING\nGETS TREATED.", highlight: "NOTHING TREATED" }
        ]
      },
      { 
        id: 17, 
        layout: 'beats',
        beats: [
          { text: "#Studied\nLike\nA Man", highlight: "Studied" },
          { text: "Studied like a man,\nWomen misunderstood as a result." }
        ]
      },
      { 
        id: 18, 
        layout: 'beats',
        beats: [
          { text: "SHE’S NOT" }, // Sticky part (Index 0)
          { text: "STUDIED,", highlight: "STUDIED" },
          { text: "UNDERSTOOD,", highlight: "UNDERSTOOD" },
          { text: "SUPPORTED.", highlight: "SUPPORTED" }
        ]
      },
      {
        id: 19,
        layout: 'final',
        text: "ASOCIACIÓN\nNUEVO HORIZONTE\nWORKS TO\nCHANGE THAT.",
        cta: "LEARN MORE",
        ctaUrl: "https://www.nuevohorizonte.es/",
        subtext: "Help doctors recognize her in medical studies\nso she doesn’t remain invisible and without support."
      }
    ]
  }
};
