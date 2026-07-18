import React from 'react';


const kuisLevel = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* header */}
        <div className="text-white bg-blue-500 p-5">
          <h2 className="text-2xl font-bold">Pilih level kuis!</h2>
          <p>Tantang pemahamanmu dengan kuis level 1 sampai 5!</p>
        </div>
        {/* isi */}
        <div className="p-5 space-y-3"></div>
      </div>
    );
};

export default kuisLevel;