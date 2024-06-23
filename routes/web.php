<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\GroupRequestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LikeController;
use Illuminate\Support\Facades\URL;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Middleware\CheckRole;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', CheckRole::class . ':admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard.main');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {

    Route::get('/groups/my', [GroupController::class, 'index'])->name('groups.index');

    Route::get('/dashboard/groups', [GroupController::class, 'all'])->name('dashboard.groups');

    Route::get('/dashboard/posts', [PostController::class, 'all'])->name('dashboard.posts');

    Route::get('/my', [PostController::class, 'index'])->name('my.index');

    Route::post('/picture', [UserController::class, 'uploadImage'])->name('user.image');
    Route::put('/user/update', [UserController::class, 'update'])->name('user.update');
    Route::put('/user/desc/update', [UserController::class, 'updateDescription'])->name('user.desc.update');

    Route::post('/groups', [GroupController::class, 'store'])->name('groups.store');
    Route::post('/posts/store', [PostController::class, 'store'])->name('post.store');

    Route::post('/posts/{id}/like', [LikeController::class, 'store'])->name('posts.like');
    Route::delete('/posts/{id}/like', [LikeController::class, 'destroy'])->name('posts.unlike');

    Route::get('/groups/{group}', [GroupController::class, 'show'])->name('groups.show');
    Route::get('/groups/{group}/find-member', [GroupController::class, 'findMember'])->name('groups.findMember');

    Route::post('/groups/{group}/request', [GroupRequestController::class, 'requestJoin'])->name('group.request');
    Route::post('/group-requests/{groupRequest}/approve', [GroupRequestController::class, 'approveRequest'])->name('group-requests.approve');

    Route::get('/groups/{groupId}/chat', [ChatController::class, 'index'])->name('group.chat');
    Route::post('/groups/{groupId}/chat', [ChatController::class, 'store'])->name('group.chat.store');
    Route::get('/groups/{group}/last-chat', [GroupController::class, 'getLastChat'])->name('groups.lastChat');
});

require __DIR__ . '/auth.php';
