"use client";
import { levelMateri } from "@/constant/constLevel";
import { supabase } from "@/lib/supabase/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const getStatusLevel = (level: number, levelSelesai: number) => {
  if (level <= levelSelesai) {
    return "selesai";
  }

  if (level === levelSelesai + 1) {
    return "Pelajari";
  }

  return "Terkunci";
};

export default function KuisLevel() {
  const router = useRouter();

  const [levelSelesai, setLevelSelesai] = useState(0);

  useEffect(() => {
    const ambilProgress = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("User login:", user);
      
      if (!user) return;

      const { data, error } = await supabase
        .from("hasil_kuis")
        .select("level")
        .eq("user_id", user.id);
        
      if (error) {
        console.error(error);
        return;
      }

      console.log("Data hasil kuis:", data);

      if (data && data.length > 0) {
        console.log("Semua level:", data.map((d) => d.level));

        const levelTerakhir = Math.max(
          ...data.map((d) => Number(d.level))
        );

        console.log("Level terakhir:", levelTerakhir);

        setLevelSelesai(levelTerakhir);
      }
    };
      ambilProgress();
    }, []);
      


      const handleMasukLevel = (level: number, status: string) => {
        if (status === "Terkunci") return;

        router.push(`/kuis/${level}`);
      };

      const getStatusStyle = (status: string) => {
        switch (status) {
          case "selesai":
            return {
              card: "bg-green-50 border-2 border-green-500 px-7",
              badge: "px-6 py-3 bg-green-500 text-white font-bold",
            };

          case "Pelajari":
            return {
              card: "bg-blue-50 border-2 border-blue-500",
              badge: "px-6 py-3 bg-blue-500 text-white font-bold",
            };

          default:
            return {
              card: "bg-gray-100 border-2 border-gray-500",
              badge: "px-6 py-3 bg-gray-500 text-white font-bold",
            };
        }
      };

      return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* header */}
          <div className="text-white bg-blue-500 p-5">
            <h2 className="text-5xl font-bold">Pilih level kuis!</h2>
            <p className="text-xl">Tantang pemahamanmu dengan kuis level 1 sampai 5!</p>
          </div>
          {/* isi */}
          <div className="p-5 space-y-3 ">
            {levelMateri.map((kuisLevel) => {
              const status = getStatusLevel(kuisLevel.level, levelSelesai);

              console.log(
                "level:",
                kuisLevel.level,
                "levelSelesai:",
                levelSelesai,
                "status:",
                status
              )

              const style = getStatusStyle(status);

              return (
                <div
                  key={kuisLevel.level}
                  onClick={() => handleMasukLevel(kuisLevel.level, status)}
                  className={`flex items-center justify-between rounded-xl p-4  ${style.card}`}
                >
                  <div>
                    <div className="font-bold text--500 text-4xl">
                      <p className="text">Level {kuisLevel.level}</p>
                    </div>

                    <div className="font-bold text-2xl">
                      <p>{kuisLevel.jumlah}</p>
                    </div>
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
