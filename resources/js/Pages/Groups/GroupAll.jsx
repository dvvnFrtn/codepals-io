import BasicDateCalendar from "@/Components/BasicDateCalendar";
import GroupCard from "@/Components/GroupCard";
import TimelineCard from "@/Components/TimelineCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function GroupAll({ auth, groupsAll }) {
    console.log(groupsAll);
    return (
        <AuthenticatedLayout user={auth}>
            <Head title="Groups" />

            <div className="flex gap-8 justify-center">
                <div className="max-w-5xl pl-8 basis-3/4 flex-1">
                    <div className="flex flex-col w-full bg-white rounded-xl shadow-sm p-6 mt-16 mb-8">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="font-semibold text-2xl text-slate-800">All Groups</h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {groupsAll && groupsAll.map((group) => (
                            <GroupCard
                                auth={auth.user}
                                groupId={group.id}
                                title={group.title}
                                owner={group.owner}
                                description={group.description}
                                reqCount={group.requests_count}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full basis-1/4 pr-8 mt-8">
                    <BasicDateCalendar />
                    <TimelineCard />
                    <TimelineCard />
                    <TimelineCard />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
