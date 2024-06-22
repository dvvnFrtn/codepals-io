// resources/js/Pages/Chat/Index.jsx

import React, { useState, useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Chat({ group, chats }) {
    const { auth } = usePage().props;
    const [messages, setMessages] = useState(chats);
    const [message, setMessage] = useState('');

    useEffect(() => {
        window.Pusher = Pusher;

        window.Echo = new Echo({
            broadcaster: 'pusher',
             key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            encrypted: true
        });

        window.Echo.private(`group.${group.id}`)
            .listen('MessageSent', (e) => {
                setMessages([...messages, e.chat]);
            });

        return () => {
            window.Echo.leave(`group.${group.id}`);
        };
    }, [messages, group.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(route('group.chat.store', group.id), { message })
            .then(response => {
                setMessage('');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    return (
        <AuthenticatedLayout user={auth}>
            <Head title='Chat'/>
            <div className="max-w-5xl mx-auto p-8 bg-white shadow-sm rounded-lg mt-8">
                <h1 className="text-3xl font-semibold text-gray-800">{group.title}</h1>
                <div className="chat-container">
                    <div className="chat-messages overflow-y-auto max-h-96 mt-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className="flex justify-between mb-2">
                                <div className="bg-gray-200 rounded-lg p-2">
                                    <strong>{msg.user.name}</strong>: {msg.message}
                                </div>
                                <div className="text-xs text-gray-500">{msg.created_at}</div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="flex mt-4">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
