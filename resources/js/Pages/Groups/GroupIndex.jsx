import BasicDateCalendar from "@/Components/BasicDateCalendar"
import GroupAuthCard from "@/Components/GroupAuthCard"
import TimelineCard from "@/Components/TimelineCard"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"

export default function GroupIndex({auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Groups" />

            <div className="flex gap-8 justify-center">
                <div className="max-w-5xl pl-8 basis-3/4 flex-1">
                    <h1 className="font-semibold text-2xl text-slate-800 mt-16 mb-8">My Groups</h1>
                    <div className="flex flex-col gap-6">
                        <GroupAuthCard/>
                        <GroupAuthCard/>
                        <GroupAuthCard/>
                    </div>
                </div>
                <div className="w-full basis-1/4 pr-8 mt-8">
                    <BasicDateCalendar/>
                    <TimelineCard/>
                    <TimelineCard/>
                    <TimelineCard/>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
