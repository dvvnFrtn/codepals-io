import BasicDateCalendar from "@/Components/BasicDateCalendar";
import GroupAuthCard from "@/Components/GroupAuthCard";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import TimelineCard from "@/Components/TimelineCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { useState } from "react";

export default function GroupIndex({ auth, groups }) {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { data, setData, post, reset } = useForm({
        title: '',
        max_user: 0,
        description: ''
    });

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('groups.store'), {
            onSuccess: () => {
                reset();
                setIsFormVisible(false); // Mengatur isFormVisible kembali ke false setelah berhasil menyimpan
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth}>
            <Head title="Groups" />

            <div className="flex gap-8 justify-center">
                <div className="max-w-5xl pl-8 basis-3/4 flex-1">
                    <div className="flex flex-col w-full bg-white rounded-xl shadow-sm p-6 mt-16 mb-8">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="font-semibold text-2xl text-slate-800">My Groups</h1>
                            <PrimaryButton onClick={toggleFormVisibility}>New Group</PrimaryButton>
                        </div>
                        {isFormVisible && (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
                                <div className="flex gap-4 w-full">
                                    <div className="flex w-full flex-col gap-2">
                                        <InputLabel htmlFor="title" value="Group Title" />
                                        <TextInput
                                            className="w-full"
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex w-full flex-col gap-2">
                                        <InputLabel htmlFor="max_user" value="Max User" />
                                        <TextInput
                                            type="number"
                                            className="w-full"
                                            id="max_user"
                                            value={data.max_user}
                                            onChange={(e) => setData('max_user', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel htmlFor="description" value="Group Description" />
                                    <TextArea
                                        className="w-full"
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <PrimaryButton type="submit">Create</PrimaryButton>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className="flex flex-col gap-6">
                        {groups && groups.map((group) => (
                            <Link key={group?.id} href={route('groups.show', group.id)}>
                                <GroupAuthCard title={group?.title} />
                            </Link>
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
