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

  // FUNCTION: Pindah ke sub-materi berikutnya
  const handleLanjutSubMateri = () => {
    if (subMateriIndex < materi[materiIndex].subMateri.length - 1) {
      setSubMateriIndex((prev) => prev + 1);

      setTimeout(() => {
        learnRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  // FUNCTION: Pindah ke materi berikutnya (BARU - untuk handle ketika sub-materi habis)
  const handleLanjutMateri = () => {
    // CEK: apakah ada materi berikutnya?
    if (materiIndex < materi.length - 1) {
      // Set materi index ke materi berikutnya
      setMateriIndex((prev) => prev + 1);
      // Reset sub-materi index ke 0 (mulai dari sub-materi pertama)
      setSubMateriIndex(0);

      setTimeout(() => {
        learnRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  // simpan
  const handleFaham = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Seharusnya tidak terjadi karena Materi hanya untuk user login
    if (!user) return;

    const materiSekarang = materi[materiIndex];
    const subSekarang = materiSekarang.subMateri[subMateriIndex];

    // Simpan progress
    const { error } = await supabase.from("progress_materi").upsert(
      {
        user_id: user.id,
        materi_id: materiSekarang.id,
        submateri_id: subSekarang.id,
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

    const materiBaru = structuredClone(materi);

    // Tandai submateri selesai
    materiBaru[materiIndex].subMateri[subMateriIndex].selesai = true;

    const semuaSubSelesai = materiBaru[materiIndex].subMateri.every(
      (sub) => sub.selesai,
    );

    // ==========================
    // MASIH ADA SUBMATERI
    // ==========================
    if (subMateriIndex < materiBaru[materiIndex].subMateri.length - 1) {
      setMateri(materiBaru);

      // Langsung ke submateri berikutnya
      setSubMateriIndex((prev) => prev + 1);
    }

    // ==========================
    // SEMUA SUBMATERI SELESAI
    // ==========================
    else if (semuaSubSelesai) {
      materiBaru[materiIndex].status = "Dipahami";

      // ==========================
      // MASIH ADA MATERI BERIKUTNYA
      // ==========================
      if (materiIndex < materiBaru.length - 1) {
        const nextIndex = materiIndex + 1;

        materiBaru[nextIndex].status = "Pelajari";

        setMateri(materiBaru);
        setMateriIndex(nextIndex);
        setSubMateriIndex(0);
      }

      // ==========================
      // SEMUA MATERI SELESAI
      // ==========================
      else {
        setMateri(materiBaru);

        Swal.fire({
          icon: "success",
          title: "Selamat! 🎉",
          text: "Semua materi telah selesai. Kuis sudah terbuka!",
          confirmButtonText: "Mainkan Kuis",
          confirmButtonColor: "#3b82f6",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/kuisLevel";
          }
        });
      }
    }

    // Scroll
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

          <FahamMateri
            handleFaham={handleFaham}
            handleLanjutSubMateri={handleLanjutSubMateri}
            handleLanjutMateri={handleLanjutMateri}
            subMateriAktif={subMateriAktif}
            // Props BARU untuk conditional rendering tombol
            subMateriIndex={subMateriIndex}
            materiIndex={materiIndex}
            totalSubMateri={materi[materiIndex]?.subMateri.length || 0}
            totalMateri={materi.length}
          />
        </div>
      </div>
    </main>
  );
}
