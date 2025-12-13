<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Fetches all users from the 'users' table in MySQL
        // $users = User::all();

        // Returns data wrapped in a "data" key, which the frontend expects
        // return UserResource::collection($users);
         return User::select('id', 'name', 'email', 'created_at')->get();
    }
}