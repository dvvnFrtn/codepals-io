<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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
        return Inertia::render('Groups/GroupIndex');
    })->name('groups.index');
    Route::get('/dashboard/groups', function () {
        return Inertia::render('Groups/GroupAll');
    })->name('dashboard.groups');
    Route::get('/dashboard/posts', function () {
        return Inertia::render('Posts/PostAll');
    })->name('dashboard.posts');
});

require __DIR__.'/auth.php';
