import Swal from "sweetalert2";

import { supabase } from "@/lib/supabase/supabase";

type Router = {
  push: (href: string) => void;
};

export async function aksesMateri(router: Router) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();



  if (!user) {
    await Swal.fire({
      icon: "info",
      title: "Silakan Daftar",
      text: "Daftar terlebih dahulu untuk mengakses materi.",
      confirmButtonText: "Register",
      confirmButtonColor: "#3b82f6",
    });

    router.push("/auth/daftar");
    return;
  }

  router.push("/materi");
}
