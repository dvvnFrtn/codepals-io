import PrimaryButton from "./PrimaryButton";

export default function GroupCard() {
    return (
        <div className="flex flex-col gap-6 bg-white rounded-xl shadow-sm max-w-80 p-6">
            <div className="flex flex-col">
                <h1 className="font-semibold text-lg text-slate-800">Title</h1>
                <p className="text-slate-400 text-xs">Owner Name</p>
            </div>
            <p className="text-slate-500 text-sm truncate">
                Tempor voluptate culpa dolor non fugiat cupidatat anim sunt
                deserunt dolore esse. Cillum ut sunt exercitation exercitation
                aliqua reprehenderit anim tempor ipsum. Velit culpa veniam enim
                Lorem quis et dolor in incididunt exercitation. Culpa sint ad
                enim ullamco eiusmod non laboris do non nulla est. Sint minim
                officia laborum adipisicing sint nulla laboris occaecat sint et.
                Mollit sint adipisicing tempor ad reprehenderit nisi nisi enim
                et.
            </p>
            <div className="flex justify-between items-center">
                <span className="text-sm text-blue-500">0/3</span>
                <PrimaryButton>Req</PrimaryButton>
            </div>
        </div>
    );
}
