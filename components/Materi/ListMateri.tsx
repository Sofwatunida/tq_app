import React from "react";
import { daftarMateri } from "@/constant/constMateri"

type Props = {
  materi: typeof daftarMateri;
};

const ListMateri = ({ materi }: Props) => {
  const materiDipelajari = materi.filter(
    (item) => item.status === "Selesai"
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full h-[150px] p-5" >
      <h2 className="font-old text-2xl">Materi yang dipelajari</h2>

      <ol className=" list decimal font-medium p-5 text-xl">
        {materiDipelajari.map((item) => (
          <li key={item.id}>{item.judul}</li>
        ))}
      </ol>
    </div>

  );
};

export default ListMateri;
