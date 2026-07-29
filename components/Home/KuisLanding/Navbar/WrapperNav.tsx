"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { supabase } from "@/lib/supabase/supabase";

const WrapperNav = () => {
  const pathname = usePathname();

  const [showNav, setShowNav] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const openNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);

  // Ambil user yang sedang login
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

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Navbar tidak ditampilkan di halaman auth
  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <div>
      <Nav openNav={openNavHandler} user={user} />

      <MobileNav showNav={showNav} closeNav={closeNavHandler} user={user} />
    </div>
  );
};

export default WrapperNav;
