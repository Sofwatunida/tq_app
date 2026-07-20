import PilihMateri from "pilihMateri";
import ListMateri from "listMateri";
import LearnMateri from "learnMateri";
import FahamMateri from "fahamMateri";

export default function MateriPage() {
  return (
    <main className="min-h-screen bg-gray-100 pt-28 pb-20">
      <div className="w-[90%] mx-auto flex gap-6">
        {/* Kolom kiri */}
        <div className="w-1/3 space-y-6">
          <PilihMateri />
          <ListMateri />
        </div>

        {/* Kolom kanan */}
        <div className="w-2/3 space-y-6">
          <LearnMateri />
          <FahamMateri />
        </div>
      </div>
    </main>
  );
}