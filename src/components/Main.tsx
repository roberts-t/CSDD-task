import { InspectionTable } from './InspectionTable.tsx';
import { useState } from 'react';
import { DbItem } from '../interfaces/interfaces.ts';
import { InspectionViewForm } from './InspectionViewForm.tsx';

export const Main = () => {
    const [data, setData] = useState<DbItem[] | null>(null);

    return (
        <main className="min-h-screen py-5">
            <div className="container mx-auto xl:px-16 px-5 mb-10">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">Tehniskās apskates laukuma pārskats</h1>
                    <div className="bg-[#f5f5f7] p-5 my-5 rounded shadow">
                        <InspectionViewForm setData={setData} />
                    </div>
                    <InspectionTable
                        setData={setData}
                        data={data}
                        inspectionLineCount={12}
                        inspectionLineLength={14}
                    />
                </div>
            </div>
        </main>
    );
};