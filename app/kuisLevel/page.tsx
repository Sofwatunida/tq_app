import React from 'react';
import KuisLevel from 'kuisLevel';
import KataMutiara from 'kataMutiara';

export default function KuisLevelPages() {
    return (
        <main className="min-h-screen bg-gray-100 pt-28 pb-20">
            <div className="w-[90%] mx-auto flex gap-6">
                
                {/* Kolom kiri */}
                <div className="w-2/3 space-y-6">
                    <KuisLevel />
                </div>

                {/* Kolom kanan */}
                <div className="w-1/3 space-y-6">
                    <KataMutiara />
                </div>
            </div>
        </main>
    );
}