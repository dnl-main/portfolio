<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    /**
     * Fetch all user accounts for the API.
     * GET /api/users
     */
    public function index()
    {
        try {
            // This calls the scope we just added
            $users = Account::forApiIndex()->get();
            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error retrieving users',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a new user account.
     * POST /api/signup
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'     => 'required|email|unique:account,email',
            'password'  => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 422);
        }

        try {
            // Model hashes password and assigns virtual role via email logic
            $user = Account::signUp($request->only(['email', 'password']));

            return response()->json([
                'message' => 'Account created successfully!',
                'user'    => $user // This will now include 'role' thanks to $appends
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create account.',
                'error_details' => $e->getMessage()
            ], 500);
        }
    }
}