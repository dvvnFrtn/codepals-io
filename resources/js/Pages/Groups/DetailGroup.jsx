import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function DetailGroup({ auth, group }) {
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
        </AuthenticatedLayout>
    );
}
