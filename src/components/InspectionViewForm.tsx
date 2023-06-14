import React, { useState } from 'react';
import dbJson from '../data/db.json';
import { DbItem } from '../interfaces/interfaces.ts';

export const InspectionViewForm = ({ setData }: InspectionViewFormProps) => {
    const [formError, setFormError] = useState<string | null>(null);
    const [datetime, setDatetime] = useState('');

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);
        if (!datetime) {
            setFormError('Lūdzu ievadiet datumu un laiku');
            return;
        }
        const selectedDate = new Date(datetime);
        if (selectedDate.toString() === 'Invalid Date') {
            setFormError('Ievadītais datums un laiks nav derīgs');
            return;
        }

        const filteredData = dbJson.items.filter((item) => {
            const startDate = new Date(item.datums);
            let endDate: Date | null = null;
            if (item.s_datums) {
                endDate = new Date(item.s_datums);
            }
            return startDate < selectedDate && (!endDate || endDate > selectedDate);
        });

        // Technically data is already sorted in ascending order by id in db.json so this is not necessary
        // Data will be split into line groups in the same order which will already be sorted by id
        // Added in case db.json is changed to not be sorted by id
        filteredData.sort((a, b) => a.id - b.id);

        setData(filteredData);
    };

    return (
        <>
            <form
                className="flex flex-row"
                onSubmit={handleFormSubmit}
            >
                <input
                    className={`border rounded px-2 py-1 mr-2 ${formError ? 'border-red-500' : 'border-green-600'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-opacity-75`}
                    type="datetime-local"
                    value={datetime}
                    step={1}
                    onChange={(e) => setDatetime(e.target.value)}
                />
                <button
                    type="submit"
                    className="rounded px-3.5 py-1 bg-green-600 text-white hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-opacity-75 focus-visible:ring-offset-1 transition-colors"
                >
                    Apskatīt
                </button>
            </form>
            {formError && <span className="text-red-500 mt-1.5">{formError}</span>}
        </>
    );
};

type InspectionViewFormProps = {
    setData: (data: DbItem[] | null) => void;
}