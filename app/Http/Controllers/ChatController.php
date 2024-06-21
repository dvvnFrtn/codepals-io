<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index($groupId)
    {
        $group = Group::with('chats.user')->findOrFail($groupId);
        return Inertia::render('Chats/Index', [
            'group' => $group,
            'chats' => $group->chats
        ]);
    }

    public function store(Request $request, $groupId)
    {
        $chat = Chat::create([
            'group_id' => $groupId,
            'user_id' => auth()->id(),
            'message' => $request->message
        ]);

        broadcast(new MessageSent($chat->load('user')))->toOthers();

        return response()->json(['status' => 'Message Sent!']);
    }
}
