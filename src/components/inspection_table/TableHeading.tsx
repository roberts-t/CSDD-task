export const TableHeading = ({content, className}: TableHeadingProps) => {
    return (
        <th className={`border-collapse border border-gray-300 bg-gray-100 px-2 py-1 font-normal ${className}`}>{content}</th>
    );
};

type TableHeadingProps = {
    content: string | number;
    className?: string;
}