"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { daftarMateri } from "@/constant/constMateri";
import { supabase } from "@/lib/supabase/supabase";
import Swal from "sweetalert2";


import PilihMateri from "pilihMateri";
import ListMateri from "listMateri";
import LearnMateri from "learnMateri";
import FahamMateri from "fahamMateri";


export default function MateriPage() {
  const [materi, setMateri] = useState(daftarMateri);
  const [materiIndex, setMateriIndex] = useState(0);
  const [subMateriIndex, setSubMateriIndex] = useState(0);
  const learnRef = useRef<HTMLDivElement>(null);


  const loadProgress = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: progress, error } = await supabase
      .from("progress_materi")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.log("ERROR OBJECT:", error);
      console.log("MESSAGE:", error.message);
      console.log("CODE:", error.code);
      console.log("DETAILS:", error.details);
      console.log("HINT:", error.hint);

      await Swal.fire({
        icon: "error",
        title: "Supabase Error",
        text: error.message,
      });

      return;
    }
    const dataMateri = structuredClone(daftarMateri);

    dataMateri.forEach((materi, index) => {
      let selesaiSemua = true;

      materi.subMateri.forEach((sub) => {
        const ditemukan = progress.find(
          (p) =>
            p.materi_id === materi.id && p.submateri_id === sub.id && p.selesai,
        );

        sub.selesai = !!ditemukan;

        if (!ditemukan) {
          selesaiSemua = false;
        }
      });

      if (selesaiSemua) {
        materi.status = "Dipahami";
      } else if (index == 0 || dataMateri[index - 1].status === "Dipahami") {
        materi.status = "Pelajari";
      } else {
        materi.status = "Terkunci";
      }
    });

    setMateri(dataMateri);

    const indexPelajari = dataMateri.findIndex((m) => m.status === "Pelajari");

    const materiTerbuka =
      indexPelajari === -1
        ? dataMateri.findIndex((m) => m.status === "Dipahami")
        : indexPelajari;
    if (materiTerbuka !== -1) {
      setMateriIndex(materiTerbuka);

      const subIndex = dataMateri[materiTerbuka].subMateri.findIndex(
        (s) => !s.selesai,
      );

      setSubMateriIndex(subIndex === -1 ? 0 : subIndex);
    }
  }, []);


useEffect(() => {
  loadProgress();
}, [loadProgress]);
 

  
  const materiAktif = materi[materiIndex];

  const subMateriAktif = materiAktif?.subMateri[subMateriIndex];

  const semuaSelesai = materi.every((m) => m.status === "Dipahami");

  const handlePilihMateri = (index: number) => {
    if (materi[index].status === "Terkunci") return;

    setMateriIndex(index);

    setSubMateriIndex(0);

    setTimeout(() => {
      learnRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

// simpan
const handleFaham = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ==========================
  // USER LOGIN
  // ==========================
  if (user) {
    const sub = materi[materiIndex].subMateri[subMateriIndex];

    const { error } = await supabase.from("progress_materi").upsert(
      {
        user_id: user.id,
        materi_id: materi[materiIndex].id,
        submateri_id: sub.id,
        selesai: true,
      },
      {
        onConflict: "user_id,materi_id,submateri_id",
      },
    );

    if (error) {
      console.error(error);
      return;
    }

    // kalau masih ada submateri berikutnya
    if (subMateriIndex < materi[materiIndex].subMateri.length - 1) {
      setSubMateriIndex((prev) => prev + 1);
    } else {
      // reload status materi dari Supabase
      await loadProgress();
    }
  }


  // ==========================
  // GUEST (BELUM LOGIN)
  // ==========================
  else {
    const materiBaru = structuredClone(materi);

    // Tandai submateri selesai
    materiBaru[materiIndex].subMateri[subMateriIndex].selesai = true;

    // Cek apakah semua submateri pada materi ini sudah selesai
    const selesaiSemua = materiBaru[materiIndex].subMateri.every(
      (s) => s.selesai,
    );

    if (selesaiSemua) {
      // Materi menjadi Dipahami
      materiBaru[materiIndex].status = "Dipahami";

      // Jika masih ada materi berikutnya
      if (materiIndex < materiBaru.length - 1) {
        // Buka materi berikutnya
        materiBaru[materiIndex + 1].status = "Pelajari";

        // Update tampilan
        setMateri(materiBaru);

        // Langsung pindah ke materi berikutnya
        setMateriIndex(materiIndex + 1);
        setSubMateriIndex(0);
      } else {
        // Materi terakhir selesai
        setMateri(materiBaru);

        Swal.fire({
          icon: "success",
          title: "Selamat!",
          text: "Semua materi telah dipelajari. Silakan daftar untuk membuka kuis.",
          confirmButtonText: "Daftar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/auth/daftar";
          }
        });
      }
    } else {
      // Masih ada submateri berikutnya
      setMateri(materiBaru);
      setSubMateriIndex((prev) => prev + 1);
    }
  }

  // ==========================
  // SCROLL (BERLAKU UNTUK KEDUANYA)
  // ==========================
  setTimeout(() => {
    learnRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
};

  return (
    <main className="min-h-screen bg-gray-100 pt-28 pb-20">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-6">
        {/* Kolom kiri */}
        <div className="w-full lg:w-1/3 space-y-6">
          <PilihMateri
            materi={materi}
            handlePilihMateri={handlePilihMateri}
            materiIndex={materiIndex}
          />
          <ListMateri materiAktif={materiAktif} />
        </div>

        {/* Kolom kanan */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div ref={learnRef} className="scroll-mt-20">
            <LearnMateri materiAktif={subMateriAktif} />
          </div>

          <FahamMateri handleFaham={handleFaham} semuaSelesai={semuaSelesai} />
        </div>
      </div>
    </main>
  );
}
