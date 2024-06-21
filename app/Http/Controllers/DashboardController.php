<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {
        $groups = Group::take(3)->get();
        $post = Post::with("user:id,name,picture")
            ->withCount('likes')
            ->latest()
            ->first();

        if ($post) {
            $post = [
                'id' => $post->id,
                'content' => $post->content,
                'image_path' => $post->image_path,
                'formatted_updated_at' => $post->formatted_updated_at,
                'user' => $post->user,
                'likes_count' => $post->likes_count,
                'is_liked' => $post->likes->contains('user_id', Auth::id())
            ];
        }
        return Inertia::render('Dashboard', [
            'groups' => $groups,
            'post' => $post
        ]);
    }
}
