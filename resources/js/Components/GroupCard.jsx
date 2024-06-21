import { router } from "@inertiajs/react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function GroupCard({auth, groupId, title, owner, description, reqCount}) {
    const handleRequestJoin = () => {
        router.post(route('group.request', { group: groupId }), {
            user_id: auth.id
        }, {
            onSuccess: () => {
                alert('Request sent successfully!');
            },
            onError: (errors) => {
                console.error(errors);
                alert('Failed to send request.');
            }
        });
    };
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
                { auth.name !== owner ? 
                    <PrimaryButton onClick={handleRequestJoin}>Req</PrimaryButton> : 
                    <SecondaryButton>{reqCount} Req</SecondaryButton>
                }
            </div>
        </div>
    );
}
