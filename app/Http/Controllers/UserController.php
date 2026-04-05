<?php

namespace App\Http\Controllers;

use App\Models\Users;

class UserController extends Controller
{
    public function index()
    {
        $users = Users::all();
        return view('users.index', compact('users'));
    }

    public function show($id)
    {
        $user = Users::findOrFail($id);
        return view('users.show', compact('user'));
    }
}