import PilihMateri from "pilihMateri";
// import ListMateri from "listMateri";
// import LearnMateri from "learnMateri";
// import FahamMateri from "fahamMateri";

export default function MateriPage() {
  return (
    <main className="min-h-screen bg-blue-50 pt-28 pb-10">
      <div className="w-[90%] max-w-7xl mx-auto">
        {/* Bagian Kiri */}
        <div className="w-[280px] space-y-5">
          <PilihMateri />
          {/* <ListMateri /> */}
        </div>

        {/* Bagian Kanan */}
        {/* <div className="flex-1 space-y-5">
          <LearnMateri />
          <FahamMateri />
        </div> */}
      </div>
    </main>
  );
}