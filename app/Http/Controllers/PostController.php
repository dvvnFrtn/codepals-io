<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/posts'), $imageName);
            $imagePath = '/uploads/posts/' . $imageName;
        }

        Post::create([
            'content' => $request->content,
            'image_path' => $imagePath,
            'user_id' => Auth::user()->id
        ]);

        return to_route('dashboard.posts');
    }

    public function all()
    {
        $posts = Post::withCount('likes')
            ->with("user:id,name,picture")
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'content' => $post->content,
                    'image_path' => $post->image_path,
                    'formatted_updated_at' => $post->formatted_updated_at,
                    'user' => $post->user,
                    'likes_count' => $post->likes_count,
                    'is_liked' => $post->likes->contains('user_id', Auth::id())
                ];
            });
        return Inertia::render('Posts/PostAll', [
            "posts" => $posts
        ]);
    }

    public function index()
    {
        $userId = Auth::id();
        $posts = Post::withCount('likes')->where('user_id', $userId)
            ->with("user:id,name,picture")
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'content' => $post->content,
                    'image_path' => $post->image_path,
                    'formatted_updated_at' => $post->formatted_updated_at,
                    'user' => $post->user,
                    'likes_count' => $post->likes_count,
                    'is_liked' => $post->likes->contains('user_id', Auth::id())
                ];
            });
        return Inertia::render('My/MyIndex', [
            'auth' => Auth::user(),
            'posts' => $posts
        ]);
    }
}
