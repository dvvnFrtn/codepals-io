export default function PostCard({username, body, updated_at, image_path, picture}) {
    return (
        <div className="w-full flex flex-col bg-white shadow-sm rounded-xl p-6">
            <div className="flex flex-row items-center gap-6">
                <div className="bg-gray-300 rounded-full w-14 h-14">
                    <img src={"/uploads/" + picture} alt="profile" className="w-auto rounded-full object-cover" />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <h1 className="font-semibold text-slate-800 text-xl">
                        {username}
                    </h1>
                    <p className="text-sm text-slate-400">{updated_at}</p>
                </div>
            </div>
            <p className="text-md text-slate-400 mt-8">
                {body}
            </p>
            { image_path && <img
                src={ image_path }
                alt="image"
                className={"mt-6 rounded-lg max-h-96 object-top object-cover"}
            /> }
            <div className="flex flex-row mt-6 items-center gap-2">
                <svg viewBox="0 0 24 24" width="24" height="24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <title>love [#1489]</title>
                        <desc>Created with Sketch.</desc>
                        <defs> </defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Dribbble-Light-Preview" fill="#000000" transform="translate(1.5, 1.5)">
                                <path d="M55.5929644,215.348992 C55.0175653,215.814817 54.2783665,216.071721 53.5108177,216.071721 C52.7443189,216.071721 52.0030201,215.815817 51.4045211,215.334997 C47.6308271,212.307129 45.2284309,210.70073 45.1034811,207.405962 C44.9722313,203.919267 48.9832249,202.644743 51.442321,205.509672 C51.9400202,206.088455 52.687619,206.420331 53.4940177,206.420331 C54.3077664,206.420331 55.0606152,206.084457 55.5593644,205.498676 C57.9649106,202.67973 62.083004,203.880281 61.8950543,207.507924 C61.7270546,210.734717 59.2322586,212.401094 55.5929644,215.348992 M53.9066671,204.31012 C53.8037672,204.431075 53.6483675,204.492052 53.4940177,204.492052 C53.342818,204.492052 53.1926682,204.433074 53.0918684,204.316118 C49.3717243,199.982739 42.8029348,202.140932 43.0045345,207.472937 C43.1651842,211.71635 46.3235792,213.819564 50.0426732,216.803448 C51.0370217,217.601149 52.2739197,218 53.5108177,218 C54.7508657,218 55.9898637,217.59915 56.9821122,216.795451 C60.6602563,213.815565 63.7787513,211.726346 63.991901,207.59889 C64.2754005,202.147929 57.6173611,199.958748 53.9066671,204.31012" id="love-[#1489]" transform="translate(-45, -199)">
                                </path>
                            </g>
                        </g>
                    </g>
                </svg>
                <span>321</span>
            </div>
        </div>
    );
}
