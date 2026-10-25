import React from 'react';
import KuisLevel from 'kuisLevel';
import KataMutiara from 'kataMutiara';

export default function KuisLevelPages() {
    return (
      <main className="min-h-screen bg-gray-100 pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="w-[95%] sm:w-[90%] mx-auto flex gap-4 sm:gap-6 flex-col lg:flex-row">
          {/* Kolom kiri */}
          <div className="w-full lg:w-2/3 min-w-0 space-y-4 sm:space-y-6">
            <KuisLevel />
          </div>

          {/* Kolom kanan */}
          <div className="w-full lg:w-auto flex flex-col lg:flex-row gap-5">
            <KataMutiara />
          </div>
        </div>
      </main>
    );
}