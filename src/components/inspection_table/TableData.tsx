import { LicensePlate } from '../LicensePlate.tsx';

export const TableData = ({content, itemId, onRemoveClick}: TableDataProps) => {

    const handleRemoveClick = () => {
        if (onRemoveClick && itemId) onRemoveClick();
    }

    return (
        <td className="border-collapse border border-gray-300 text-center py-1.5 px-2 h-full">
            {content &&
                <button
                    className="cursor-pointer w-full h-full focus-visible:ring focus-visible:ring-green-600 focus-visible:outline-none rounded"
                    type="button"
                    onClick={handleRemoveClick}
                >
                    <LicensePlate registrationNumber={content} />
                </button>
            }
        </td>
    );
};

type TableDataProps = {
    content?: string;
    itemId?: number;
    onRemoveClick?: () => void;
}