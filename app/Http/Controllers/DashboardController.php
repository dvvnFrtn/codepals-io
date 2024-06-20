<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {
        $groups = Group::take(3)->get();
        $post = Post::with("user:id,name,picture")
            ->latest()
            ->first();

        if ($post) {
            $post = [
                'id' => $post->id,
                'content' => $post->content,
                'image_path' => $post->image_path,
                'formatted_updated_at' => $post->formatted_updated_at,
                'user' => $post->user
            ];
        }
        return Inertia::render('Dashboard', [
            'groups' => $groups,
            'post' => $post
        ]);
    }
}
