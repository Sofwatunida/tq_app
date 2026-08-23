export function getWordAudioUrl(surah: number, ayat: number, position: number) {
  return `https://cdn.islamic.app/quran/audio-word/${surah}/${ayat}/${position}.mp3`;
}
