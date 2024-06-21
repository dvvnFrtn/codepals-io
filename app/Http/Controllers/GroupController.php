<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\User;
use App\Models\JoinRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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
        return Inertia::render('Groups/DetailGroup', [
            'auth' => Auth::user(),
            'group' => $group,
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
}
