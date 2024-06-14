import PrimaryButton from "./PrimaryButton";

export default function GroupCard({title, owner, description}) {
    return (
        <div className="flex flex-col gap-6 bg-white rounded-xl shadow-sm min-w-80 max-w-80 p-6">
            <div className="flex flex-col">
                <h1 className="font-semibold text-lg text-slate-800">{title}</h1>
                <p className="text-slate-400 text-xs">{owner}</p>
            </div>
            <p className="text-slate-500 text-sm truncate">
                {description}
            </p>
            <div className="flex justify-between items-center">
                <span className="text-sm text-blue-500">0/3</span>
                <PrimaryButton>Req</PrimaryButton>
            </div>
        </div>
    );
}
