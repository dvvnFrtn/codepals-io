import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function DetailGroup({ auth, group, requests}) {
    console.log(group);
    console.log(requests);
    return (
        <AuthenticatedLayout user={auth}>
            <Head title={group.title} />

            <div className="max-w-5xl mx-auto p-8 bg-white shadow-sm rounded-lg mt-8">
                <h1 className="text-3xl font-semibold text-gray-800">{group.title}</h1>
                <p className="mt-4 text-gray-600">{group.description}</p>
                <div className="mt-6">
                    <p className="text-gray-800"><strong>Owner:</strong> {group.owner}</p>
                    <p className="text-gray-800"><strong>Max Users:</strong> {group.max_user}</p>
                </div>
            </div>
            {auth.name == group.owner ? 
                <div className="max-w-5xl mx-auto p-8 bg-white shadow-sm rounded-lg mt-2">
                <h1 className="text-2xl text-slate-800 font-semibold">Request Join</h1>
                {requests && requests.map((request) => (
                    <div className="w-auto rounded-md flex flex-col mt-4">
                        <div className="flex flex-row justify-between">
                            <h1>{request.requester_name}</h1>
                            <PrimaryButton>Accept</PrimaryButton>
                        </div>
                        <span className="text-xs text-gray-500">{request.created_at}</span>
                        <span className="font-semibold text-blue-500">{request.status}</span>
                    </div>
                ))}
            </div>
            : ""
            }
            
        </AuthenticatedLayout>
    );
}
