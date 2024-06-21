<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Group;
use App\Models\User;
use App\Models\JoinRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function findMember(Group $group)
    {
        $authUser = Auth::user();
        $users = User::where('id', '!=', $authUser->id)->get(); // Exclude the logged-in user
    
        return Inertia::render('Groups/FindMember', [
            'auth' => $authUser,
            'group' => $group,
            'users' => $users->map(function($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'role' => $user->role,
                    'status' => $user->status,
                    'picture' => $user->picture,
                    'description' => $user->description,
                ];
            }),
        ]);
    }
    
     public function index()
    {
        $user = User::find(Auth::user()->id);

        $ownedGroups = Group::withCount('requests')
                        ->where('owner', $user->name)
                        ->get();

        $memberGroups = $user->groups()
                        ->withCount('requests')
                        ->get();

        $groups = $ownedGroups->merge($memberGroups)->unique();

        return Inertia::render('Groups/GroupIndex', [
            'auth' => Auth::user(),
            "groups" => $groups
        ]);
    }

    public function all()
    {
        $groupsAll = Group::withCount('requests')
                        ->get();
        return Inertia::render('Groups/GroupAll', [
            'groupsAll' => $groupsAll
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'max_user' => 'required|integer',
            'description' => 'nullable|string'
        ]);
    
        $user = $request->user();
    
        // Membuat grup baru
        $group = Group::create([
            'title' => $request->title,
            'max_user' => $request->max_user,
            'description' => $request->description,
            'owner' => $user->name, // Set owner ke user yang sedang login
        ]);
    
        // Menambahkan owner sebagai member dari grup
        $group->members()->attach($user);
    
        return redirect()->route('groups.index'); // Redirect ke halaman My Groups setelah berhasil membuat grup
    }  

    /**
     * Display the specified resource.
     */
    public function show(Group $group)
    {
        $requests = DB::table('group_requests')
                    ->where('group_id', $group->id)
                    ->leftJoin('users', 'group_requests.user_id', '=', 'users.id')
                    ->select('group_requests.*', 'users.name as requester_name')
                    ->get();

        $user = Auth::user();
    
        // Check if the current user is a member of the group
        $isMember = $group->members()->where('user_id', $user->id)->exists();
    
        return Inertia::render('Groups/DetailGroup', [
            'auth' => $user,
            'group' => $group,
            'isOwner' => $group->owner === $user->name,
            'isMember' => $isMember,
            'requests' => $requests
        ]);
    }    


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Group $group)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Group $group)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        //
    }

    public function getLastChat(Group $group)
    {
        $lastChat = Chat::where('group_id', $group->id)
                        ->latest() // Mengambil chat terakhir berdasarkan timestamp
                        ->first();

        return response()->json($lastChat);
    }
}
