import { DbItem } from '../interfaces/interfaces.ts';
import { JSX, useState } from 'react';
import { TableHeading } from './inspection_table/TableHeading.tsx';
import { TableData } from './inspection_table/TableData.tsx';
import { TableRow } from './inspection_table/TableRow.tsx';
import { RemoveConfirmationModal } from './modals/RemoveConfirmationModal.tsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const InspectionTable = ({data, inspectionLineCount, inspectionLineLength, setData}: InspectionTableProps) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [confirmModalData, setConfirmModalData] = useState<ConfirmModalData | null>(null);

    // Group data by line number
    const inspectionLines: InspectionLineGroup | undefined = data?.reduce((lineGroup: InspectionLineGroup, item: DbItem) => {
        const { numurs } = item;
        lineGroup[numurs] = lineGroup[numurs] ?? [];
        lineGroup[numurs].push(item);
        return lineGroup;
    }, {});

    const removeItem = (itemId: number) => {
        if (!data) return;
        const previousDataLength = data.length
        const newData = data?.filter((item) => item.id !== itemId);
        setData(newData ?? null);
        if (newData.length < previousDataLength) {
            toast.success('TL veiksmīgi izņemts no līnijas');
        } else {
            toast.error('TL neizdevās izņemt no līnijas');
        }
    }

    const handleRemoveClick = (item?: DbItem, lineNumber?: string | number) => {
        if (!item || !lineNumber) return;
        // Check if vehicle is still in the inspection area
        if (!item.s_datums) {
            toast.warning('TL nevar dzēst, jo tas vēl ir TA laukumā');
            return;
        }
        setConfirmModalData({
            registrationNumber: item.rn,
            onConfirmClick: () => removeItem(item.id),
            lineNumber,
        });
        setIsConfirmModalOpen(true);
    }

    const renderTableData = () => {
        const tableContent: JSX.Element[] = [];

        // Create horizontal headings row
        const tableRow: JSX.Element[] = [];
        for (let cell = 0; cell <= inspectionLineCount; cell++) {
            if (cell === 0) {
                tableRow.push(<TableHeading className="w-16" content="Vieta" key={`hh-${cell}`} />);
                continue;
            }
            tableRow.push(<TableHeading content={cell} key={`hh-${cell}`} />);
        }
        tableContent.push(<TableRow rowContent={tableRow} key="r-0" />);

        // Create main table content
        for (let row = 1; row <= inspectionLineLength; row++) {
            const tableRow: JSX.Element[] = [];
            for (let cell = 0; cell <= inspectionLineCount; cell++) {
                // Create vertical heading (place in line)
                if (cell === 0) {
                    tableRow.push(<TableHeading content={row} key={`hv-${cell}`} />);
                    continue;
                }
                // Create table cell with registration number
                const cellItem = inspectionLines?.[cell]?.[row-1];
                tableRow.push(
                    <TableData
                        content={cellItem?.rn ?? ''}
                        key={cellItem?.id ?? `${cell}-${row}`}
                        itemId={cellItem?.id}
                        onRemoveClick={() => handleRemoveClick(cellItem, cell)}
                    />
                )
            }
            tableContent.push(<TableRow rowContent={tableRow} key={`r-${row}`} />);
        }
        return tableContent;
    }

    return (
        <div className="overflow-auto">
            <table className="border-separate border-spacing-0 w-full h-full table-fixed min-w-[1160px]">
                <tbody>
                    {renderTableData()}
                </tbody>
            </table>
            {confirmModalData &&
                <RemoveConfirmationModal
                    isOpen={isConfirmModalOpen}
                    setIsOpen={setIsConfirmModalOpen}
                    onConfirmClick={confirmModalData.onConfirmClick}
                    registrationNumber={confirmModalData.registrationNumber}
                    lineNumber={confirmModalData.lineNumber}
                />
            }
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
            />
        </div>
    );
};

type InspectionTableProps = {
    setData: (data: DbItem[] | null) => void;
    data: DbItem[] | null;
    inspectionLineCount: number;
    inspectionLineLength: number;
}

type InspectionLineGroup = {
    [key: number] : DbItem[];
}

type ConfirmModalData = {
    registrationNumber: string;
    lineNumber: string | number;
    onConfirmClick: () => void;
}