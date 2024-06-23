import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const Index = ({ auth, users, groups, posts }) => {
    const deleteUser = (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(`/admin/users/${userId}`);
        }
    };

    const deleteGroup = (groupId) => {
        if (confirm("Are you sure you want to delete this group?")) {
            Inertia.delete(`/admin/groups/${groupId}`);
        }
    };

    const deletePost = (postId) => {
        if (confirm("Are you sure you want to delete this post?")) {
            Inertia.delete(`/admin/posts/${postId}`);
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Admin Dashboard" />
            <div className="mt-8 px-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Users</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-6 py-4 text-left">ID</th>
                                    <th className="px-6 py-4 text-left">Name</th>
                                    <th className="px-6 py-4 text-left">Email</th>
                                    <th className="px-6 py-4 text-left">Picture</th>
                                    <th className="px-6 py-4 text-left">Account Role</th>
                                    <th className="px-6 py-4 text-left">Created At</th>
                                    <th className="px-6 py-4 text-left">Updated At</th>
                                    <th className="px-6 py-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b">
                                        <td className="px-6 py-4">{user.id}</td>
                                        <td className="px-6 py-4">{user.name}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <img src={user.picture} className="h-12 w-12 object-cover rounded-full" alt="User Picture" />
                                        </td>
                                        <td className="px-6 py-4">{user.account_role}</td>
                                        <td className="px-6 py-4">{user.created_at}</td>
                                        <td className="px-6 py-4">{user.updated_at}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => deleteUser(user.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Groups</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-6 py-4 text-left">ID</th>
                                    <th className="px-6 py-4 text-left">Title</th>
                                    <th className="px-6 py-4 text-left">Max User</th>
                                    <th className="px-6 py-4 text-left">Description</th>
                                    <th className="px-6 py-4 text-left">Owner</th>
                                    <th className="px-6 py-4 text-left">Created At</th>
                                    <th className="px-6 py-4 text-left">Updated At</th>
                                    <th className="px-6 py-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groups.map((group) => (
                                    <tr key={group.id} className="border-b">
                                        <td className="px-6 py-4">{group.id}</td>
                                        <td className="px-6 py-4">{group.title}</td>
                                        <td className="px-6 py-4">{group.max_user}</td>
                                        <td className="px-6 py-4">{group.description}</td>
                                        <td className="px-6 py-4">{group.owner}</td>
                                        <td className="px-6 py-4">{group.created_at}</td>
                                        <td className="px-6 py-4">{group.updated_at}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => deleteGroup(group.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Posts</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-6 py-4 text-left">ID</th>
                                    <th className="px-6 py-4 text-left">Content</th>
                                    <th className="px-6 py-4 text-left">Image</th>
                                    <th className="px-6 py-4 text-left">Created At</th>
                                    <th className="px-6 py-4 text-left">Updated At</th>
                                    <th className="px-6 py-4 text-left">User ID</th>
                                    <th className="px-6 py-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id} className="border-b">
                                        <td className="px-6 py-4">{post.id}</td>
                                        <td className="px-6 py-4">{post.content}</td>
                                        <td className="px-6 py-4">
                                            <img src={post.image_path} className="h-12 w-12 object-cover rounded-full" alt="Post Image" />
                                        </td>
                                        <td className="px-6 py-4">{post.created_at}</td>
                                        <td className="px-6 py-4">{post.updated_at}</td>
                                        <td className="px-6 py-4">{post.user_id}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => deletePost(post.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
