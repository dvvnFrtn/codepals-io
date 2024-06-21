import BasicDateCalendar from "@/Components/BasicDateCalendar";
import GroupCard from "@/Components/GroupCard";
import PostCard from "@/Components/PostCard";
import PrimaryButton from "@/Components/PrimaryButton";
import TimelineCard from "@/Components/TimelineCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, groups, post }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="flex gap-8 justify-center">
                <div className="max-w-5xl pl-8 basis-3/4 flex-1">
                    <div className="w-full mx-auto mt-16 bg-blue-500 h-64 rounded-3xl" />
                    <div className="w-full mx-auto mt-8">
                        <div className="flex flex-row justify-between items-center mb-8">
                            <h1 className="font-semibold text-slate-800 text-xl">
                                Groups
                            </h1>
                            <Link
                                href={route("dashboard.groups")}
                                className="text-sm text-blue-500"
                            >
                                See all
                            </Link>
                        </div>
                        <div className="flex flex-row justify-between">
                            {groups &&
                                groups.map((group) => (
                                    <Link key={group?.id} href={route('groups.show', group.id)}>
                                        <GroupCard
                                            auth={auth.user}
                                            groupId={group.id}
                                            key={group?.id}
                                            title={group?.title}
                                            owner={group?.owner}
                                            description={group?.description}
                                            reqCount={group?.requests_count}
                                        />
                                    </Link>
                                ))}
                        </div>
                    </div>

                    <div className="w-full mx-auto mt-8">
                        <div className="flex flex-row justify-between items-center mb-8">
                            <h1 className="font-semibold text-slate-800 text-xl">
                                Posts
                            </h1>
                            <Link
                                href={route("dashboard.posts")}
                                className="text-sm text-blue-500"
                            >
                                See all
                            </Link>
                        </div>
                        <PostCard
                            key={post?.id}
                            id={post?.id}
                            username={post?.user.name}
                            body={post?.content}
                            updated_at={post?.formatted_updated_at}
                            image_path={post?.image_path}
                            picture={post?.user.picture}
                            isLiked={post?.is_liked}
                            likesCount={post?.likes_count}
                        />{" "}
                    </div>
                </div>
                <div className="w-full basis-1/4 pr-8 mt-8">
                    <BasicDateCalendar />
                    <TimelineCard />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
