<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Group;
use App\Models\Post;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $users = User::all();
        $groups = Group::all();
        $posts = Post::all();

        return Inertia::render('Admin/Dashboard/Index', [
            'users' => $users,
            'groups' => $groups,
            'posts' => $posts,
        ]);
    }
}
