<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupRequest;
use Illuminate\Http\Request;

class GroupRequestController extends Controller
{
    public function requestJoin(Request $request, Group $group)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $groupRequest = GroupRequest::create([
            'group_id' => $group->id,
            'user_id' => $request->user_id,
        ]);

        return redirect()->back();
    }

    public function approveRequest(GroupRequest $groupRequest)
    {
        $groupRequest->update(['status' => 'accepted']);

        // Tambahkan user ke grup
        $groupRequest->group->members()->attach($groupRequest->user_id);

        return redirect()->back();
    }
}
