import { JSX } from 'react';

export const TableRow = ({ rowContent }: TableRowProps) => {
    return (
        <tr className="border-collapse border border-gray-500">
            {rowContent}
        </tr>
    );
};

type TableRowProps = {
    rowContent: JSX.Element[];
}