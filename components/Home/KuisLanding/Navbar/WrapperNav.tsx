"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import Swal from "sweetalert2";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { supabase } from "@/lib/supabase/supabase";
import { daftarMateri } from "@/constant/constMateri";

const WrapperNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [showNav, setShowNav] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const openNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAksesKuis = async (halaman: string) => {
    if (!user) {
      router.push("/auth/masuk");
      return;
    }

    const { data: progress, error } = await supabase
      .from("progress_materi")
      .select("materi_id, submateri_id, selesai")
      .eq("user_id", user.id)
      .eq("selesai", true);

    if (error) {
      console.error(error);
      return;
    }

    const semuaSelesai = daftarMateri.every((materi) =>
      materi.subMateri.every((sub) =>
        progress?.some(
          (p) =>
            p.materi_id === materi.id && p.submateri_id === sub.id && p.selesai,
        ),
      ),
    );

    if (!semuaSelesai) {
      await Swal.fire({
        icon: "warning",
        title: "Materi Belum Selesai",
        text: "Selesaikan seluruh materi terlebih dahulu untuk mengakses Kuis dan Predikat.",
        confirmButtonText: "Mengerti",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("sudah_lihat_unlock")
      .eq("id", user.id)
      .single();

    if (!profile?.sudah_lihat_unlock) {
      const result = await Swal.fire({
        icon: "success",
        title: "Alhamdulillah!",
        text: "Anda telah menyelesaikan seluruh materi. Kini Anda dapat mengakses Kuis dan Predikat.",
        confirmButtonText: "Mulai",
        confirmButtonColor: "#3b82f6",
      });

      if (!result.isConfirmed) return;

      await supabase
        .from("profiles")
        .update({ sudah_lihat_unlock: true })
        .eq("id", user.id);
    }

    router.push(halaman);
    closeNavHandler();
  };

  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <>
      <Nav
        openNav={openNavHandler}
        user={user}
        handleAksesKuis={handleAksesKuis}
      />

      <MobileNav
        showNav={showNav}
        closeNav={closeNavHandler}
        user={user}
        handleAksesKuis={handleAksesKuis}
      />
    </>
  );
};

export default WrapperNav;
