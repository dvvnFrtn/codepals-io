<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index() {
        $groups = Group::take(3)->get();
        return Inertia::render('Dashboard', [
            'groups'=> $groups
        ]);
    }
}
