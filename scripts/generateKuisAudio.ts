import fs from "node:fs/promises";
import path from "node:path";

const API_BASE = "https://api.islamic.app/v1";

type Kuis = {
  id: number;
  ayat: string;
};

type QuranWord = {
  position: number;
  text_uthmani: string;
  text_imlaei: string;
  audio_url: string;
};

type QuranAyah = {
  ayah_number: number;
  verse_key: string;
  words: QuranWord[];
};

type SearchResult = {
  surah: number;
  ayat: number;
  verseKey: string;
  positions: number[];
  words: string[];
  audioUrls: string[];
};

function normalizeArabic(text: string) {
  return (
    text
      .normalize("NFC")
      // Hilangkan tanda baca/harakat untuk pencocokan
      .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
      // Hilangkan tatweel
      .replace(/\u0640/g, "")
      // Normalisasi alif
      .replace(/[ٱأإآ]/g, "ا")
      // Spasi ganda
      .replace(/\s+/g, " ")
      .trim()
  );
}



function findPhraseInAyah(target: string, ayah: QuranAyah): SearchResult[] {
  const results: SearchResult[] = [];

  const targetWords = normalizeArabic(target).split(" ");

  const words = ayah.words.filter((word) => word.text_uthmani);

  for (let start = 0; start < words.length; start++) {
    const matchedWords: QuranWord[] = [];

    for (let i = 0; i < targetWords.length; i++) {
      const current = words[start + i];

      if (!current) break;

      const currentText = normalizeArabic(current.text_uthmani);

      if (currentText !== targetWords[i]) {
        break;
      }

      matchedWords.push(current);
    }

    if (matchedWords.length === targetWords.length) {
      results.push({
        surah: Number(ayah.verse_key.split(":")[0]),
        ayat: ayah.ayah_number,
        verseKey: ayah.verse_key,

        positions: matchedWords.map((word) => word.position),

        words: matchedWords.map((word) => word.text_uthmani),

        audioUrls: matchedWords.map((word) => word.audio_url),
      });
    }
  }

  return results;
}

async function searchAllQuran(target: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  console.log(`\n🔎 Mencari: "${target}"`);

  for (let surah = 1; surah <= 114; surah++) {
    try {
      const response = await fetch(
        `${API_BASE}/words/${surah}?page=1&per_page=50`,
      );

      if (!response.ok) {
        console.log(`⚠️ Surah ${surah} gagal`);
        continue;
      }

      const json = await response.json();

      const ayahs: QuranAyah[] = json?.data?.ayahs ?? [];

      for (const ayah of ayahs) {
        const matches = findPhraseInAyah(target, ayah);

        results.push(...matches);
      }

      process.stdout.write(`\rMencari Surah ${surah}/114...`);
    } catch (error) {
      console.log(`\n⚠️ Error Surah ${surah}`, error);
    }
  }

  console.log("");

  return results;
}

async function main() {
  /*
   * IMPORT constKuis secara dinamis.
   *
   * Sesuaikan path jika lokasi constKuis.ts kamu berbeda.
   */
  const kuisPath = path.resolve(process.cwd(), "constant/constKuis.ts");
  /*
   * Karena constKuis.ts adalah source TypeScript,
   * generator mengambil teks ayat menggunakan
   * regex sederhana.
   *
   * Jadi generator tidak mengubah file constKuis.
   */
  const source = await fs.readFile(kuisPath, "utf8");

  const kuis: Kuis[] = [];

  const regex = /id:\s*(\d+)[\s\S]*?ayat:\s*"([^"]+)"/g;

  let match;

  while ((match = regex.exec(source)) !== null) {
    kuis.push({
      id: Number(match[1]),
      ayat: match[2],
    });
  }

  if (kuis.length === 0) {
    throw new Error("Tidak menemukan data kuis.");
  }

  console.log(`\n📚 Ditemukan ${kuis.length} soal.\n`);

  const output: Record<
    number,
    {
      text: string;
      matches: SearchResult[];
      selected?: SearchResult;
    }
  > = {};

  for (const soal of kuis) {
    const matches = await searchAllQuran(soal.ayat);

    output[soal.id] = {
      text: soal.ayat,
      matches,
    };

    console.log(`ID ${soal.id}: ${soal.ayat}`);

    if (matches.length === 0) {
      console.log("   ❌ Tidak ditemukan");
    } else {
      matches.forEach((match, index) => {
        console.log(`   ${index + 1}. ${match.verseKey}`);

        console.log(`      posisi: [${match.positions.join(", ")}]`);

        console.log(`      kata: ${match.words.join(" | ")}`);
      });
    }
  }

 const outputPath = path.resolve(process.cwd(), "constant/kuisAudio.json");

 await fs.writeFile(outputPath, JSON.stringify(output, null, 2), "utf8");

 console.log(`\n✅ Hasil disimpan ke: ${outputPath}`);
}

main().catch((error) => {
  console.error("\n❌ Generator gagal:");
  console.error(error);
  process.exit(1);
});
