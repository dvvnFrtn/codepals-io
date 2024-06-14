<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\User;
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

        // Mengambil semua grup di mana pengguna saat ini adalah owner
        $ownedGroups = Group::where('owner', $user->name)->get();

        // Mengambil semua grup di mana pengguna saat ini adalah member
        $memberGroups = $user->groups()->get(); // Pastikan method `groups()` ada di model User

        // Menggabungkan dan menghapus duplikasi grup
        $groups = $ownedGroups->merge($memberGroups)->unique();

        return Inertia::render('Groups/GroupIndex', [
            'auth' => Auth::user(),
            "groups" => $groups
        ]);
    }
    
    public function all() {
        $groupsAll = Group::all();
        return Inertia::render('Groups/GroupAll', [
            'groupsAll'=> $groupsAll
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

        Group::create([
            'title' => $request->title,
            'max_user' => $request->max_user,
            'description' => $request->description,
            'owner' => $user->name, // Set owner ke user yang sedang login
        ]);

        return redirect()->route('groups.index'); // Redirect ke halaman My Groups setelah berhasil membuat grup
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $group)
    {
        //
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
