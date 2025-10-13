import type { Credit } from "../types/credit";

interface CreditCardProps {
    credit : Credit;
}

const CreditCard = ({credit} : CreditCardProps) => {
    return (
        <>
            <li className="flex flex-col items-center text-center">
                <img src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`} className="w-16 h-16 rounded-full object-cover mx-auto shadow-md"/>
                <div className="mt-2 font-semibold text-sm">{credit.name}</div>
                <div className="text-xs text-gray-500">{credit.character}</div>
            </li>
        </>
    )
}

export default CreditCard;