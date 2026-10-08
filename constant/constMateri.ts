import { getMateriAudioUrl } from "@/lib/quranAudio";

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

        cara_baca:
          "Nun sukun atau tanwin dilebur ke huruf setelahnya sambil didengungkan selama dua harakat.",
        audio_url: getMateriAudioUrl(1, 1, 1),

        selesai: false,
      },

      {
        id: 2,
        judul: "Idgham Bilaghunnah",
        pengertian:
          "Idgham Bilaghunnah adalah hukum bacaan ketika nun sukun atau tanwin bertemu huruf ل atau ر sehingga dibaca melebur tanpa dengung.",

        huruf: ["ل", "ر"],

        ayat: "مِنْ رَبِّهِمْ",

        cara_baca:
          "Nun sukun atau tanwin langsung dilebur tanpa mendengungkan suara.",
        audio_url: getMateriAudioUrl(1, 1, 2),

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

        cara_baca: "Bacalah nun menjadi mim dengan dengung selama dua harakat.",
        audio_url: getMateriAudioUrl(2, 1, 1),

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

        cara_baca: "Nun sukun dibaca dengan jelas tanpa dengung.",
        audio_url: getMateriAudioUrl(1, 2, 1),

        selesai: false,
      },

      {
        id: 2,
        judul: "Idzhar Syafawi",
        pengertian:
          "Idzhar Syafawi terjadi ketika mim sukun bertemu semua huruf hijaiyah selain mim dan ba sehingga dibaca jelas. Huruf-huruf tersebut adalah selain",

        huruf: ["م", "ب"],

        ayat: "عَلَيْهِمْ قِتَالٌ",

        cara_baca: "Mim sukun dibaca jelas tanpa dengung.",
        audio_url: getMateriAudioUrl(2, 1, 2),

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

        cara_baca: "Bacalah samar dengan dengung selama dua harakat.",
        audio_url: getMateriAudioUrl(4, 1, 1),

        selesai: false,
      },

      {
        id: 2,
        judul: "Ikhfa Syafawi",
        pengertian:
          "Ikhfa Syafawi terjadi ketika mim sukun bertemu huruf ba sehingga dibaca samar dengan dengung.",

        huruf: ["ب"],

        ayat: "تَرْمِيهِمْ بِحِجَارَةٍ",

        cara_baca:
          "Mim sukun dibaca samar disertai dengung selama dua harakat.",
        audio_url: getMateriAudioUrl(6, 1, 1),

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

        cara_baca: "Bacalah huruf lam dengan jelas.",
        audio_url: getMateriAudioUrl(10, 1, 1),

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

        cara_baca:
          "Huruf lam dilebur ke huruf setelahnya tanpa dibaca terpisah.",
        audio_url: getMateriAudioUrl(91, 1, 1),

        selesai: false,
      },
    ],
  },
];
