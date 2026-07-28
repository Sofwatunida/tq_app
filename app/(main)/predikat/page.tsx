"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";

interface UserLevelData {
  id: string;
  poin: number;
  waktu: number;
  level: number;
  user_id: string;
  profiles: {
    nama_pengguna: string;
  }; 
}

const PredikatLevel = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [userLevel, setUserLevel] = useState<UserLevelData[]>([]);

  const getPredikat = (poin: number) => {
    if (poin >= 90) {
      return "A+";
    } else if (poin >= 75) {
      return "A";
    } else if (poin >= 60) {
      return "B";
    } else if (poin >= 40) {
      return "C";
    } else {
      return "D";
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("hasil_kuis")
        .select(`
        id,
        poin,
        waktu,
        level,
        user_id,
        profiles (
          nama_pengguna
        )
      `)
        
        .eq("level", selectedLevel)
        .order("poin", { ascending: false })
        .order("waktu", { ascending: true });

      if (error) {
        console.log(error);
        return;
      }

      if (!data) return;
      console.log("data dari supabase", data);

      const hasil = data.sort((a, b) => {
        if (b.poin !== a.poin) {
          return b.poin - a.poin;
        }

        return a.waktu - b.waktu;
      });

   
      setUserLevel( hasil as unknown as UserLevelData[]);
    };
    
    getData();
  }, [selectedLevel]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-5xl font-bold mt-20 mb-4 text-blue-500">
        Predikat Level {selectedLevel}
      </h2>

      {/* tabel */}
      <div className="overflow-hidden rounded-xl border-2 font-semibold border-blue-500">
        <div className="grid grid-cols-4 bg-blue-500 font-extrabold text-white text-2xl text-center p-3">
          <div>Predikat</div>
          <div>Pengguna</div>
          <div>Waktu</div>
          <div>Poin</div>
        </div>

        {userLevel.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-4 text-center border-t-2 border-blue-500 p-3"
          >
            <div>{getPredikat(user.poin)}</div>
            <div>{user.profiles?.nama_pengguna}</div>
            <div>
              {user.waktu >= 60
                ? `${Math.floor(user.waktu / 60)} menit`
                : `${user.waktu} detik`}
            </div>
            <div>{user.poin}</div>
          </div>
        ))}
      </div>

      {/* dropdown */}
      <div className="mt-5 flex justify-center">
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(Number(e.target.value))}
          className="border-2 border-blue-500 font-bold rounded-lg px-4 py-2"
        >
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
          <option value={4}>Level 4</option>
          <option value={5}>Level 5</option>
        </select>
      </div>
    </div>
  );
};

export default PredikatLevel;
