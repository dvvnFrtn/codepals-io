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

        if ($group->members()->count() !== $group->max_user) {
            $groupRequest = GroupRequest::create([
                'group_id' => $group->id,
                'user_id' => $request->user_id,
            ]);
        }

        return redirect()->back();
    }

    public function approveRequest(GroupRequest $groupRequest)
    {
        $group = Group::find($groupRequest->group_id);
        if ($group->members()->count() !== $group->max_user) {
            $groupRequest->update(['status' => 'accepted']);
            // Tambahkan user ke grup
            $groupRequest->group->members()->attach($groupRequest->user_id);
        }
        return redirect()->back();
    }
}
