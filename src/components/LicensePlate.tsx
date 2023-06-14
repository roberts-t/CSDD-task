export const LicensePlate = ({ registrationNumber }: LicensePlateProps) => {
    return (
        <div className="flex flex-row border-2 shadow border-gray-700 rounded w-full mx-auto">
            <div className="w-2 bg-blue-700 flex-shrink-0" />
            <span className="w-full text-center font-medium xl:text-base text-sm">{registrationNumber}</span>
        </div>
    );
};

type LicensePlateProps = {
    registrationNumber: string;
}