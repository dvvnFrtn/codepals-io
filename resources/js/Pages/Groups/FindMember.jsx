import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function FindMember({ auth, group, users }) {
    const { post } = useForm();
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentUser = users[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % users?.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + users?.length) % users?.length);
    };

    return (
        <AuthenticatedLayout user={auth}>
            <Head title={`Find ${group?.title}`} />
            
            <div className="bg-white shadow-sm rounded-lg mt-8 h-screen">
                <h1 className="max-w-5xl mx-auto p-8">Add Members to {group?.title}</h1>
                <div className="h-4/5 mt-6 flex justify-between items-center">
                    <SecondaryButton className="mx-5" onClick={handlePrev}>
                        Previous
                    </SecondaryButton>
                    <div className="bg-gray-100 p-8 rounded-lg shadow-sm flex justify-between w-full h-full">
                        <div className="bg-white shadow-sm rounded-lg flex justify-between w-2/5">
                            <img src={"/uploads/" + currentUser.picture} className="w-full bg-white p-6 rounded-xl shadow-sm mt-5 object-cover object-center" />
                        </div>
                        <div className="flex flex-col justify-between ml-10 w-full">
                            <p className="bg-white shadow-sm rounded-lg text-gray-600 p-10 h-3/5">{currentUser.description}</p>
                            <div className="bg-white shadow-sm rounded-lg flex justify-between items-center p-10 h-1/5">
                                <p className="text-gray-600 text-center font-extrabold">{currentUser.name}</p>
                                <div className="flex">
                                    <p className="text-gray-700 text-center font-extrabold">Role: </p>
                                    <p className="text-gray-400 text-center ml-1">{currentUser.role}</p>
                                </div>
                                <div className="flex">
                                    <p className="text-gray-700 text-center font-extrabold">Status: </p>
                                    <p className="text-gray-400 text-center ml-1">{currentUser.status}</p>
                                </div>
                            </div>
                            <PrimaryButton className="mt-4 mx-auto max-w-xs">
                                Invite
                            </PrimaryButton>
                        </div> 
                    </div>
                    <SecondaryButton className="mx-5" onClick={handleNext}>
                        Next
                    </SecondaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}