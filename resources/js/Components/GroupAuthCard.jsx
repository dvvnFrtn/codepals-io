import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function GroupAuthCard({title}) {
    return (
        <div className="flex flex-col bg-white rounded-xl shadow-sm w-full p-6 gap-6">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-slate-800 font-semibold text-xl">{title}</h1>
                <SecondaryButton>0 Req</SecondaryButton>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-md text-slate-400">Username: Pariatur ad ut fugiat proident.</p>
                <p className="text-sm text-slate-400">22:08</p>
            </div>
        </div>
    )
}