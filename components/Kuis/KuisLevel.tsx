"use client";
import { levelMateri } from "@/constant/constLevel";
import { useRouter } from "next/navigation";

const levelSelesai = 0;

const getStatusLevel = (level: number, levelSelesai: number) => {
  if (level <= levelSelesai) {
    return "selesai";
  }

  if (level === levelSelesai + 1) {

  return "Pelajari"
}

return "Terkunci";
};

export default function KuisLevel() {
  const router = useRouter();
  
  const handleMasukLevel = (
    level: number,
    status: string) => {
    if (status === "Terkunci") return;

    router.push(`/kuis/${level}`);
  };


  const getStatusStyle = (status: string) => {
    switch (status) {
      case "selesai":
        return {
          card: "bg-green-50 border border-green-300 px-7",
          badge: "px-5 bg-green-500 text-white",
        };

      case "Pelajari":
        return {
          card: "bg-blue-50 border border-blue-500",
          badge: "px-4 bg-blue-500 text-white",
        };

      default:
        return {
          card: "bg-gray-100 border border-gray-500",
          badge: "bg-gray-500 text-white",
        };
    }
  };


  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* header */}
      <div className="text-white bg-blue-500 p-5">
        <h2 className="text-2xl font-bold">Pilih level kuis!</h2>
        <p>Tantang pemahamanmu dengan kuis level 1 sampai 5!</p>
      </div>
      {/* isi */}
      <div className="p-5 space-y-3">
        {levelMateri.map((kuisLevel) => {
          const status = getStatusLevel(
            kuisLevel.level,
            levelSelesai
          );

          const style = getStatusStyle(status);

          return (
            <div
              key={kuisLevel.level}
              onClick={() => handleMasukLevel(kuisLevel.level, status)}
              className={`flex items-center justify-between rounded-xl p-4  ${style.card}`}
            >
              <div>
                <p>Level {kuisLevel.level}</p>
                <p>{kuisLevel.jumlah}</p>
              </div>

              <span className={`rounded-full px-3 py-1 text-sm ${style.badge}`}>
                {status}
              </span>
            </div>
          );
        })}
        
      </div>
    </div>
  );
}
