import { useState } from "react";
import axios from "axios";

export default function PostCard({
    id,
    username,
    body,
    updated_at,
    image_path,
    picture,
    isLiked,
    likesCount,
}) {
    const [liked, setLiked] = useState(isLiked);
    const [likeCount, setLikeCount] = useState(likesCount);

    const toggleLike = async () => {
        console.log("is Liked?" + isLiked);
        try {
            if (liked) {
                // Unlike the post
                await axios.delete(`/posts/${id}/like`);
                setLiked(false);
                setLikeCount(likeCount - 1);
            } else {
                // Like the post
                await axios.post(`/posts/${id}/like`);
                setLiked(true);
                setLikeCount(likeCount + 1);
            }
        } catch (error) {
            console.error("Error liking/unliking the post:", error);
        }
    };

    return (
        <div className="w-full flex flex-col bg-white shadow-sm rounded-xl p-6">
            <div className="flex flex-row items-center gap-6">
                <div className="bg-gray-300 rounded-full w-14 h-14">
                    <img
                        src={"/uploads/" + picture}
                        alt="profile"
                        className="w-auto rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <h1 className="font-semibold text-slate-800 text-xl">
                        {username}
                    </h1>
                    <p className="text-sm text-slate-400">{updated_at}</p>
                </div>
            </div>
            <p className="text-md text-slate-400 mt-8">{body}</p>
            {image_path && (
                <img
                    src={image_path}
                    alt="image"
                    className={
                        "mt-6 rounded-lg max-h-96 object-top object-cover"
                    }
                />
            )}
            <div className="flex flex-row mt-6 items-center gap-2">
                <svg
                    onClick={toggleLike}
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill={liked ? "#000000" : "none"}
                    stroke={liked ? "none" : "#000000"}
                    className="cursor-pointer"
                >
                    <path d="M12,21L10.807,19.835C5.125,14.651,2,11.215,2,7.32C2,4.333,4.337,2,7.333,2C9.333,2,11.157,3.426,12,4.61 C12.843,3.426,14.667,2,16.667,2C19.663,2,22,4.333,22,7.32C22,11.215,18.875,14.651,13.193,19.835L12,21z" />
                </svg>
                <span>{likeCount}</span>
            </div>
        </div>
    );
}
