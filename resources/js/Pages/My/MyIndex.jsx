import BasicDateCalendar from "@/Components/BasicDateCalendar";
import GroupCard from "@/Components/GroupCard";
import InputLabel from "@/Components/InputLabel";
import PostCard from "@/Components/PostCard";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import TimelineCard from "@/Components/TimelineCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function MyIndex({auth}) {
    const [isUploadImage, setIsUploadImage] = useState(false);
    const [isEditData, setIsEditData] = useState(false);
    const [isEditDesc, setIsEditDesc] = useState(false);
    const [picture, setPicture] = useState(null);
    const [desc, setDesc] = useState({
        description: auth?.description
    });
    const [values, setValues] = useState({
        name: auth?.name,
        role: auth?.role,
        status: auth?.status,
    });
    const [error, setError] = useState(null);

    const handleEditImageClick = (e) => {
        e.preventDefault();
        setIsUploadImage(true);
    };

    const handleEditDescClick = (e) => {
        e.preventDefault();
        setIsEditDesc(true);
    };

    const handleEditDataClick = (e) => {
        e.preventDefault();
        setIsEditData(true);
    };

    const handlePictureChange = (e) => {
        setPicture(e.target.files[0]);
    };

    function handleDescChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setDesc(values => ({
            ...values,
            [key]: value,
        }));
    }

    function handleValuesChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    }

    const submitPicture = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('picture', picture);

        await axios.post('/picture', formData)
            .then((response) => {
                router.reload();
                setIsUploadImage(false);
            })
            .catch((error) => {
                setError('Failed to upload picture.');
            });
    };

    const submitData = (e) => {
        e.preventDefault();
        router.put('/user/update', values);
        setIsEditData(false);
    };

    const submitDesc = (e) => {
        e.preventDefault();
        router.put('/user/desc/update', desc);
        setIsEditDesc(false);
    };

    return (
        <AuthenticatedLayout
            user={auth}
        >
            <Head title="My" />

            <div className="flex gap-8 justify-center">
                <div className="max-w-5xl pl-8 basis-3/4 flex-1">
                    <form onSubmit={submitDesc} className="flex flex-col gap-6 w-full bg-white rounded-xl shadow-sm p-6 mt-16 mb-8">
                        <div className="flex justify-between">
                            <h1 className="font-semibold text-xl text-slate-800">About Me</h1>
                            <PrimaryButton type="submit" className={isEditDesc ? "" : "hidden"}>Save</PrimaryButton>
                            <PrimaryButton onClick={handleEditDescClick} className={!isEditDesc ? "" : "hidden"}>Edit Desc</PrimaryButton>
                        </div>
                        <TextArea id="description" name="description" className={(isEditDesc ? "" : "hidden")} defaultValue={auth?.description} onChange={handleDescChange}/>
                        <p className={"text-md text-slate-400 " + (!isEditDesc ? "" : "hidden") }>{auth?.description}</p>
                    </form>
                    <div className="flex flex-col gap-6">
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                    </div>
                </div>
                <div className="w-full basis-1/4 pr-8 mt-8">
                    {/* Preview Image */}
                    <div className="w-full bg-white p-6 rounded-xl shadow-sm mt-8">
                        <img src={auth?.picture ? "/uploads/" + auth?.picture : "/dummy-img.jpg"} alt="profile" className="w-full object-cover rounded-xl h-96" />
                    </div>

                    {/* Form Upload Image */}
                    <form onSubmit={submitPicture} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm mt-6">
                        <div className="flex flex-col gap-2">
                            <TextInput type="file" className={"w-full " + (isUploadImage ? "" : "hidden") } id="image" name="image" placeholder="Choose file" onChange={handlePictureChange}/>
                            <PrimaryButton type="submit" className={isUploadImage ? "" : "hidden"}>Save</PrimaryButton>
                            <PrimaryButton onClick={handleEditImageClick} className={!isUploadImage ? "" : "hidden"}>Edit Image</PrimaryButton>
                        </div>                       
                    </form>

                    {/* Form Edit Field */}
                    <form onSubmit={submitData} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm mt-6">
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="name" value={"Name"} />
                            <TextInput className="w-full" name="name" id="name" disabled={!isEditData} defaultValue={auth?.name} onChange={handleValuesChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="role" value={"Role"} />
                            <TextInput className="w-full" name="role" id="role" disabled={!isEditData} defaultValue={auth?.role} onChange={handleValuesChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="status" value={"Status"} />
                            <TextInput className="w-full" name="status" id="status" disabled={!isEditData} defaultValue={auth?.status} onChange={handleValuesChange} />
                        </div>
                        <PrimaryButton type="submit" className={isEditData ? "" : "hidden"}>Save</PrimaryButton>
                        <PrimaryButton onClick={handleEditDataClick} className={!isEditData ? "" : "hidden"}>Edit Data</PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
