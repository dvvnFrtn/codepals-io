import BasicDateCalendar from '@/Components/BasicDateCalendar';
import GroupCard from '@/Components/GroupCard';
import PostCard from '@/Components/PostCard';
import PrimaryButton from '@/Components/PrimaryButton';
import TimelineCard from '@/Components/TimelineCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="flex gap-8 justify-center">
                <div className="max-w-5xl pl-8 basis-3/4 flex-1">
                    <div className="w-full mx-auto mt-16 bg-blue-500 h-64 rounded-3xl"/>
                    <div className="w-full mx-auto mt-8">
                        <div className="flex flex-row justify-between items-center mb-8">
                            <h1 className="font-semibold text-slate-800 text-xl">Groups</h1>
                            <Link href={route('dashboard.groups')} className="text-sm text-blue-500">See all</Link>
                        </div>
                        <div className="flex flex-row justify-between">
                            <GroupCard/>
                            <GroupCard/>
                            <GroupCard/>
                        </div>
                    </div>

                    <div className="w-full mx-auto mt-8">
                        <div className="flex flex-row justify-between items-center mb-8">
                            <h1 className="font-semibold text-slate-800 text-xl">Posts</h1>
                            <Link href={route('dashboard.groups')} className="text-sm text-blue-500">See all</Link>
                        </div>
                        <PostCard/>
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
    );
}
