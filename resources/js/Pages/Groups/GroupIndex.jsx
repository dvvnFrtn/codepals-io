import BasicDateCalendar from "@/Components/BasicDateCalendar"
import GroupAuthCard from "@/Components/GroupAuthCard"
import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import TextArea from "@/Components/TextArea"
import TextInput from "@/Components/TextInput"
import TimelineCard from "@/Components/TimelineCard"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import { useState } from "react"

export default function GroupIndex({auth}) {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Groups" />

            <div className="flex gap-8 justify-center">
                <div className="max-w-5xl pl-8 basis-3/4 flex-1">
                    <div className="flex flex-col w-full bg-white rounded-xl shadow-sm p-6 mt-16 mb-8">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="font-semibold text-2xl text-slate-800">My Groups</h1>
                            <PrimaryButton onClick={toggleFormVisibility}>New Group</PrimaryButton>
                        </div>
                        {isFormVisible && (
                            <form method="post" className="flex flex-col gap-6 mt-6">
                                <div className="flex gap-4 w-full">
                                    <div className="flex w-full flex-col gap-2">
                                        <InputLabel htmlFor="title" value={"Group Title"}/>
                                        <TextInput className="w-full" id="title" />
                                    </div>
                                    <div className="flex w-full flex-col gap-2">
                                        <InputLabel htmlFor="max_user" value={"Max User"}/>
                                        <TextInput type={"number"} className="w-full" id="max_user" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel htmlFor="description" value={"Group Description"} />
                                    <TextArea className="w-full" id="description" />
                                </div>
                                <div className="flex justify-end">
                                    <PrimaryButton>Create</PrimaryButton>
                                </div>
                            </form>
                        )}
                    </div>
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
