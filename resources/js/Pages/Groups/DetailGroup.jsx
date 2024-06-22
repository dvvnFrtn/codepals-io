import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function DetailGroup({ auth, group, isOwner, requests, isMember}) {
    const approveRequest = (groupRequest) => {
        // Kirim permintaan POST ke endpoint approveRequest
        axios.post(route('group-requests.approve', groupRequest))
            .then(response => {
                // Handle sukses
                console.log('Request approved successfully');
                // Refresh halaman atau lakukan manipulasi sesuai kebutuhan
                window.location.reload();
            })
            .catch(error => {
                // Handle error
                console.error('Error approving request:', error);
            });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={group?.title} />

            <div className="max-w-5xl mx-auto p-8 bg-white shadow-sm rounded-lg mt-8">
                <div className="flex flex-row justify-between">
                    <h1 className="text-3xl font-semibold text-gray-800">{group?.title}</h1>
                    {isMember && (
                        <Link href={route('group.chat', group?.id)}>
                            <SecondaryButton>Chat</SecondaryButton>
                        </Link>
                    )}
                </div>
                <p className="mt-4 text-gray-600">{group?.description}</p>
                <div className="mt-6">
                    <p className="text-gray-800"><strong>Owner:</strong> {group?.owner}</p>
                    <p className="text-gray-800"><strong>Max Users:</strong> {group?.max_user}</p>
                </div>
                {isOwner && (
                    <div className="mt-6">
                        <Link href={route('groups.findMember', group?.id)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Find Member
                        </Link>
                    </div>
                )}
            </div>
            {auth?.name == group?.owner ? 
                <div className="max-w-5xl mx-auto p-8 bg-white shadow-sm rounded-lg mt-2">
                <h1 className="text-2xl text-slate-800 font-semibold">Request Join</h1>
                {requests && requests.map((request) => (
                    <div className="w-auto rounded-md flex flex-col mt-4">
                        <div className="flex flex-row justify-between">
                            <h1>{request?.requester_name}</h1>
                            {request?.status !== "accepted" ? <PrimaryButton onClick={() => approveRequest(request?.id)}>Accept</PrimaryButton> : ""}
                        </div>
                        <span className="text-xs text-gray-500">{request?.created_at}</span>
                        <span className="font-semibold text-blue-500">{request?.status}</span>
                    </div>
                ))}
            </div>
            : ""
            }
            
        </AuthenticatedLayout>
    );
}
