import React from "react";

const ListMateri = () => {
    return (
      <div>
        {/* header */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full h-[150px] p-5 ">
          <h2 className="font-bold text-2xl">Materi yang dipelajari</h2>
          <ol className="list-decimal font-medium  p-5 text-xl">
            <li>Idzhar Halqi</li>
            <li>Idzhar Syafawi</li>
          </ol>
        </div>
      </div>
    );
};

export default ListMateri;
