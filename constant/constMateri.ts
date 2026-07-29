export const daftarMateri = [
  {
    id: 1,
    judul: "Idgham",
    status: "Pelajari",
    subMateri: [
      {
        id: 1,
        judul: "Idgham Bighunnah",
        pengertian:
          "Idgham Bighunnah adalah hukum bacaan ketika nun sukun atau tanwin bertemu huruf ي، ن، م، atau و sehingga dibaca melebur disertai dengung selama dua harakat.",

        huruf: ["ي", "ن", "م", "و"],

        ayat: "مِنْ وَالٍ",

        latin: "Min wālin",

        arti: "Pada lafaz ini, nun sukun bertemu huruf wau sehingga dibaca melebur dengan dengung.",

        caraBaca:
          "Nun sukun atau tanwin dilebur ke huruf setelahnya sambil didengungkan selama dua harakat.",

        selesai: false,
      },

      {
        id: 2,
        judul: "Idgham Bilaghunnah",
        pengertian:
          "Idgham Bilaghunnah adalah hukum bacaan ketika nun sukun atau tanwin bertemu huruf ل atau ر sehingga dibaca melebur tanpa dengung.",

        huruf: ["ل", "ر"],

        ayat: "مِنْ رَبِّهِمْ",

        latin: "Mir rabbihim",

        arti: "Nun sukun bertemu huruf ra sehingga dibaca melebur tanpa dengung.",

        caraBaca:
          "Nun sukun atau tanwin langsung dilebur tanpa mendengungkan suara.",

        selesai: false,
      },
    ],
  },

  {
    id: 2,
    judul: "Iqlab",
    status: "Terkunci",
    subMateri: [
      {
        id: 1,
        judul: "Iqlab",
        pengertian:
          "Iqlab adalah hukum bacaan ketika nun sukun atau tanwin bertemu huruf ب sehingga bunyi nun berubah menjadi mim disertai dengung.",

        huruf: ["ب"],

        ayat: "أَنْبِئْهُمْ",

        latin: "Ambi'hum",

        arti: "Nun sukun berubah menjadi bunyi mim karena bertemu huruf ba.",

        caraBaca: "Bacalah nun menjadi mim dengan dengung selama dua harakat.",

        selesai: false,
      },
    ],
  },

  {
    id: 3,
    judul: "Idzhar",
    status: "Terkunci",
    subMateri: [
      {
        id: 1,
        judul: "Idzhar Halqi",
        pengertian:
          "Idzhar Halqi terjadi ketika nun sukun atau tanwin bertemu salah satu huruf tenggorokan sehingga dibaca jelas tanpa dengung.",

        huruf: ["ء", "ه", "ع", "ح", "غ", "خ"],

        ayat: "مِنْ هَادٍ",

        latin: "Min hādin",

        arti: "Nun sukun bertemu huruf ha sehingga dibaca jelas.",

        caraBaca: "Nun sukun dibaca dengan jelas tanpa dengung.",

        selesai: false,
      },

      {
        id: 2,
        judul: "Idzhar Syafawi",
        pengertian:
          "Idzhar Syafawi terjadi ketika mim sukun bertemu semua huruf hijaiyah selain mim dan ba sehingga dibaca jelas. Huruf-huruf tersebut adalah selain",

        huruf: ["م", "ب"],

        ayat: "عَلَيْهِمْ قِتَالٌ",

        latin: "Alaihim qitālun",

        arti: "Mim sukun bertemu huruf qaf sehingga dibaca jelas.",

        caraBaca: "Mim sukun dibaca jelas tanpa dengung.",

        selesai: false,
      },
    ],
  },

  {
    id: 4,
    judul: "Ikhfa",
    status: "Terkunci",
    subMateri: [
      {
        id: 1,
        judul: "Ikhfa Haqiqi",
        pengertian:
          "Ikhfa Haqiqi terjadi ketika nun sukun atau tanwin bertemu salah satu dari lima belas huruf ikhfa sehingga dibaca samar disertai dengung.",

        huruf: [
          "ت",
          "ث",
          "ج",
          "د",
          "ذ",
          "ز",
          "س",
          "ش",
          "ص",
          "ض",
          "ط",
          "ظ",
          "ف",
          "ق",
          "ك",
        ],

        ayat: "مِنْ شَرِّ",

        latin: "Min syarri",

        arti: "Nun sukun bertemu huruf syin sehingga dibaca samar.",

        caraBaca: "Bacalah samar dengan dengung selama dua harakat.",

        selesai: false,
      },

      {
        id: 2,
        judul: "Ikhfa Syafawi",
        pengertian:
          "Ikhfa Syafawi terjadi ketika mim sukun bertemu huruf ba sehingga dibaca samar dengan dengung.",

        huruf: ["ب"],

        ayat: "تَرْمِيهِمْ بِحِجَارَةٍ",

        latin: "Tarmīhim bihijāratin",

        arti: "Mim sukun bertemu huruf ba sehingga dibaca samar.",

        caraBaca: "Mim sukun dibaca samar disertai dengung selama dua harakat.",

        selesai: false,
      },
    ],
  },

  {
    id: 5,
    judul: "Alif Lam",
    status: "Terkunci",
    subMateri: [
      {
        id: 1,
        judul: "Alif Lam Qamariyah",
        pengertian:
          "Alif Lam Qamariyah adalah hukum bacaan alif lam yang dibaca jelas karena bertemu salah satu huruf qamariyah.",

        huruf: [
          "ا",
          "ب",
          "ج",
          "ح",
          "خ",
          "ع",
          "غ",
          "ف",
          "ق",
          "ك",
          "م",
          "و",
          "هـ",
          "ي",
        ],

        ayat: "الْقَمَرُ",

        latin: "Al-qamaru",

        arti: "Huruf lam dibaca jelas karena bertemu huruf qaf.",

        caraBaca: "Bacalah huruf lam dengan jelas.",

        selesai: false,
      },

      {
        id: 2,
        judul: "Alif Lam Syamsiyah",
        pengertian:
          "Alif Lam Syamsiyah adalah hukum bacaan alif lam yang tidak dibaca karena melebur ke huruf syamsiyah.",

        huruf: [
          "ت",
          "ث",
          "د",
          "ذ",
          "ر",
          "ز",
          "س",
          "ش",
          "ص",
          "ض",
          "ط",
          "ظ",
          "ل",
          "ن",
        ],

        ayat: "الشَّمْسُ",

        latin: "Asy-syamsu",

        arti: "Huruf lam tidak dibaca karena melebur ke huruf syin.",

        caraBaca:
          "Huruf lam dilebur ke huruf setelahnya tanpa dibaca terpisah.",

        selesai: false,
      },
    ],
  },
];
