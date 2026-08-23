type Kuis = {
  id: number;
  level: number;
  ayat: string;

  surah?: number;
  nomorAyat?: number;
  audioPositions?: number[];

  audio?: string[];

  soal: string;
  pilihan: string[];
  jawaban: string;
};


export const constKuis: Kuis[] = [
  // =========================
  // LEVEL 1
  // =========================
  {
    id: 1,
    level: 1,
    ayat: "مِنْ بَعْدِ",

    // sumber audio
    surah: 2,
    nomorAyat: 27,

    // posisi kata per-ayat
    audioPositions: [1, 6],

    audio: [
      "https://cdn.islamic.app/quran/audio-word/2/27/6.mp3",
      "https://cdn.islamic.app/quran/audio-word/2/27/7.mp3",
    ],
    soal: "Nun sukun bertemu huruf Ba hukumnya?",
    pilihan: ["Ikhfa", "Iqlab", "Idzhar", "Idgom"],
    jawaban: "Iqlab",
  },
  {
    id: 2,
    level: 1,
    ayat: "مِنْ هَادٍ",
    soal: "Nun sukun bertemu huruf Ha hukumnya?",
    pilihan: ["Ikhfa", "Idgom", "Iqlab", "Idzhar"],
    jawaban: "Idzhar",
  },
  {
    id: 3,
    level: 1,
    ayat: "مِنْ مَالٍ",
    soal: "Nun sukun bertemu huruf Mim hukumnya?",
    pilihan: ["Idzhar", "Idgom", "Iqlab", "Ikhfa"],
    jawaban: "Idgom",
  },
  {
    id: 4,
    level: 1,
    ayat: "مِنْ كُلِّ",
    soal: "Nun sukun bertemu huruf Kaf hukumnya?",
    pilihan: ["Idzhar", "Iqlab", "Ikhfa", "Idgom"],
    jawaban: "Ikhfa",
  },
  {
    id: 5,
    level: 1,
    ayat: "الشَّمْسُ",
    soal: "Alif Lam pada kata di atas termasuk?",
    pilihan: ["Qamariyah", "Ikhfa", "Syamsiyah", "Idgom"],
    jawaban: "Syamsiyah",
  },
  {
    id: 6,
    level: 1,
    ayat: "الْقَمَرُ",
    soal: "Alif Lam pada kata di atas termasuk?",
    pilihan: ["Syamsiyah", "Idzhar", "Ikhfa", "Qamariyah"],
    jawaban: "Qamariyah",
  },
  {
    id: 7,
    level: 1,
    ayat: "مِنْ عِلْمٍ",
    soal: "Nun sukun bertemu Ain hukumnya?",
    pilihan: ["Ikhfa", "Iqlab", "Idzhar", "Idgom"],
    jawaban: "Idzhar",
  },
  {
    id: 8,
    level: 1,
    ayat: "مِنْ يَقُولُ",
    soal: "Nun sukun bertemu Ya hukumnya?",
    pilihan: ["Idzhar", "Ikhfa", "Idgom", "Iqlab"],
    jawaban: "Idgom",
  },
  {
    id: 9,
    level: 1,
    ayat: "مِنْ تَحْتِ",
    soal: "Nun sukun bertemu Ta hukumnya?",
    pilihan: ["Idgom", "Ikhfa", "Idzhar", "Iqlab"],
    jawaban: "Ikhfa",
  },
  {
    id: 10,
    level: 1,
    ayat: "الْكَوْثَرُ",
    soal: "Alif Lam pada kata di atas termasuk?",
    pilihan: ["Syamsiyah", "Iqlab", "Qamariyah", "Ikhfa"],
    jawaban: "Qamariyah",
  },

  // =========================
  // LEVEL 2
  // =========================
  {
    id: 11,
    level: 2,
    ayat: "مِنْ ذَهَبٍ",
    soal: "Hukum bacaan pada nun sukun adalah...",
    pilihan: ["Idzhar", "Iqlab", "Ikhfa", "Idgom"],
    jawaban: "Ikhfa",
  },
  {
    id: 12,
    level: 2,
    ayat: "مِنْ لَدُنْهُ",
    soal: "Nun sukun bertemu Lam menjadi...",
    pilihan: ["Ikhfa", "Iqlab", "Idgom", "Idzhar"],
    jawaban: "Idgom",
  },
  {
    id: 13,
    level: 2,
    ayat: "مِنْ غِلٍّ",
    soal: "Nun sukun bertemu Ghain hukumnya?",
    pilihan: ["Iqlab", "Ikhfa", "Idzhar", "Idgom"],
    jawaban: "Idzhar",
  },
  {
    id: 14,
    level: 2,
    ayat: "مِنْ صَدَقَةٍ",
    soal: "Nun sukun bertemu Shad hukumnya?",
    pilihan: ["Idgom", "Ikhfa", "Iqlab", "Idzhar"],
    jawaban: "Ikhfa",
  },
  {
    id: 15,
    level: 2,
    ayat: "الرَّحْمٰنُ",
    soal: "Alif Lam pada kata di atas termasuk?",
    pilihan: ["Qamariyah", "Ikhfa", "Idzhar", "Syamsiyah"],
    jawaban: "Syamsiyah",
  },
  {
    id: 16,
    level: 2,
    ayat: "الْفَلَقِ",
    soal: "Alif Lam pada kata di atas termasuk?",
    pilihan: ["Syamsiyah", "Iqlab", "Qamariyah", "Idgom"],
    jawaban: "Qamariyah",
  },
  {
    id: 17,
    level: 2,
    ayat: "مِنْ وَالٍ",
    soal: "Nun sukun bertemu Wawu hukumnya?",
    pilihan: ["Idzhar", "Ikhfa", "Iqlab", "Idgom"],
    jawaban: "Idgom",
  },
  {
    id: 18,
    level: 2,
    ayat: "مِنْ جَنَّةٍ",
    soal: "Nun sukun bertemu Jim hukumnya?",
    pilihan: ["Iqlab", "Idzhar", "Ikhfa", "Idgom"],
    jawaban: "Ikhfa",
  },
  {
    id: 19,
    level: 2,
    ayat: "مِنْ أَهْلِ",
    soal: "Nun sukun bertemu Hamzah hukumnya?",
    pilihan: ["Ikhfa", "Idgom", "Idzhar", "Iqlab"],
    jawaban: "Idzhar",
  },
  {
    id: 20,
    level: 2,
    ayat: "النَّاسِ",
    soal: "Alif Lam pada kata di atas termasuk?",
    pilihan: ["Qamariyah", "Idgom", "Syamsiyah", "Ikhfa"],
    jawaban: "Syamsiyah",
  },

  // =========================
  // LEVEL 3
  // =========================
  {
    id: 21,
    level: 3,
    ayat: "أَنْبِئْهُمْ",
    soal: "Hukum nun sukun pada ayat di atas adalah...",
    pilihan: ["Ikhfa", "Idgom", "Iqlab", "Idzhar"],
    jawaban: "Iqlab",
  },
  {
    id: 22,
    level: 3,
    ayat: "مِنْ رَبِّهِمْ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Ikhfa", "Iqlab", "Idzhar", "Idgom"],
    jawaban: "Idgom",
  },
  {
    id: 23,
    level: 3,
    ayat: "مِنْ ثَمَرَاتٍ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Idgom", "Ikhfa", "Iqlab", "Idzhar"],
    jawaban: "Ikhfa",
  },
  {
    id: 24,
    level: 3,
    ayat: "مِنْ خَيْرٍ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Ikhfa", "Idzhar", "Idgom", "Iqlab"],
    jawaban: "Idzhar",
  },
  {
    id: 25,
    level: 3,
    ayat: "السَّمَاءِ",
    soal: "Alif Lam pada kata di atas termasuk...",
    pilihan: ["Qamariyah", "Idzhar", "Syamsiyah", "Ikhfa"],
    jawaban: "Syamsiyah",
  },
  {
    id: 26,
    level: 3,
    ayat: "الْحَمْدُ",
    soal: "Alif Lam pada kata di atas termasuk...",
    pilihan: ["Syamsiyah", "Idgom", "Qamariyah", "Ikhfa"],
    jawaban: "Qamariyah",
  },
  {
    id: 27,
    level: 3,
    ayat: "مِنْ دُونِ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Idgom", "Iqlab", "Ikhfa", "Idzhar"],
    jawaban: "Ikhfa",
  },
  {
    id: 28,
    level: 3,
    ayat: "مِنْ نُورٍ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Idzhar", "Idgom", "Ikhfa", "Iqlab"],
    jawaban: "Idgom",
  },
  {
    id: 29,
    level: 3,
    ayat: "مِنْ حَكِيمٍ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Ikhfa", "Iqlab", "Idzhar", "Idgom"],
    jawaban: "Idzhar",
  },
  {
    id: 30,
    level: 3,
    ayat: "الْجَنَّةُ",
    soal: "Alif Lam pada kata di atas termasuk...",
    pilihan: ["Syamsiyah", "Ikhfa", "Idgom", "Qamariyah"],
    jawaban: "Qamariyah",
  },

  // =========================
  // LEVEL 4
  // =========================
  {
    id: 31,
    level: 4,
    ayat: "مِنْ زُخْرُفٍ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Idzhar", "Ikhfa", "Iqlab", "Idgom"],
    jawaban: "Ikhfa",
  },
  {
    id: 32,
    level: 4,
    ayat: "مِنْ يَوْمٍ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Ikhfa", "Iqlab", "Idgom", "Idzhar"],
    jawaban: "Idgom",
  },
  {
    id: 33,
    level: 4,
    ayat: "مِنْ عَذَابٍ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Ikhfa", "Idzhar", "Iqlab", "Idgom"],
    jawaban: "Idzhar",
  },
  {
    id: 34,
    level: 4,
    ayat: "أَنْبَتَ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Idzhar", "Iqlab", "Ikhfa", "Idgom"],
    jawaban: "Iqlab",
  },
  {
    id: 35,
    level: 4,
    ayat: "الطَّارِقِ",
    soal: "Alif Lam termasuk...",
    pilihan: ["Qamariyah", "Ikhfa", "Syamsiyah", "Idzhar"],
    jawaban: "Syamsiyah",
  },
  {
    id: 36,
    level: 4,
    ayat: "الْغَاشِيَةُ",
    soal: "Alif Lam termasuk...",
    pilihan: ["Syamsiyah", "Ikhfa", "Idgom", "Qamariyah"],
    jawaban: "Qamariyah",
  },
  {
    id: 37,
    level: 4,
    ayat: "مِنْ قَبْلِ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Idgom", "Ikhfa", "Iqlab", "Idzhar"],
    jawaban: "Ikhfa",
  },
  {
    id: 38,
    level: 4,
    ayat: "مِنْ لَدُنْكَ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Ikhfa", "Idzhar", "Idgom", "Iqlab"],
    jawaban: "Idgom",
  },
  {
    id: 39,
    level: 4,
    ayat: "مِنْ أَنْفُسِهِمْ",
    soal: "Huruf setelah nun sukun adalah...",
    pilihan: ["Ba", "Mim", "Hamzah", "Kaf"],
    jawaban: "Hamzah",
  },
  {
    id: 40,
    level: 4,
    ayat: "الشَّرِّ",
    soal: "Alif Lam termasuk...",
    pilihan: ["Qamariyah", "Idgom", "Ikhfa", "Syamsiyah"],
    jawaban: "Syamsiyah",
  },

  // =========================
  // LEVEL 5
  // =========================
  {
    id: 41,
    level: 5,
    ayat: "مِنْ فَضْلِ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Idgom", "Iqlab", "Ikhfa", "Idzhar"],
    jawaban: "Ikhfa",
  },
  {
    id: 42,
    level: 5,
    ayat: "مِنْ بَعْثِهِمْ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Ikhfa", "Iqlab", "Idzhar", "Idgom"],
    jawaban: "Iqlab",
  },
  {
    id: 43,
    level: 5,
    ayat: "مِنْ وَرَائِهِمْ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Idzhar", "Idgom", "Iqlab", "Ikhfa"],
    jawaban: "Idgom",
  },
  {
    id: 44,
    level: 5,
    ayat: "مِنْ حَكِيمٍ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Ikhfa", "Iqlab", "Idzhar", "Idgom"],
    jawaban: "Idzhar",
  },
  {
    id: 45,
    level: 5,
    ayat: "الصَّالِحَاتِ",
    soal: "Alif Lam termasuk...",
    pilihan: ["Qamariyah", "Idgom", "Syamsiyah", "Ikhfa"],
    jawaban: "Syamsiyah",
  },
  {
    id: 46,
    level: 5,
    ayat: "الْفَوْزُ",
    soal: "Alif Lam termasuk...",
    pilihan: ["Syamsiyah", "Ikhfa", "Qamariyah", "Idgom"],
    jawaban: "Qamariyah",
  },
  {
    id: 47,
    level: 5,
    ayat: "مِنْ طِينٍ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Idzhar", "Ikhfa", "Idgom", "Iqlab"],
    jawaban: "Ikhfa",
  },
  {
    id: 48,
    level: 5,
    ayat: "مِنْ نِعْمَةٍ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Ikhfa", "Idgom", "Idzhar", "Iqlab"],
    jawaban: "Idgom",
  },
  {
    id: 49,
    level: 5,
    ayat: "مِنْ غَفُورٍ",
    soal: "Hukum bacaannya adalah...",
    pilihan: ["Ikhfa", "Iqlab", "Idzhar", "Idgom"],
    jawaban: "Idzhar",
  },
  {
    id: 50,
    level: 5,
    ayat: "الْبَلَدِ",
    soal: "Alif Lam termasuk...",
    pilihan: ["Syamsiyah", "Ikhfa", "Iqlab", "Qamariyah"],
    jawaban: "Qamariyah",
  },
];
