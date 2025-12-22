<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle user login via Session
     * POST /api/login
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        // 1. Use Auth::attempt instead of manual password checking
        // This automatically handles the session creation
        if (Auth::attempt($credentials)) {
            
            // 2. CRITICAL: Regenerate session to prevent fixation attacks
            $request->session()->regenerate();

            $account = Auth::user();

            return response()->json([
                'message' => 'Login successful',
                'account' => [
                    'id'    => $account->id,
                    'email' => $account->email,
                    'role'  => $account->role, // Uses the getRoleAttribute from your Account model
                ],
            ], 200);
        }

        return response()->json([
            'message' => 'The provided credentials do not match our records.',
        ], 401);
    }

    /**
     * Handle user logout (Invalidates Session)
     * POST /api/logout
     */
    public function logout(Request $request)
    {
        // 1. Logout from the web guard
        Auth::guard('web')->logout();

        // 2. Invalidate the session and regenerate the CSRF token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully',
        ], 200);
    }
}