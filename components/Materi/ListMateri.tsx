import React from "react";

const ListMateri = () => {
    return (
      <div>
        {/* header */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden p-5">
          <h2 className="font-bold">Materi yang dipelajari</h2>
          <ol className="list-decimal p-5">
            <li>Idzhar Halqi</li>
            <li>Idzhar Syafawi</li>
          </ol>
        </div>
      </div>
    );
};

export default ListMateri;
