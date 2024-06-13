<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function uploadImage(Request $request)
    {
        $request->validate([
            'picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // sesuaikan dengan kebutuhan
        ]);

        $user = User::find(Auth::user()->id);

        if ($request->hasFile('picture')) {
            $image = $request->file('picture');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $imageName);
            $user->picture = $imageName;
            $user->save();
        }

        return redirect()->back()->with('success', 'Picture updated successfully.');
    }

    public function update(Request $request) {
        $request->validate([
            'name' => 'required|string|min:8',
            'role' => 'required|string',
            'status' => 'required|string'
        ]);

        $user = User::find(Auth::user()->id);
        $user->name = $request->name;
        $user->role = $request->role;
        $user->status = $request->status;
        $user->save();

        return redirect()->back()->with('success', 'Data updated successfully.');
    }

    public function updateDescription(Request $request) {
        $request->validate([
            'description' => 'required'
        ]);

        $user = User::find(Auth::user()->id);
        $user->description = $request->description;
        $user->save();

        return to_route('my.index');
    }
}
