<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard.main');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/groups/my', function () {
        return Inertia::render('Groups/GroupIndex', [
            'auth' => Auth::user()
        ]);
    })->name('groups.index');
    Route::get('/dashboard/groups', function () {
        return Inertia::render('Groups/GroupAll');
    })->name('dashboard.groups');
    Route::get('/dashboard/posts', function () {
        return Inertia::render('Posts/PostAll');
    })->name('dashboard.posts');
    Route::get('/my', function () {
        return Inertia::render('My/MyIndex', [
            'auth' => Auth::user()
        ]);
    })->name('my.index');
    Route::post('/picture', [UserController::class, 'uploadImage'])->name('user.image');
    Route::put('/user/update', [UserController::class, 'update'])->name('user.update');
    Route::put('/user/desc/update', [UserController::class, 'updateDescription'])->name('user.desc.update');
    Route::post('/posts/store', [PostController::class, 'store'])->name('post.store');
});

require __DIR__.'/auth.php';
