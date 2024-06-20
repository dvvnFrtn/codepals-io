<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function store($postId)
    {
        $user = Auth::user();
        $post = Post::findOrFail($postId);

        if ($post->likes()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Already liked'], 409);
        }

        $like = new Like();
        $like->user()->associate($user);
        $like->post()->associate($post);
        $like->save();

        return response()->json(['message' => 'Liked', 'likesCount' => $post->likes->count()]);
    }

    public function destroy($postId)
    {
        $user = Auth::user();
        $post = Post::findOrFail($postId);

        $like = $post->likes()->where('user_id', $user->id)->first();
        if (!$like) {
            return response()->json(['message' => 'Not liked'], 404);
        }

        $like->delete();

        return response()->json(['message' => 'Unliked', 'likesCount' => $post->likes->count()]);
    }
}
