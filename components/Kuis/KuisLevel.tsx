import React from 'react';
import { levelMateri } from "@/constant/constLevel";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Selesai":
      return {
        card: "bg-green-50 border border-green-300 px-7",
        badge: "px-5 bg-green-500 text-white",
      };

    case "Mulai Kuis":
      return {
        card: "bg-blue-50 border border-blue-500",
        badge: "px-4 bg-blue-500 text-white",
      };

    default:
      return {
        card: "bg-gray-100 border border-gray-500",
        badge: "bg-gray-500 text-white",
      };
  }
};

const KuisLevel = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* header */}
        <div className="text-white bg-blue-500 p-5">
          <h2 className="text-2xl font-bold">Pilih level kuis!</h2>
          <p>Tantang pemahamanmu dengan kuis level 1 sampai 5!</p>
        </div>
        {/* isi */}
                   <div className="p-5 space-y-3">
                       {levelMateri.map((kuisLevel) => {
                           const style = getStatusStyle(kuisLevel.status);
                    
                    
                           return (
                               <div
                                   key={kuisLevel.level}
                                   className={`flex items-center justify-between rounded-xl p-4 ${style.card}`}
                               >
                                   <div className="flex items-center gap-4">
                                       <span>{kuisLevel.level}</span>
                                       <span>{kuisLevel.jumlah}</span>
                                   </div>
                    
                                   <span className={`rounded-full px-3 py-1 text-sm font-medium ${style.badge}`}
                                   >
                                       {kuisLevel.status}
                                   </span>
                               </div>
                           );
                       })}
                   </div>
               </div>
                                            
           );
       };
       
       export default KuisLevel;